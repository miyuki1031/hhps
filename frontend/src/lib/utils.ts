// export const castBoolean = (target: string | boolean): boolean => {
//     // console.log(`★★★${name}:${target}`);
//     if (typeof target === "boolean") return target;
//     return target === "true";
// }
export const castBoolean = (target: string | boolean): boolean => {
    if (typeof target === "boolean") return target;
    return target === "true";
}

export const castOrder = (target: unknown): "asc" | "desc" => {
    return target === "asc" || target === "desc" ? target : "desc";
};

// const castOrderByColumn = (target: unknown): TodoColumnKey => {
//     // 有効なカラム名のリストや型チェックを行って安全なものを返す
//     // 例: 許可されたカラム名でなければデフォルトの "dueDate" を返すなど
//     return isValidColumn(target) ? target : "dueDate";
// };
// 例：有効なカラム名かどうかを判定する共通ヘルパー
export const castOrderByColumn = <T extends readonly string[]>(
    target: unknown,
    validColumns: T,
    defaultColumn: T[number] // ←ここを keyof T ではなく T[number] にする
): T[number] => {
    if (typeof target === "string" && (validColumns as readonly string[]).includes(target)) {
        return target as T[number];
    }
    return defaultColumn;
};
