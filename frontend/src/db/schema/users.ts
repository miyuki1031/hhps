// npx tsx src/db/seed.ts
/**
 */
import { pgTable, varchar, uuid, pgEnum } from "drizzle-orm/pg-core";
// 1. ENUMの定義
export const rollEnum = pgEnum('roll', ['m', 'u', 'o']);

export const usersTable = pgTable("users", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar("name"),
    email: varchar('email').notNull(),
    roll: rollEnum('roll').notNull(),
});