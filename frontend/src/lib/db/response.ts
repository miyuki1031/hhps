export const apiResponse = {
    // 成功時のレスポンス（必要なら取得したデータも渡せる）
    success<T>(data: T) {
        return { success: true, status: 200, data };
    },

    // 失敗時のレスポンス（メッセージを自由に変更可能。デフォルト値も設定）
    error: (message: string = "エラーが発生しました", status: number = 400) => ({
        success: false,
        status: status,
        message: message
    })
};