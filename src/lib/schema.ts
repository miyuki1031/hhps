import { z } from "zod";


// TODOのルールを定義
export const todoSchema = z.object({
    completed: z.boolean().default(false),
    // 1文字以上、100文字以内、前後の空白を削除
    title: z
        .string()
        .min(1, { message: "タイトルを入力してください" })
        .max(100, { message: "長すぎます（100文字以内）" })
        .trim()
        .min(1)
        .refine((val) => !/[<>]/g.test(val), {
            message: "HTMLタグは入力できません",
        }),
    category: z.enum(["WORK", "PRIVATE", "OTHER"]).default("WORK"),
    explanation: z.string().max(500).optional(),
    priority: z.coerce.number().min(0).max(3).default(0), // 文字列で来ても数値に変換してチェック
    progressRate: z.coerce.number().min(0).max(100).default(0),
    targetDate: z.coerce
        .date() // 1. まずはDate型に変換を試みる
        .nullable() // nullもOKにする
        .optional() // 未定義もOKにする
        .refine(
            (val) => {
                // チェックルールをここに書く
                // trueを返せば合格、falseならエラー
                if (val === null || val === undefined) return true;
                // Dateオブジェクトが「有効な日付」かチェック
                if (Number.isNaN(val.getTime())) return false;
                // 「今日」の 00:00:00 を取得（時間まで比較すると、操作した瞬間の秒数でエラーになるため）
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                return val >= today; // 今日、または今日より未来ならOK
            },
            {
                // falseの時に出すメッセージ
                message: "正しい日付を入力してください",
            }
        ),
});