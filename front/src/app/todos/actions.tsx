/**
 * Server Action
 */
"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "../../../auth";
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
    const session = await auth();
    // ユーザーID 入っていれば管理者、ブランクはGuest
    const userId = session?.user?.id ?? null;
    // 消す？TEMP_USER_ID; // data.userId ?? "";

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
        await prisma.todo.create({
            data: {
                // ユーザーid
                userId,
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
/**
 * cleanUpTodoAction
 * 表示時に有効期限切れ（＝更新日）の論理削除データを物理削除
 * ※ログインが必要のため画面表示済みの場合、ログイン後再実行
 */
export async function cleanUpTodoAction() {
    // ログインチェック
    const session = await auth();
    // ユーザーID 入っていれば管理者、ブランクはGuest
    const userId = session?.user?.id ?? null;
    // 削除なし
    if (userId === null) return;

    // 1. 境界線の時間を計算
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // 2. ゲストのゴミ掃除（1日経過）
    await prisma.todo.deleteMany({
        where: {
            userId: "", // ゲスト
            updatedAt: { lt: oneDayAgo },
        },
    });
    // 3. 管理者のゴミ掃除（7日経過）
    await prisma.todo.deleteMany({
        where: {
            userId: { not: "" }, // 自分（またはログインユーザー）
            isValid: false, // 論理削除済み
            updatedAt: { lt: oneWeekAgo },
        },
    });
}

///
export async function deleteTodoAction(ids: string[], isSoftDelete: boolean) {
    console.log(`deleteTodoAction`);

    if (ids.length === 0) {
        return { success: false, error: "削除する項目を選んでください" };
    }
    const session = await auth();
    // ユーザーID 入っていれば管理者、ブランクはGuest
    const userId = session?.user?.id ?? null;

    console.log(`サーバー側で削除開始`);
    try {
        if (isSoftDelete) {
            // 論理削除
            await prisma.todo.updateMany({
                where: {
                    id: {
                        in: ids,
                    },
                },
                data: {
                    isValid: false,
                    updatedAt: new Date(),
                },
            });
        } else {
            // 物理削除
            await prisma.todo.deleteMany({
                where: {
                    id: { in: ids },
                    userId: userId, // セキュリティ：自分のデータだけを対象にする
                },
            });
        }
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
    id: string,
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
        await prisma.todo.update({
            where: {
                id: id,
                //    userId: userId, // 「このTodoのID」かつ「自分のもの」であること！
            },
            data: finalData,
        });
    } catch (e) {
        return { success: false, error: e, message: "更新失敗" };
    }
    revalidatePath("/todos");
    return { success: true, error: null };
}
