/**@abstract
 * import * as p from "drizzle-orm/pg-core";
 * p.serial().primaryKey()みたいな感じでもできる
 * 
 */

import { uuid, date, pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";

// データベース上のテーブル名は "todo"
export const todoTable = pgTable("todo", {
    id: uuid('id').primaryKey().defaultRandom(),
    // Todo
    title: varchar("title", { length: 255 }).notNull(),
    // Todoの詳細
    description: text("description"),
    // 
    limit: date("limit"),
    // 論理削除
    isDelete: boolean("is_delete").notNull().default(false),
});



