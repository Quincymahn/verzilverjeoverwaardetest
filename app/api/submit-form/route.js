// app/api/submit-form/route.js
import { google } from "googleapis";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const allowedMethods = ["POST", "OPTIONS"];

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Helper function to format Dutch phone numbers for Google Sheets
function formatPhoneNumberForSheets(phoneNumber) {
  if (!phoneNumber || typeof phoneNumber !== "string") {
    return phoneNumber; // Return as is if not a string or empty
  }

  // 1. Initial Cleaning: Remove all non-digit characters except for a leading '+'
  let cleanedNumber = phoneNumber.trim(); // Remove leading/trailing whitespace

  // If it starts with '+', keep the '+' and remove all non-digits from the rest
  if (cleanedNumber.startsWith("+")) {
    cleanedNumber = "+" + cleanedNumber.substring(1).replace(/\D/g, "");
  } else {
    // If no leading '+', just remove all non-digits
    cleanedNumber = cleanedNumber.replace(/\D/g, "");
  }

  // 2. Apply Dutch-specific formatting / standardization
  if (cleanedNumber.startsWith("06")) {
    // If it starts with '06', assume Dutch mobile and prepend '+31'
    return "+316" + cleanedNumber.substring(2);
  }
  // If it starts with '0' (but not '06'), assume it's another Dutch domestic number
  // e.g., 020-1234567 becomes +31201234567
  else if (cleanedNumber.startsWith("0") && cleanedNumber.length > 1) {
    return "+31" + cleanedNumber.substring(1);
  }
  // If it already starts with '+31', it's likely already in a good international format
  else if (cleanedNumber.startsWith("+31")) {
    return cleanedNumber; // Already cleaned and standardized
  }

  // 3. Fallback: If no specific Dutch pattern matches, return the already cleaned number.
  // This handles international numbers not starting with +31, or other formats,
  // ensuring they are still cleaned of spaces and extraneous characters.
  return cleanedNumber;
}

export async function POST(request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  const RECAPTCHA_SCORE_THRESHOLD = 0.5;
  const EXPECTED_RECAPTCHA_ACTION = "multistep_form_submit";

  try {
    const body = await request.json();
    const { recaptchaToken, ...formData } = body;

    // reCAPTCHA verification
    if (!process.env.RECAPTCHA_V3_SECRET_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: Missing reCAPTCHA secret key",
        },
        { status: 500, headers: corsHeaders }
      );
    }

    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA token is missing. Please complete the challenge.",
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const verificationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${
          process.env.RECAPTCHA_V3_SECRET_KEY
        }&response=${recaptchaToken}&remoteip=${request.ip || ""}`,
      }
    );
    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA server-side verification failed.",
          errors: verificationData["error-codes"],
        },
        { status: 400, headers: corsHeaders }
      );
    }
    if (verificationData.score < RECAPTCHA_SCORE_THRESHOLD) {
      return NextResponse.json(
        {
          success: false,
          message:
            "reCAPTCHA score too low. Your request was flagged as potentially a bot.",
        },
        { status: 403, headers: corsHeaders }
      );
    }
    if (verificationData.action !== EXPECTED_RECAPTCHA_ACTION) {
      return NextResponse.json(
        { success: false, message: "reCAPTCHA action mismatch." },
        { status: 400, headers: corsHeaders }
      );
    }

    const results = { mysql: null, sheets: null, errors: [] };
    let databaseId = null;

    // Database save attempt
    try {
      const mysqlResult = await saveToDatabase(formData);
      databaseId = mysqlResult.insertId;
      results.mysql = { success: true, insertId: databaseId };
    } catch (error) {
      results.errors.push(`MySQL: ${error.message}`);
      results.mysql = { success: false, error: error.message };
    }

    // Google Sheets save attempt
    try {
      const sheetsResult = await appendToSheet(formData, databaseId);
      results.sheets = { success: true, data: sheetsResult };
    } catch (error) {
      results.errors.push(`Google Sheets: ${error.message}`);
      results.sheets = { success: false, error: error.message };
    }

    const mysqlSuccess = results.mysql?.success;
    const sheetsSuccess = results.sheets?.success;

    if (mysqlSuccess && sheetsSuccess) {
      return NextResponse.json(
        {
          success: true,
          message:
            "Data successfully submitted to both database and spreadsheet",
          results,
        },
        { status: 200, headers: corsHeaders }
      );
    } else if (mysqlSuccess || sheetsSuccess) {
      return NextResponse.json(
        {
          success: true,
          message: `Data partially submitted. ${
            mysqlSuccess ? "Database: OK" : "Database: Failed"
          }, ${sheetsSuccess ? "Sheets: OK" : "Sheets: Failed"}`,
          results,
          warnings: results.errors,
        },
        { status: 207, headers: corsHeaders }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to submit to both database and spreadsheet",
          results,
        },
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form data",
        error: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

async function saveToDatabase(formData, formType = "Overwaarde Opnemen") {
  let connection;

  try {
    connection = await pool.getConnection();

    // Create Amsterdam time properly for MySQL
    const now = new Date();
    const amsterdamTime = new Date(
      now.toLocaleString("en-US", {
        timeZone: "Europe/Amsterdam",
      })
    );

    const parseFloatOrNull = (val) => {
      if (val !== undefined && val !== null && val !== "") {
        const num = parseFloat(val);
        return isNaN(num) ? null : num;
      }
      return null;
    };

    const columnMappings = {
      datetime: amsterdamTime, // Now using Amsterdam time instead of server time
      form_name: formType,
      reden_aanvraag: formData.purpose,
      waarde_woning: parseFloatOrNull(formData.marketValue),
      hypotheeksom: parseFloatOrNull(formData.remainingMortgage),
      bron_van_inkomen: formData.incomeSource,
      jaar_inkomen: parseFloatOrNull(formData.yearlyIncome),
      radio_partner:
        formData.hasPartner === "ja" || formData.hasPartner === true
          ? "ja"
          : "nee",
      inkomen_partner:
        formData.hasPartner === "ja" || formData.hasPartner === true
          ? parseFloatOrNull(formData.partnerIncome)
          : null,
      voornaam: formData.firstName,
      achternaam: formData.lastName,
      postcode: formData.postalCode,
      straat: formData.street,
      huisnummer: formData.houseNumber,
      telefoonnummer: formData.phoneNumber,
      geboortedatum: formData.birthDate,
      geboortedatum_partner:
        formData.hasPartner === "ja" ? formData.partnerBirthDate : null,
      email: formData.email,
      overwaarde_opnemen: parseFloatOrNull(formData.equityToWithdraw),
      overwaarde_reden: formData.purpose,
      plaats: formData.city,
      tussenvoegsel: formData.middleName,
      // ========= TOEGEVOEGD =========
      radio_geslacht: formData.gender, // Sla de aanhef op in de database
      // ============================
      woning_gevonden: formData.houseFound,
      oversluiten_reden: formData.refinanceReason,
      situation: formData.situation,
      income: parseFloatOrNull(formData.income),
      inkomen: parseFloatOrNull(formData.inkomen),
      financiering: parseFloatOrNull(formData.financing),
      doel_aanvraag: formData.applicationGoal,
      waarde_pand: parseFloatOrNull(formData.propertyValue),
      inbreng_eigen_geld: parseFloatOrNull(formData.ownContribution),
      type_pand: formData.propertyType,
      fase_aankoop: formData.purchasePhase,
      financieren_vanuit: formData.financeFrom,
      waarde_vastgoedportefeuille: parseFloatOrNull(formData.portfolioValue),
      aantal_verhuurde_panden: formData.rentalProperties,
      huurinkomen: parseFloatOrNull(formData.rentalIncome),
      bedrag: parseFloatOrNull(formData.amount),
    };

    // Create combined notes
    const notesParts = [
      formData.purpose ? `Doel: ${formData.purpose}` : "",
      formData.equityToWithdraw
        ? `Overwaarde: ${formData.equityToWithdraw}`
        : "",
      formData.comments ? `Opmerkingen: ${formData.comments}` : "",
      formData.additionalInfo ? `Extra info: ${formData.additionalInfo}` : "",
    ].filter(Boolean);

    if (notesParts.length > 0) {
      columnMappings.opmerking = notesParts.join(" | ");
    }

    // Filter out null/undefined values and build query
    const validColumns = [];
    const validValues = [];
    const placeholders = [];

    Object.entries(columnMappings).forEach(([column, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        validColumns.push(column);
        validValues.push(value);
        placeholders.push("?");
      }
    });

    if (validColumns.length === 0) {
      throw new Error("No valid data to insert");
    }

    const query = `INSERT INTO subscribers (${validColumns.join(
      ", "
    )}) VALUES (${placeholders.join(", ")})`;

    const [result] = await connection.execute(query, validValues);

    if (result.affectedRows > 0) {
      return result;
    } else {
      throw new Error("MySQL insert affected 0 rows - no data was inserted");
    }
  } catch (error) {
    throw new Error(
      `MySQL Save Failed: ${error.message} (Code: ${error.code || "N/A"})`
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function appendToSheet(formData, databaseId = null) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const now = new Date();

    // Convert to Amsterdam timezone for the spreadsheet
    const amsterdamTime = new Date(
      now.toLocaleString("en-US", {
        timeZone: "Europe/Amsterdam",
      })
    );

    const currentDateTime = `${
      amsterdamTime.toISOString().split("T")[0]
    } ${amsterdamTime.getHours().toString().padStart(2, "0")}:${amsterdamTime
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const combinedNotes = [
      formData.purpose ? `Doel: ${formData.purpose}` : "",
      formData.equityToWithdraw
        ? `Overwaarde: ${formData.equityToWithdraw}`
        : "",
      formData.comments ? `Opmerkingen: ${formData.comments}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    let combinedAddress = "";
    const street = formData.street || "";
    const houseNumber = formData.houseNumber || "";
    const houseNumberAddition = formData.houseNumberAddition || "";

    if (street && houseNumber) {
      // Als er zowel straat als huisnummer is
      combinedAddress = houseNumberAddition
        ? `${street} ${houseNumber}${houseNumberAddition}`
        : `${street} ${houseNumber}`;
    } else if (street) {
      combinedAddress = street;
    } else if (houseNumber) {
      combinedAddress = houseNumber;
    }

    const fieldToColumnMapping = {
      typeLead: { column: 0, value: "Overwaarde opnemen" },
      leadBron: { column: 1, value: "Verzilverjeoverwaarde.nl" },
      dbId: { column: 2, value: databaseId !== null ? String(databaseId) : "" }, // Opgeschoven naar kolom 4
      gender: { column: 3, field: "gender" }, // Aanhef in kolom 3 (index 2)
      currentDateTime: { column: 29, value: currentDateTime },
      firstName: { column: 4, field: "firstName" },
      lastName: { column: 6, field: "lastName" },
      phoneNumber: {
        column: 7,
        field: "phoneNumber",
        transform: (val) => formatPhoneNumberForSheets(val),
      },
      email: { column: 8, field: "email" },
      city: { column: 11, field: "city" },
      postalCode: { column: 10, field: "postalCode" },
      streetAndCity: { column: 9, value: combinedAddress },
      marketValue: { column: 14, field: "marketValue" },
      birthDate: { column: 15, field: "birthDate" },
      incomeSource: { column: 16, field: "incomeSource" },
      yearlyIncome: { column: 17, field: "yearlyIncome" },
      hasPartner: {
        column: 20,
        field: "hasPartner",
        transform: (val) => (val ? "Ja" : "Nee"),
      },
      partnerBirthDate: {
        column: 21,
        field: "partnerBirthDate",
        condition: () => formData.hasPartner,
        default: "",
      },
      partnerIncome: {
        column: 22,
        field: "partnerIncome",
        condition: () => formData.hasPartner,
        default: "",
      },
      remainingMortgage: { column: 13, field: "remainingMortgage" },
      combinedNotes: { column: 28, value: combinedNotes },
    };

    const maxColumnIndex = Math.max(
      ...Object.values(fieldToColumnMapping).map((mapping) => mapping.column)
    );
    const rowArray = Array(maxColumnIndex + 1).fill("");

    Object.entries(fieldToColumnMapping).forEach(
      ([fieldKey, mappingConfig]) => {
        let valueToInsert = "";
        if ("value" in mappingConfig) {
          valueToInsert = mappingConfig.value;
        } else if ("field" in mappingConfig) {
          const shouldApply =
            !mappingConfig.condition || mappingConfig.condition();
          if (shouldApply) {
            const rawValue = formData[mappingConfig.field];
            if (mappingConfig.transform && rawValue !== undefined) {
              valueToInsert = mappingConfig.transform(rawValue);
            } else {
              valueToInsert =
                rawValue !== undefined && rawValue !== null ? rawValue : "";
            }
          } else {
            valueToInsert =
              mappingConfig.default !== undefined ? mappingConfig.default : "";
          }
        }
        rowArray[mappingConfig.column] = valueToInsert;
      }
    );

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Inkomend!A:AE",
      valueInputOption: "USER_ENTERED",
      resource: { values: [rowArray] },
    });

    return response.data;
  } catch (error) {
    throw new Error(`Google Sheets Save Failed: ${error.message}`);
  }
}
