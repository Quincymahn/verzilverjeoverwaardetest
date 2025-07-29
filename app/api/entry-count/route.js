// app/api/entry-count/route.js
import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const TABLE_NAME = "subscribers";
const DATE_COLUMN_NAME = "datetime";

export async function GET() {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  };

  // Basic validation (same as before)
  if (
    !dbConfig.host ||
    !dbConfig.user ||
    !dbConfig.database ||
    !TABLE_NAME ||
    TABLE_NAME === "your_table_name" || // Keep this check for the placeholder
    !DATE_COLUMN_NAME ||
    DATE_COLUMN_NAME === "created_at_placeholder" // Add check for date column
  ) {
    if (!dbConfig.host) console.error("API Error: DB_HOST is missing.");
    if (!dbConfig.user) console.error("API Error: DB_USER is missing.");
    if (!dbConfig.database) console.error("API Error: DB_NAME is missing.");
    if (!TABLE_NAME || TABLE_NAME === "your_table_name")
      console.error("API Error: TABLE_NAME not correctly set.");
    if (!DATE_COLUMN_NAME || DATE_COLUMN_NAME === "created_at_placeholder")
      console.error(
        "API Error: DATE_COLUMN_NAME for today's count not correctly set."
      );

    return NextResponse.json(
      { error: "Server configuration error. Check server logs." },
      { status: 500 }
    );
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // 1. Get total count
    const [totalRows] = await connection.execute(
      `SELECT COUNT(*) as count FROM ${TABLE_NAME}`
    );
    const totalCount = totalRows[0].count;

    // 2. Get count for today
    // Get the current date in YYYY-MM-DD format (MySQL's DATE() function expects this)
    // The database server's timezone will be used for CURDATE() or NOW().
    // If your 'created_at' stores UTC and your app server is in a different timezone,
    // you might need more complex timezone handling. For simplicity, we assume DB handles it.
    const [todayRows] = await connection.execute(
      `SELECT COUNT(*) as count FROM ${TABLE_NAME} WHERE DATE(${DATE_COLUMN_NAME}) = CURDATE()`
    );
    const todayCount = todayRows[0].count;

    await connection.end();

    return NextResponse.json({
      totalCount: totalCount,
      todayCount: todayCount,
    });
  } catch (error) {
    console.error("Database Error in API route:", error);
    if (connection) await connection.end();
    return NextResponse.json(
      {
        error: "Failed to fetch entry counts from database.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
