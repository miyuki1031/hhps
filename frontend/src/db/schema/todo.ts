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
    // 期限
    dueDate: date("due_date"),
    // private（非公開・公開）
    isPrivate: boolean("is_private").notNull().default(true),
    // 完了
    isComplete: boolean("is_complete").notNull().default(false),
    // 論理削除
    isDelete: boolean("is_delete").notNull().default(false),
    // オーサー
    isMasterAuthor: boolean("is_master_author").notNull().default(false),
});



