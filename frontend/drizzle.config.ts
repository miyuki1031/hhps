import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

console.log("２URLチェック");
console.log(process.env.DATABASE_URL);
console.log("2POSE");
console.log(process.env.POSE);

console.log("2手動合体");
console.log(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST || 'localhost'}:5432/${process.env.POSTGRES_DB}`);

export default defineConfig({
    schema: "./src/db/schema/index.ts",
    out: "./migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
