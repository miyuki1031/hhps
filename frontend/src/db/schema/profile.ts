// npx tsx src/db/seed.ts
/**
 */
import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const profileTable = pgTable("profile", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar("name"),
    learning: varchar("learning").array(),
    location: varchar("location"),
    locationEn: varchar("location_en"),
    licenses: varchar("licenses")
});