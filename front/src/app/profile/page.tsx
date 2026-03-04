import { apiFetch } from "@/lib/api";
// types フォルダに書く必要すらなくなるじぇ！
import { profile } from "@prisma/client";

export default async function Profile() {
    // const res = await fetch("http://localhost:3000/api/Profile/me");
    const data = await apiFetch<profile>("/Profile/me");
    console.log("Profile data:", data); // デバッグ用ログ
    return (
        <main className="p-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-blue-600">プロフィル</h1>a 【
        </main>
    );
}
