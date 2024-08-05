import "./drizzle/envConfig";
import { defineConfig } from "drizzle-kit";

if (!process.env.POSTGRES_HOST) {
  throw new Error("POSTGRES_HOST is required");
}
if (!process.env.POSTGRES_PORT) {
  throw new Error("POSTGRES_PORT is required");
}
if (!process.env.POSTGRES_USER) {
  throw new Error("POSTGRES_USER is required");
}
if (!process.env.POSTGRES_PASSWORD) {
  throw new Error("POSTGRES_PASSWORD is required");
}
if (!process.env.POSTGRES_DATABASE) {
  throw new Error("POSTGRES_DATABASE is required");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: process.env.POSTGRES_SSL === "true" ? true : false,
  },
});
