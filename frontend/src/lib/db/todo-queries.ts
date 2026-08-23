import { db } from "@/db";

import { TodoSchema, ApiResponse, TodoOptions } from '../definitions';
// import { DEFAULT_CONFIG } from '../constants';
import { todoTable } from '@/db/schema/todo';

import { asc, desc, eq, and } from 'drizzle-orm';
import { apiResponse } from './response';



// // ページング用の最後の位置
// let lastOffset = 0;
// // 前回のソート順を保持
// let lastOrder = DEFAULT_CONFIG.RESUME_QUERIES.order;
// // 合計値
export let total = 0;
//// →ソースコードから指定するようにする

// export type fetchResumeOptionsProps = Record<string, number | boolean | string | "asc" | "desc">;


export async function fetchTodo(
    options: TodoOptions
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
        //        console.log(`direction: ${options.order}`)
        // どのカラムで並び替えるかも動的に切り替えたい場合
        const targetColumn = options.orderByColumn
            ? todoTable[options?.orderByColumn]
            : todoTable.dueDate;
        const castBoolean = (target: string | boolean): boolean => {
            // console.log(`★★★${name}:${target}`);
            if (typeof target === "boolean") return target;
            return target === "true";
        }
        const isDelete = castBoolean(options.isDelete);
        const isComplete = castBoolean(options.isComplete);
        const isPrivate = castBoolean(options.isPrivate);

        // console.log(`
        //     isDelete: ${isDelete}
        //     isComplete: ${isComplete}
        //     privates: ${privates}


        //     `)
        const query = db
            .select()
            .from(todoTable)
            .where(
                and(
                    eq(todoTable.isDelete, isDelete),
                    eq(todoTable.isComplete, isComplete),
                    eq(todoTable.isPrivate, isPrivate)
                )
            )
            .orderBy(direction(targetColumn));

        const response = await query;
        //    console.log(response)

        // 暫定
        total = response.length
        const data = {
            todoList: response,
            sortTotal: response.length,
            allCount: total
        }

        return apiResponse.success(data);
    } catch (error) {
        console.error('Database Error:', error);
        return apiResponse.error();
    }
}

