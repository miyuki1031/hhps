/**
 * Server Action
 */
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UpdatePayload } from "../../../types/types";

export type ActionState = {
    //    error: string | null | unknown;
    // unknownなんでも受け入れる型のためstring,nullは無意味だよ！って怒られたため下記になる
    error: unknown;
    success: boolean;
    message?: string;
};

export async function createTodoAction(
    prevState: ActionState,
    formData: FormData
) {
    console.log(`createTodoAction`);

    // 1. フォームから値を取り出す
    // カテゴリー
    const category = formData.get("todoCategory") as string;
    // タイトル
    const title = formData.get("todoTitle") as string;
    // 優先順位
    const priority = Number(formData.get("todoPriority"));
    // 説明
    const explanation = formData.get("todoExplanation") as string;
    // 目標日
    const targetDateRaw = formData.get("todoTargetDate") as string;
    const targetDate = targetDateRaw === "" ? null : new Date(targetDateRaw);
    // 進捗
    const progressRate = Number(formData.get("todoProgressRate"));

    if (!title) {
        return { success: false, error: "タイトルを入力してください" };
    }

    // 2.ここでDB保存
    console.log(`サーバー側で保存開始：${title}`);
    try {
        await prisma.todoList.create({
            data: {
                // カテゴリー
                category,
                // タイトル
                title,
                // 優先順位
                priority,
                // 説明
                explanation,
                // 目標日
                targetDate,
                // 進捗
                progressRate,
            },
        });
    } catch (e) {
        console.log("error:");
        console.log(e);
        return { success: false, error: e, message: "DB保存失敗" };
    }

    // 3. 【重要】画面の状態を最新にしてList更新をする
    // これを呼ぶとServer Componentで作ったPage.tsxが再読み込みされます
    revalidatePath("/todos");
    return { success: true, error: null };
}
////
//
///
export async function deleteTodoAction(ids: number[]) {
    console.log(`deleteTodoAction`);

    if (ids.length === 0) {
        return { success: false, error: "削除する項目を選んでください" };
    }

    console.log(`サーバー側で削除開始`);
    try {
        await prisma.todoList.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    } catch (e) {
        return { success: false, error: e, message: "DB保存失敗" };
    }

    // 3. 【重要】画面の状態を最新にしてList更新をする
    // これを呼ぶとServer Componentで作ったPage.tsxが再読み込みされます
    revalidatePath("/todos");
    return { success: true, error: null };
}
/////
// 更新
////
export async function updateTodoAction(type: string, payload: UpdatePayload) {
    if (type === "completed") {
        await prisma.todoList.update({
            where: { id: payload.id },
            data: { completed: payload.completed },
        });
    } else {
        await prisma.todoList.update({
            where: { id: payload.id },
            data: { title: payload.title },
        });
    }
    revalidatePath("/todos");
}
