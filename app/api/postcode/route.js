// app/api/postcode/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log(
      "POST request received at /api/postcode (for postcode.eu NL API)"
    );

    const { postcode, housenumber, houseNumberAddition } = await request.json(); // Expect houseNumberAddition if available
    console.log("Request data:", {
      postcode,
      housenumber,
      houseNumberAddition,
    });

    if (!postcode || !housenumber) {
      return NextResponse.json(
        { error: "Postcode and housenumber are required" },
        { status: 400 }
      );
    }

    const cleanPostcode = postcode.replace(/\s+/g, "").toUpperCase();
    const cleanHousenumber = String(housenumber).trim(); // Ensure housenumber is a string for URL

    // Validate Dutch postcode format (1234AB) - good to keep
    const postcodeRegex = /^[1-9][0-9]{3}[A-Z]{2}$/;
    if (!postcodeRegex.test(cleanPostcode)) {
      return NextResponse.json(
        { error: "Invalid postcode format. Use format: 1234AB" },
        { status: 400 }
      );
    }

    if (
      !process.env.POSTCODE_NL_PUBLIC_KEY || // You might want to rename these env vars to POSTCODE_EU_KEY
      !process.env.POSTCODE_NL_SECRET_KEY // and POSTCODE_EU_SECRET for clarity
    ) {
      console.error("Missing postcode.eu API credentials");
      return NextResponse.json(
        { error: "API configuration error - missing credentials" },
        { status: 500 }
      );
    }

    // Construct the correct URL for postcode.eu NL API
    let apiUrl = `https://api.postcode.eu/nl/v1/addresses/postcode/${cleanPostcode}/${encodeURIComponent(
      cleanHousenumber
    )}`;
    if (houseNumberAddition && String(houseNumberAddition).trim() !== "") {
      apiUrl += `/${encodeURIComponent(String(houseNumberAddition).trim())}`;
    }

    console.log("Calling postcode.eu NL API:", apiUrl);

    const apiKey = process.env.POSTCODE_NL_PUBLIC_KEY; // This is your 'Key'
    const apiSecret = process.env.POSTCODE_NL_SECRET_KEY; // This is your 'Secret'

    const authString = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
        // "Content-Type": "application/json", // DO NOT SEND THIS ON A GET REQUEST
        "User-Agent": "VerzilverJeOverwaardeApp/1.0", // Be specific with User-Agent
      },
    });

    console.log("Postcode.eu NL API response status:", response.status);
    // console.log( // Optional: log all headers from postcode.eu
    //   "Postcode.eu NL API response headers:",
    //   Object.fromEntries(response.headers.entries())
    // );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Postcode.eu NL API error response text:", errorText);
      let errorMessage = `API error (${response.status})`;
      try {
        const errorData = JSON.parse(errorText); // postcode.eu might return JSON errors for some 4xx/5xx
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If not JSON, use the text or default
        if (
          response.status === 400 &&
          errorText.toLowerCase().includes("bad request")
        ) {
          errorMessage =
            "Bad request to Postcode.eu API. Check parameters and encoding.";
        } else if (errorText.trim()) {
          errorMessage = errorText.trim();
        }
      }
      // More specific error handling based on postcode.eu documentation if available
      if (response.status === 401)
        errorMessage =
          "Authentication failed with Postcode.eu API. Check Key and Secret.";
      if (response.status === 404)
        errorMessage = "Address not found by Postcode.eu API.";

      return NextResponse.json(
        { error: errorMessage },
        { status: response.status } // Use the status from postcode.eu
      );
    }

    const data = await response.json();
    console.log("Postcode.eu NL API response data:", data);

    // Adapt this to the actual structure of the postcode.eu NL API response
    // Based on other docs, it might be something like:
    // data.streetName, data.city, data.municipalityName, data.provinceAbbreviation, data.houseNumber, data.houseNumberAddition
    if (!data.street || !data.city) {
      // Adjust these field names based on actual response
      console.error(
        "Incomplete address data received from postcode.eu NL API:",
        data
      );
      return NextResponse.json(
        { error: "Incomplete address data received from API" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      street: data.street, // Adjust based on actual response
      city: data.city, // Adjust based on actual response
      // Add other fields as needed from the data object
      municipality: data.municipality,
      province: data.province,
      postcode: data.postcode,
      housenumber: data.houseNumber,
      houseNumberAddition: data.houseNumberAddition || "",
    });
  } catch (error) {
    console.error("Postcode API (internal server) error:", error);
    return NextResponse.json(
      { error: "Failed to fetch address data. Please try again." },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Handle GET requests to show the API is working
export async function GET() {
  return NextResponse.json(
    {
      message: "Postcode API is working. Use POST method to lookup addresses.",
      environment: {
        hasPublicKey: !!process.env.POSTCODE_NL_PUBLIC_KEY,
        hasSecretKey: !!process.env.POSTCODE_NL_SECRET_KEY,
      },
    },
    { status: 200 }
  );
}
