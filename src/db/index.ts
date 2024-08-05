import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as metadata from "./schema/metadata";

const schema: Record<string, unknown> = { metadata };

const db = drizzle(sql, { schema });

export default db;
