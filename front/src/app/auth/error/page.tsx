// app/auth/error/page.tsx
export default function AuthErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-red-600">アクセス制限</h1>
            <p className="mt-4 text-gray-700">
                このアプリは現在、許可されたユーザーのみログイン可能です。
            </p>
            <p className="text-sm text-gray-500">
                一般の方は管理者以外の作成のデータであればログイン不要でご利用いただけます。
            </p>

            <a
                href="/"
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                トップページへ戻る
            </a>
        </div>
    );
}
