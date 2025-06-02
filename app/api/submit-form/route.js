// app/api/submit-form/route.js
import { google } from "googleapis";
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

// --- Log environment variables ONCE at startup for verification (remove sensitive ones after check) ---
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD IS SET:", !!process.env.DB_PASSWORD); // Don't log actual password
console.log("DB_NAME:", process.env.DB_NAME);
console.log(
  "GOOGLE_CLIENT_EMAIL:",
  process.env.GOOGLE_CLIENT_EMAIL ? "SET" : "NOT SET"
);
console.log("GOOGLE_PRIVATE_KEY IS SET:", !!process.env.GOOGLE_PRIVATE_KEY);
console.log(
  "GOOGLE_SHEET_ID:",
  process.env.GOOGLE_SHEET_ID ? "SET" : "NOT SET"
);
console.log(
  "RECAPTCHA_V3_SECRET_KEY IS SET:",
  !!process.env.RECAPTCHA_V3_SECRET_KEY
);
// --- End of initial environment variable logging ---

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

    console.log("Received full body:", body);
    console.log("Received formData:", formData); // CRITICAL: Check if 'remainingMortgage' is here and correctly named

    // ... (reCAPTCHA logic remains the same) ...
    if (!process.env.RECAPTCHA_V3_SECRET_KEY) {
      console.error("Missing RECAPTCHA_V3_SECRET_KEY in environment variables");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: Missing reCAPTCHA secret key",
        },
        { status: 500, headers: corsHeaders }
      );
    }
    // ... rest of reCAPTCHA ...
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
    console.log("reCAPTCHA verification data:", verificationData);

    if (!verificationData.success) {
      console.error(
        "reCAPTCHA verification failed (success:false):",
        verificationData["error-codes"]
      );
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
      console.warn(`reCAPTCHA score too low: ${verificationData.score}`);
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
      console.warn(
        `reCAPTCHA action mismatch. Expected: ${EXPECTED_RECAPTCHA_ACTION}, Got: ${verificationData.action}`
      );
      return NextResponse.json(
        { success: false, message: "reCAPTCHA action mismatch." },
        { status: 400, headers: corsHeaders }
      );
    }

    const results = { mysql: null, sheets: null, errors: [] };
    let databaseId = null;

    try {
      const mysqlResult = await saveToDatabase(formData);
      databaseId = mysqlResult.insertId;
      results.mysql = { success: true, insertId: databaseId };
      console.log("Successfully saved to MySQL with ID:", databaseId);
    } catch (error) {
      console.error("MySQL save failed in POST handler:", error.message); // Log the specific error message
      results.errors.push(`MySQL: ${error.message}`);
      results.mysql = { success: false, error: error.message };
    }

    try {
      const sheetsResult = await appendToSheet(formData, databaseId); // Pass original formData and potentially null ID
      results.sheets = { success: true, data: sheetsResult };
      console.log("Successfully saved to Google Sheets");
    } catch (error) {
      console.error("Google Sheets save failed:", error.message);
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
          success: true, // Or false if you consider partial failure an overall failure
          message: `Data partially submitted. ${
            mysqlSuccess ? "Database: OK" : "Database: Failed"
          }, ${sheetsSuccess ? "Sheets: OK" : "Sheets: Failed"}`,
          results,
          warnings: results.errors, // Changed from 'errors' to 'warnings' for partial success
        },
        { status: 207, headers: corsHeaders } // 207 Multi-Status might be more appropriate
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
    console.error("General submission error in POST handler:", error);
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

async function saveToDatabase(formData) {
  let connection;
  let query = ""; // Define here for logging in catch
  let values = []; // Define here for logging in catch

  try {
    connection = await pool.getConnection();
    console.log("Successfully connected to MySQL.");

    const now = new Date();
    const combinedNotes = [
      formData.purpose ? `Doel: ${formData.purpose}` : "",
      formData.equityToWithdraw
        ? `Overwaarde: ${formData.equityToWithdraw}`
        : "",
      formData.comments ? `Opmerkingen: ${formData.comments}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    query = `
      INSERT INTO form_submissions (
        type_lead, lead_bron, first_name, last_name, phone_number, email,
        house_number, postal_code, market_value, remaining_mortgage,
        income_source, yearly_income, has_partner, partner_income,
        combined_notes, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Helper to parse float or return null
    const parseFloatOrNull = (val) => {
      if (val !== undefined && val !== null && val !== "") {
        const num = parseFloat(val);
        return isNaN(num) ? null : num;
      }
      return null;
    };

    values = [
      "Overwaarde opnemen",
      "Verzilverjeoverwaarde.nl",
      formData.firstName || "",
      formData.lastName || "",
      formData.phoneNumber || "",
      formData.email || "",
      formData.houseNumber || "",
      formData.postalCode || "",
      parseFloatOrNull(formData.marketValue),
      parseFloatOrNull(formData.remainingMortgage), // CRITICAL: Ensure formData.remainingMortgage has the correct value
      formData.incomeSource || "",
      parseFloatOrNull(formData.yearlyIncome),
      formData.hasPartner ? 1 : 0,
      formData.hasPartner ? parseFloatOrNull(formData.partnerIncome) : null,
      combinedNotes,
      now,
    ];

    console.log("Executing SQL Query:", query);
    console.log("With Values:", values);

    const [result] = await connection.execute(query, values);

    console.log("MySQL Insert Result:", result);
    if (result.affectedRows > 0) {
      console.log("Data inserted successfully to MySQL, ID:", result.insertId);
      return result; // Contains insertId
    } else {
      throw new Error("MySQL insert affected 0 rows.");
    }
  } catch (error) {
    console.error("-----------------------------------------");
    console.error("DATABASE ERROR in saveToDatabase function:");
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code); // MySQL error code (e.g., ER_NO_SUCH_TABLE)
    console.error("Error Number:", error.errno);
    console.error("SQL State:", error.sqlState);
    if (query) console.error("Failed SQL Query:", query);
    if (values.length > 0) console.error("Values for Failed Query:", values);
    console.error("Full Error Stack:", error.stack);
    console.error("-----------------------------------------");
    // Re-throw a more specific error or the original one
    throw new Error(
      `MySQL Save Failed: ${error.message} (Code: ${error.code || "N/A"})`
    );
  } finally {
    if (connection) {
      console.log("Releasing MySQL connection.");
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
    const currentDateTime = `${now.toISOString().split("T")[0]} ${now
      .getHours()
      .toString()
      .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    const combinedNotes = [
      formData.purpose ? `Doel: ${formData.purpose}` : "",
      formData.equityToWithdraw
        ? `Overwaarde: ${formData.equityToWithdraw}`
        : "",
      formData.comments ? `Opmerkingen: ${formData.comments}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const fieldToColumnMapping = {
      typeLead: { column: 0, value: "Overwaarde opnemen" },
      leadBron: { column: 1, value: "Verzilverjeoverwaarde.nl" },
      databaseId: {
        column: 2,
        value: databaseId !== null ? databaseId : "N/A DB ID",
      }, // Handle null DB ID
      firstName: { column: 4, field: "firstName" },
      lastName: { column: 6, field: "lastName" },
      phoneNumber: { column: 7, field: "phoneNumber" },
      email: { column: 8, field: "email" },
      houseNumber: { column: 9, field: "houseNumber" },
      postalCode: { column: 10, field: "postalCode" },
      remainingMortgage: { column: 13, field: "remainingMortgage" },
      marketValue: { column: 14, field: "marketValue" },
      incomeSource: { column: 16, field: "incomeSource" },
      yearlyIncome: { column: 17, field: "yearlyIncome" },
      hasPartner: {
        column: 20,
        field: "hasPartner",
        transform: (val) => (val ? "Ja" : "Nee"),
      },
      partnerIncome: {
        column: 22,
        field: "partnerIncome",
        condition: () => formData.hasPartner,
        default: "",
      },
      combinedNotes: { column: 28, value: combinedNotes },
      currentDateTime: { column: 29, value: currentDateTime },
    };

    const maxColumnIndex = Math.max(
      ...Object.values(fieldToColumnMapping).map((mapping) => mapping.column)
    );
    const rowArray = Array(maxColumnIndex + 1).fill("");

    Object.entries(fieldToColumnMapping).forEach(([_, mappingConfig]) => {
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
    });

    console.log("Row to be appended to sheet:", rowArray);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Inkomend!A:AE",
      valueInputOption: "USER_ENTERED",
      resource: { values: [rowArray] },
    });
    return response.data;
  } catch (error) {
    console.error("-----------------------------------------");
    console.error("GOOGLE SHEETS API ERROR in appendToSheet function:");
    console.error("Error Message:", error.message);
    if (error.response && error.response.data && error.response.data.error) {
      console.error("Google API Error Details:", error.response.data.error);
    }
    console.error("Full Error Stack:", error.stack);
    console.error("-----------------------------------------");
    throw new Error(`Google Sheets Save Failed: ${error.message}`);
  }
}
