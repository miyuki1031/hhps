/**
 * Server Action
 */
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UpdatePayload } from "../../../types/types";
import { todoSchema } from "../../lib/schema"; // ←これで本体を読み込んでテストする
export type ActionState = {
    //    error: string | null | unknown;
    // unknownなんでも受け入れる型のためstring,nullは無意味だよ！って怒られたため下記になる
    error: unknown;
    success: boolean;
    message?: string;
};

export async function createTodoAction(data: UpdatePayload) {
    console.log(`createTodoAction`);
    console.log(data);
    // 3. 検問開始！JSコードが紛れ込んでいても、ここで型が合わなければ弾かれる
    const result = todoSchema.safeParse(data);
    if (!result.success) {
        // すべてのエラーメッセージを1つの配列にまとめる
        const errorMessages = result.error.issues.map((issue) => ({
            message: issue.message,
        }));
        return { success: false, errors: errorMessages };
    }

    // 1. フォームから値を取り出す
    // カテゴリー
    const category = data.category ?? "";
    // タイトル
    const title = data.title;
    // 優先順位
    const priority = Number(data.priority);
    // 説明
    const explanation = data.explanation;
    // 目標日
    const targetDateRaw = data.targetDate ?? "";
    const targetDate = targetDateRaw === "" ? null : new Date(targetDateRaw);
    // 進捗
    const progressRate = Number(data.progressRate);

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
export async function updateTodoAction(
    id: number,
    type: keyof UpdatePayload, //string,
    payload: UpdatePayload,
) {
    console.log("updateTodoAction---------------------");
    console.log(`id: ${id} / type: ${type} / payload: ${payload} `);
    console.log(payload);
    const updateData: UpdatePayload = { [type]: payload[type] };
    // 2. スキーマの partial() を使って、渡された項目だけを検問する
    const result = todoSchema.partial().safeParse(updateData);
    if (!result.success) {
        const errorMessages = result.error.issues.map((issue) => ({
            message: issue.message,
        }));
        return { success: false, errors: errorMessages };
    }

    // 3. 特殊な変換が必要なものだけ個別に処理（日付など）
    const finalData: Record<string, unknown> = { ...updateData };
    if (type === "targetDate") {
        const raw = payload.targetDate as string;
        finalData.targetDate = raw === "" ? null : new Date(raw);
    }

    // 4. DB更新（dataには検証済みの1項目だけが入っている）
    try {
        await prisma.todoList.update({
            where: { id },
            data: finalData,
        });
    } catch (e) {
        return { success: false, error: e, message: "更新失敗" };
    }
    revalidatePath("/todos");
    return { success: true, error: null };
}
