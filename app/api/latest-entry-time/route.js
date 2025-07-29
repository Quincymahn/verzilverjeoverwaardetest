// app/api/latest-entry-time/route.js
import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

export async function GET() {
  let connection;
  try {
    console.log("API_ROUTE: Attempting to connect to DB...");
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    });
    console.log("API_ROUTE: DB Connection successful.");

    const query =
      "SELECT datetime FROM subscribers ORDER BY datetime DESC LIMIT 1";
    console.log("API_ROUTE: Executing query:", query);

    const [rows] = await connection.execute(query);
    console.log("API_ROUTE: Query result rows:", JSON.stringify(rows));

    if (rows.length === 0) {
      console.log("API_ROUTE: No entries found.");
      return NextResponse.json(
        { time: null, message: "No entries found" },
        { status: 404 }
      );
    }

    const lastEntryTimestamp = rows[0].datetime;

    console.log(
      "API_ROUTE: Raw lastEntryTimestamp from DB:",
      lastEntryTimestamp
    );
    console.log(
      "API_ROUTE: Type of lastEntryTimestamp:",
      typeof lastEntryTimestamp
    );

    if (!lastEntryTimestamp) {
      console.error(
        "API_ROUTE: lastEntryTimestamp is null or undefined after trying to access rows[0].datetime."
      );
      return NextResponse.json(
        {
          error:
            "Invalid timestamp received from database (null/undefined after access)",
          details: `Attempted to access rows[0].datetime. rows[0] was: ${JSON.stringify(
            rows[0]
          )}`,
        },
        { status: 500 }
      );
    }

    // Create Date object from the timestamp
    // Since we're now storing Amsterdam time directly in the database,
    // we don't need to convert timezones - just format the time
    const dateObj = new Date(lastEntryTimestamp);
    console.log(
      "API_ROUTE: Parsed dateObj (Amsterdam time from DB):",
      dateObj.toString()
    );

    if (isNaN(dateObj.getTime())) {
      console.error(
        "API_ROUTE: Invalid Date created from timestamp:",
        lastEntryTimestamp
      );
      return NextResponse.json(
        {
          error: "Failed to parse timestamp into a valid date",
          receivedTimestamp: lastEntryTimestamp,
        },
        { status: 500 }
      );
    }

    // Since the database now stores Amsterdam time, we can directly use the time
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    console.log(`API_ROUTE: Hours: ${hours}, minutes: ${minutes}`);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    console.log("API_ROUTE: Formatted time:", formattedTime);

    return NextResponse.json({ time: formattedTime });
  } catch (error) {
    console.error("API_ROUTE: Database or processing error:", error);
    console.error("API_ROUTE: Error stack:", error.stack);
    return NextResponse.json(
      { error: "Failed to fetch last entry time", details: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      console.log("API_ROUTE: Closing DB connection.");
      await connection.end();
    }
  }
}
