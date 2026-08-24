'use server';
import { db } from "@/db";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { TodoSchema, ApiResponse } from '../definitions';

import { todoTable } from '@/db/schema/todo';
import { eq } from 'drizzle-orm';
import { apiResponse } from './response';
import { checkRoll } from "@/lib/db/users-queries";


const FormSchema = z.object({
    id: z.string({
        message: 'IDは必須'
    }),
    title: z.string().trim().min(1, {
        message: 'タイトルは必須',
    }),
    description: z.string().optional(),
    dueDate: z.string().transform(val => val === "" ? null : val).nullable(),
    isPrivate: z.boolean().default(false),
    isComplete: z.boolean().default(false),
    isDelete: z.boolean().default(false),
    isMasterAuthor: z.boolean().default(false),
})
const CreateTodo = FormSchema.omit({ id: true });
const DeleteTodo = FormSchema.pick({ id: true });

type handleCompletedTypes = {
    id: string;
    isComplete: boolean;
};

export async function toggleComplete(
    options: handleCompletedTypes
): Promise<
    ApiResponse<unknown>
> {
    const { id, isComplete } = options;
    try {
        const query = db
            .update(todoTable)
            .set({ isComplete: isComplete })
            .where(eq(todoTable.id, id));

        await query;
        return apiResponse.success("");
    } catch (error) {
        console.error('Database Error:', error);
        return apiResponse.error('Database Error:' + error);
    }
}

export async function createTodo(
    options: TodoSchema
): Promise<
    ApiResponse<unknown>
> {
    const session = await checkRoll();
    const { isGuest, isLoginMaster } = session.data ?? {
        isGuest: true, isLoginMaster: false, isLoginUser: false
    };
    if (isGuest) {
        return apiResponse.error("編集権限がありません");
    }

    const validatedFields = CreateTodo.safeParse({
        title: options.title,
        description: options.description,
        dueDate: options.dueDate,
        isPrivate: options.isPrivate,
        isComplete: options.isComplete,
        isDelete: options.isDelete,
        isMasterAuthor: isLoginMaster
    });

    if (!validatedFields.success) {
        return apiResponse
            .error(Object.values(validatedFields.error.flatten().fieldErrors)
                .flat().join(' / '));
    }

    try {
        const query = db
            .insert(todoTable)
            .values(validatedFields.data);

        await query;

        revalidatePath('/todo');

        return apiResponse.success("");
    } catch (error) {
        console.error('Database Error:', error);
        return apiResponse.error();
    }

}

export async function updateTodo(
    options: TodoSchema
): Promise<
    ApiResponse<unknown>
> {
    const session = await checkRoll();
    const { isGuest } = session.data ?? {
        isGuest: true, isLoginMaster: false, isLoginUser: false
    };
    if (isGuest) {
        return apiResponse.error("編集権限がありません");
    }

    const validatedFields = FormSchema.safeParse({
        id: options.id,
        title: options?.title,
        description: options.description,
        dueDate: options.dueDate,
        isPrivate: options.isPrivate,
        isComplete: options.isComplete,
        isDelete: options.isDelete,
    });

    if (!validatedFields.success) {
        return apiResponse
            .error(Object.values(validatedFields.error.flatten().fieldErrors)
                .flat().join(' / '));
    }

    try {
        const query = db
            .update(todoTable)
            .set(validatedFields.data)
            .where(eq(todoTable.id, options.id));

        await query;

        revalidatePath('/todo');

        return apiResponse.success("");
    } catch (error) {
        console.error('Database Error:', error);
        return apiResponse.error();
    }
}

/** 物理削除（論理削除の場合はupdateTodo） */
export async function deleteTodo(
    options: {
        id: string;
        isDelete: boolean;
        isHard?: boolean;
    }
): Promise<
    ApiResponse<unknown>
> {
    const session = await checkRoll();
    const { isGuest, isLoginMaster } = session.data ?? {
        isGuest: true, isLoginMaster: false, isLoginUser: false
    };
    if (isGuest) {
        return apiResponse.error("削除権限がありません");
    }
    const { id, isHard = false } = options;
    const validatedFields = DeleteTodo.safeParse({
        id: id,
    });

    if (!validatedFields.success) {
        return apiResponse.error(Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' / '));
    }
    let query = null;

    if (isHard && isLoginMaster) {
        // 物理削除(後にログインチェック)
        query = db.delete(todoTable)
            .where(eq(todoTable.id, options.id));
    } else {
        // 論理削除
        query = db.update(todoTable)
            .set({ isDelete: true })
            .where(eq(todoTable.id, options.id));
    }

    try {
        await query;
        revalidatePath('/todo');
        return apiResponse.success("");
    } catch (error) {
        console.error('Database Error:', error)
        return apiResponse.error();
    }
}