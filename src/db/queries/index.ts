import { sql } from "drizzle-orm";
import db from "..";

export * from "./metadata";

export async function clearDb(): Promise<void> {
  const query = sql<string>`SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `;

  const tables = await db.execute(query); // retrieve tables

  for (let table of Array.from(tables.rows)) {
    const query = sql.raw(`TRUNCATE TABLE ${table.table_name} CASCADE;`);
    await db.execute(query); // Truncate (clear all the data) the table
  }

  console.log("Database cleared");
}
