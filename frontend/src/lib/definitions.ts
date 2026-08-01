/** 型定義 */
/**
 * Profile 自己紹介
*/
import { profileTable } from '../db/schema/profile';
import { resumesTable } from '../db/schema/resumes';

import { type InferSelectModel } from 'drizzle-orm';

// スキーマーの型参照
//　
// ここでDrizzleから型を自動取得して Profile 型として定義する
/**
 * ProfileSchema
*/
export type ProfileSchema = InferSelectModel<typeof profileTable>;

/**
 * ResumeSchema 職務経歴書
*/
export type ResumeSchema = InferSelectModel<typeof resumesTable>;

export type fetchResumeOptionsProps = Record<string, number | boolean | string | "asc" | "desc">;


export type ResumeQueries = {
    // [key: string]: string | number | undefined;
    page?: 'p' | 'r';
    order: 'asc' | 'desc';
    limit?: number;
    move?: 'prev' | 'next';
};

export type DefaultConfig = {
    RESUME_QUERIES: ResumeQueries
};