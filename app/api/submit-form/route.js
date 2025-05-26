// app/api/submit-form/route.js
import { google } from "googleapis";
import { NextResponse } from "next/server";

// Define allowed methods for CORS
export const allowedMethods = ["POST", "OPTIONS"];

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Handle POST requests for form submission
export async function POST(request) {
  try {
    // Parse the request body
    const formData = await request.json();

    // Log the received data for debugging
    console.log("Received form data:", formData);

    // Validate required credentials
    if (
      !process.env.GOOGLE_CLIENT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      console.error(
        "Missing required Google API credentials in environment variables"
      );
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error: Missing API credentials",
        },
        { status: 500 }
      );
    }

    // Process the form submission
    const result = await appendToSheet(formData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Data successfully submitted to spreadsheet",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submission error:", error);

    // Send a proper JSON error response
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

async function appendToSheet(formData) {
  try {
    // Configure auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // Handle potential escape character issues in the private key
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Current date for "Aangemaakt" field
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
    // Define field to column mapping
    // This maps form fields to specific spreadsheet columns (A=0, B=1, etc.)
    const fieldToColumnMapping = {
      // Static values
      typeLead: { column: 0, value: "Overwaarde opnemen" },
      leadBron: { column: 1, value: "Verzilverjeoverwaarde.nl" },
      currentDateTime: { column: 29, value: currentDateTime },
      // Form fields with direct mapping
      firstName: { column: 4, field: "firstName" },
      lastName: { column: 6, field: "lastName" },
      phoneNumber: { column: 7, field: "phoneNumber" },
      email: { column: 8, field: "email" },
      houseNumber: { column: 9, field: "houseNumber" },
      postalCode: { column: 10, field: "postalCode" },
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
      remainingMortgage: { column: 13, field: "remainingMortgage" },
      combinedNotes: { column: 28, value: combinedNotes },
    };

    // Create an array with maximum column index length
    const maxColumnIndex = Math.max(
      ...Object.values(fieldToColumnMapping).map((mapping) => mapping.column)
    );
    const rowArray = Array(maxColumnIndex + 1).fill("");

    // Fill the array with values from the mapping
    Object.entries(fieldToColumnMapping).forEach(
      ([mappingKey, mappingConfig]) => {
        let valueToInsert = "";

        if ("value" in mappingConfig) {
          // Use static value
          valueToInsert = mappingConfig.value;
        } else if ("field" in mappingConfig) {
          // Check if there's a condition to evaluate
          const shouldApply =
            !mappingConfig.condition || mappingConfig.condition();

          if (shouldApply) {
            // Get value from form data
            const rawValue = formData[mappingConfig.field];

            // Apply transformation if specified
            if (mappingConfig.transform && rawValue !== undefined) {
              valueToInsert = mappingConfig.transform(rawValue);
            } else {
              valueToInsert = rawValue || "";
            }
          } else {
            // Use default value if condition isn't met
            valueToInsert = mappingConfig.default || "";
          }
        }

        // Assign the value to the correct column
        rowArray[mappingConfig.column] = valueToInsert;
      }
    );

    // Append the values to the spreadsheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Inkomend!A:AE", // Extended range to account for additional columns
      valueInputOption: "USER_ENTERED",
      resource: { values: [rowArray] },
    });

    return response.data;
  } catch (error) {
    console.error("Google Sheets API Error:", error);
    throw new Error(`Failed to append data to Google Sheet: ${error.message}`);
  }
}
