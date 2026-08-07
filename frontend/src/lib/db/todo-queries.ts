import { db } from "@/db";
import { TodoSchema, ApiResponse } from '../definitions';
import { DEFAULT_CONFIG } from '../constants';
import { todoTable } from '@/db/schema/todo';

import { asc, desc } from 'drizzle-orm';

// // ページング用の最後の位置
// let lastOffset = 0;
// // 前回のソート順を保持
// let lastOrder = DEFAULT_CONFIG.RESUME_QUERIES.order;
// // 合計値
let total = 0;
//// →ソースコードから指定するようにする

// export type fetchResumeOptionsProps = Record<string, number | boolean | string | "asc" | "desc">;

// 
type TodoColumnKey = keyof typeof todoTable._.columns;
type FetchTodoOptions = {
    orderByColumn?: TodoColumnKey; // カラム名（例: "employmentPeriodEd" など）
    order?: "asc" | "desc";
    limit?: number;
    move?: "prev" | "next";
};

export async function fetchTodo(
    options: FetchTodoOptions
): Promise<
    ApiResponse<{
        todoList: TodoSchema[];
        sortTotal: number;
        allCount: number;
    }>
> {
    try {
        // const limit = options.limit || DEFAULT_CONFIG.Todo_QUERIES.limit!;
        const direction = options.order === 'desc' ? desc : asc;
        console.log(`direction: ${options.order}`)
        // どのカラムで並び替えるかも動的に切り替えたい場合
        const targetColumn = options.orderByColumn
            ? todoTable[options?.orderByColumn]
            : todoTable.limit;
        console.log(`targetColumn: ${targetColumn}`)

        // if (!!options.move) {
        //     // ページング
        //     if (lastOrder !== options.order) {
        //         lastOffset = 0; // 並び順が変わった場合はオフセットをリセット
        //     } else {
        //         if (options.move === 'next') {
        //             // 次へ：最大値（total など）を超えないように上限をガード
        //             lastOffset = Math.min(total, lastOffset + limit);
        //         } else if (options.move === 'prev') {
        //             // 前へ：0未満にならないように下限をガード
        //             lastOffset = Math.max(0, lastOffset - limit);
        //         }
        //     }
        // }

        const query = db
            .select()
            .from(todoTable)
            .orderBy(direction(targetColumn))
        //    .limit(limit)
        //.offset(lastOffset);

        // 更新
        // lastOrder = options.order || lastOrder;
        // return await query as TodoSchema[];
        const response = await query;

        // 暫定
        total = response.length
        const data = {
            status: 200,
            response: {
                todoList: response,
                sortTotal: response.length,
                allCount: total
            }
        }
        console.log("todo-queries----")
        console.log(data)
        return data
    } catch (error) {
        console.error('Database Error:', error);
        return {
            status: 400,
            message: "Failed to fetch fetchTodo"
        };
    }
}


// // delete
// export async function getTodoAllCount() {
//     try {
//         const totalFetch = (await db
//             .select()
//             .from(todoTable)).length;
//         // 更新
//         return totalFetch
//     } catch (error) {
//         console.error('Database Error:', error);
//         return 0;
//     }
// }

// export async function getDisabledInfo() {
//     try {
//         const isDisabledPrev = lastOffset === 0;
//         const isDisabledNext = lastOffset + DEFAULT_CONFIG.Todo_QUERIES.limit! >= total;

//         return { prev: isDisabledPrev, next: isDisabledNext };
//     } catch (error) {
//         console.error('Database Error:', error);
//         return { prev: true, next: true };
//     }
// }