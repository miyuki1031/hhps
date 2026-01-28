"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut, Loader2 } from "lucide-react"; // Loader2を追加

export const LoginButton = () => {
    const { data: session, status } = useSession();

    // 読み込み中かどうかを判定
    const isLoading = status === "loading";

    return (
        <button
            suppressHydrationWarning
            onClick={() => (session ? signOut() : signIn())}
            disabled={isLoading} // ← ここでボタンをロック！
            className={`
                fixed bottom-3 right-3 z-50
                p-3 rounded-full shadow-md transition-all 
                ${session ? "bg-red-400 hover:bg-red-500" : "bg-yellow-400 hover:bg-yellow-500"}
                ${isLoading ? "opacity-50 cursor-not-allowed scale-100" : "active:scale-95"}
            `}
            title={
                isLoading
                    ? "読み込み中..."
                    : session
                      ? "ログアウト"
                      : "ログイン"
            }
        >
            {isLoading ? (
                <Loader2 className="animate-spin" size={24} /> // くるくる回るアイコン
            ) : session ? (
                <LogOut size={24} />
            ) : (
                <LogIn size={24} />
            )}
        </button>
    );
};
