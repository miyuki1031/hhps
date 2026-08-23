/** 型定義 */

/**
 * type InferSelectModel
 * スキーマ（テーブル定義）から、「SELECT（取得）したときに返ってくるデータの型」を自動で抽出・推論するための型ヘルパーだよ。
 簡単に言うと、「データベースから取得したレコード1行分のTypeScriptの型」
 */
import { type InferSelectModel } from 'drizzle-orm';
/**
 * スキーマ
 */
import { profileTable } from '../db/schema/profile';
import { resumesTable } from '../db/schema/resumes';
import { todoTable } from '../db/schema/todo';
import { usersTable } from '../db/schema/users';

/**
 * DB系
 */
/**
 * ProfileSchema
*/
export type ProfileSchema = InferSelectModel<typeof profileTable>;

/**
 * ResumeSchema 職務経歴書
*/
export type ResumeSchema = InferSelectModel<typeof resumesTable>;
// カラム名取得（ソート行を固定にせずDBに定義したものを使うために）
export type ResumeColumnKey = keyof typeof resumesTable._.columns;
// 検索用
export type FetchResumeOptions = {
    orderByColumn?: ResumeColumnKey; // カラム名（例: "employmentPeriodEd" など）
    order?: "asc" | "desc";
    limit?: number;
    move?: "prev" | "next";
};

export type ResumeQueries = {
    // [key: string]: string | number | undefined;
    page?: 'p' | 'r';
    order: 'asc' | 'desc';
    limit?: number;
    move?: 'prev' | 'next';
};
/**
 * Todo
*/
export type TodoSchema = InferSelectModel<typeof todoTable>;

export type TodoColumnKey = keyof typeof todoTable._.columns;
export type TodoOptions = {
    orderByColumn?: TodoColumnKey; // カラム名
    order?: "asc" | "desc";
    isDelete: boolean;
    isComplete: boolean;
    isPrivate: boolean;
};

/**
 * 検索パラメータの保持
 */
export type DefaultConfig = {
    RESUME_QUERIES: ResumeQueries,
    TODO_QUERIES: TodoOptions,
};
/** APIレスポンス型 */
export type ApiResponse<T> = {
    status?: number;
    success: boolean;
    message?: string;
    data?: T;
};

export type NewTodo = Omit<TodoSchema, 'id'>;

/**
 * User
 */
export type UsersSchema = InferSelectModel<typeof usersTable>;
export type UsersColumnKey = keyof typeof usersTable._.columns;

