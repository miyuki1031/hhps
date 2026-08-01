/**@abstract
 * import * as p from "drizzle-orm/pg-core";
 * p.serial().primaryKey()みたいな感じでもできる
 * 
 */

import { uuid, date, pgTable, text, varchar } from "drizzle-orm/pg-core";

// データベース上のテーブル名は "resumes"
export const resumesTable = pgTable("resumes", {
    id: uuid('id').primaryKey().defaultRandom(),
    // プロジェクト概要
    projectOverview: varchar("project_overview", { length: 255 }).notNull(),
    // assignedPhase
    assignedPhase: text("phases").array(),
    // 業務内容
    description: text("description"),
    // 成果
    achievements: text("achievements"),
    // os
    os: varchar("os", { length: 100 }).array(),
    // 言語
    languages: text("languages").array(),
    // 
    middlewares: text("middlewares").array(),
    // 
    role: varchar("role", { length: 100 }),
    // 人数
    scale: varchar("scale", { length: 100 }),
    // アサイン日
    employmentPeriodSt: date("employment_period_st"),
    // 終了日
    employmentPeriodEd: date("employment_period_ed"),
});

