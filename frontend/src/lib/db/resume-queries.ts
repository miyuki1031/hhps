
import { ResumeSchema } from '../definitions';
import { DEFAULT_CONFIG } from '../constants';
import { resumesTable } from '@/db/schema/resumes';

// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';
import { asc, desc } from 'drizzle-orm';
import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

let lastOffset = 0;
let lastOrder = DEFAULT_CONFIG.RESUME_QUERIES.order;
let total = 0;

export type fetchResumeOptionsProps = Record<string, number | boolean | string | "asc" | "desc">;

type ResumeColumnKey = keyof typeof resumesTable._.columns;
type FetchResumeOptions = {
    orderByColumn?: ResumeColumnKey; // カラム名（例: "employmentPeriodEd" など）
    order?: "asc" | "desc";
    limit?: number;
    move?: "prev" | "next";
};
export async function fetchResume(options: FetchResumeOptions): Promise<ResumeSchema[]> {
    try {
        const limit = options.limit || DEFAULT_CONFIG.RESUME_QUERIES.limit!;
        const direction = options.order === 'desc' ? desc : asc;
        console.log(`direction: ${options.order}`)
        // どのカラムで並び替えるかも動的に切り替えたい場合
        const targetColumn = options.orderByColumn
            ? resumesTable[options?.orderByColumn]
            : resumesTable.employmentPeriodEd; // デフォルトのカラ
        console.log(`targetColumn: ${targetColumn}`)

        if (!!options.move) {
            // ページング
            if (lastOrder !== options.order) {
                lastOffset = 0; // 並び順が変わった場合はオフセットをリセット
            } else {
                if (options.move === 'next') {
                    // 次へ：最大値（total など）を超えないように上限をガード
                    lastOffset = Math.min(total, lastOffset + limit);
                } else if (options.move === 'prev') {
                    // 前へ：0未満にならないように下限をガード
                    lastOffset = Math.max(0, lastOffset - limit);
                }
            }
        }

        const query = db
            .select()
            .from(resumesTable)
            .orderBy(direction(targetColumn))
            .limit(limit)
            .offset(lastOffset);

        // 更新
        lastOrder = options.order || lastOrder;
        return await query as ResumeSchema[];

    } catch (error) {
        console.error('Database Error:', error);
        return [];
        throw new Error('Failed to fetch fetchResume');
    }
}


export async function getResumeAllCount() {
    try {
        const totalFetch = (await db
            .select()
            .from(resumesTable)).length;
        // 更新
        total = totalFetch;
        return totalFetch
    } catch (error) {
        console.error('Database Error:', error);
        return 0;
    }
}

export async function getDisabledInfo() {
    try {
        const isDisabledPrev = lastOffset === 0;
        const isDisabledNext = lastOffset + DEFAULT_CONFIG.RESUME_QUERIES.limit! >= total;

        return { prev: isDisabledPrev, next: isDisabledNext };
    } catch (error) {
        console.error('Database Error:', error);
        return { prev: true, next: true };
    }
}