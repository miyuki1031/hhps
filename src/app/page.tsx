/**
 * PATH: src/app/page.tsx
 * */
import Navigation from "../components/Navigation";

export default async function Home() {
    return (
        <main className="p-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">ようこそ</h1>
            <div className="flex gap-4">
                まだ突貫工事中です。Todo画面くらいしか見れるものはありません。
            </div>
        </main>
    );
}
