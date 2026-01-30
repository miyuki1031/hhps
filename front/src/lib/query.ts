import { Prisma } from "@prisma/client";

/***
 * getTodoWhereQuery
 * Todo画面検索クエリ抽出
 */
// シンプルに「Todo用のパラメータ変換」と割り切る
export const getTodoWhereQuery = (params: Record<string, string | string[] | undefined>): Prisma.TodoWhereInput => {
    const query:Prisma.TodoWhereInput = {};
    // 補助関数：配列でも文字列でも、とにかく最初の1文字目を取得する
    const getFirst = (val: string | string[] | undefined): string | undefined => {
        if (!val) return undefined;
        return Array.isArray(val) ? val[0] : val;
    };
    if (params?.isValid !== undefined) {
        query.isValid = getFirst(params?.isValid) === "true";
    }
    if (params?.completed !== undefined) {
        query.completed = getFirst(params?.completed) === "true";
    }
    if (params?.title !== undefined) {
        query.title = getFirst(params.title);
    }
    if (params?.category !== undefined) {
        query.category = getFirst(params.category);
    }
    if (params?.priority !== undefined) {
        const p = getFirst(params.priority);
        query.priority = p ? Number.parseInt(p) : undefined;
    }
    return query
};