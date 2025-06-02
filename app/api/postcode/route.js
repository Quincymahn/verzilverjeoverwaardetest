// app/api/postcode/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("POST request received at /api/postcode");

    const { postcode, housenumber } = await request.json();
    console.log("Request data:", { postcode, housenumber });

    if (!postcode || !housenumber) {
      return NextResponse.json(
        { error: "Postcode and housenumber are required" },
        { status: 400 }
      );
    }

    // Remove spaces and make uppercase for postcode
    const cleanPostcode = postcode.replace(/\s+/g, "").toUpperCase();

    // Validate Dutch postcode format (1234AB)
    const postcodeRegex = /^[1-9][0-9]{3}[A-Z]{2}$/;
    if (!postcodeRegex.test(cleanPostcode)) {
      return NextResponse.json(
        { error: "Invalid postcode format. Use format: 1234AB" },
        { status: 400 }
      );
    }

    // Check if environment variables are set
    if (
      !process.env.POSTCODE_NL_PUBLIC_KEY ||
      !process.env.POSTCODE_NL_SECRET_KEY
    ) {
      console.error("Missing postcode.nl API credentials");
      return NextResponse.json(
        { error: "API configuration error - missing credentials" },
        { status: 500 }
      );
    }

    const url = `https://api.postcode.nl/v1/addresses/${cleanPostcode}/${housenumber}`;
    console.log("Calling postcode.nl API:", url);

    const authString = Buffer.from(
      `${process.env.POSTCODE_NL_PUBLIC_KEY}:${process.env.POSTCODE_NL_SECRET_KEY}`
    ).toString("base64");

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
        "Content-Type": "application/json",
        "User-Agent": "YourAppName/1.0", // Add a user agent
      },
    });

    console.log("Postcode.nl API response status:", response.status);
    console.log(
      "Postcode.nl API response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Postcode.nl API error response:", errorText);

      let errorMessage = "Unknown error occurred";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (parseError) {
        errorMessage = errorText || errorMessage;
      }

      if (response.status === 404) {
        return NextResponse.json(
          { error: "Address not found for this postcode and house number" },
          { status: 404 }
        );
      }
      if (response.status === 401) {
        return NextResponse.json(
          { error: "API authentication failed - check your credentials" },
          { status: 500 }
        );
      }
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      if (response.status === 400) {
        return NextResponse.json(
          { error: `Bad request: ${errorMessage}` },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: `API error (${response.status}): ${errorMessage}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log("Postcode.nl API response data:", data);

    // Validate that we have the required data
    if (!data.street || !data.city) {
      console.error("Incomplete address data received:", data);
      return NextResponse.json(
        { error: "Incomplete address data received from API" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      street: data.street,
      city: data.city,
      municipality: data.municipality || data.city,
      province: data.province,
      postcode: data.postcode,
      housenumber: data.houseNumber,
      houseNumberAddition: data.houseNumberAddition || "",
    });
  } catch (error) {
    console.error("Postcode API error:", error);
    console.error("Error stack:", error.stack);

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
