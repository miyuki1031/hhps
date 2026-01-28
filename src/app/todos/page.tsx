// src/app/page.tsx
import { prisma } from "../../lib/prisma";
import { auth } from "../../../auth";

import { Regist } from "./_components/Regist";
import { List } from "./_components/List";

export default async function Home() {
    const session = await auth();
    if (!session?.user) return <div>ログインしてください</div>;

    const todos = await prisma.todo.findMany({
        where: { userId: session.user.id },
    });

    return (
        <main className="p-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-amber-700">Todo一覧</h1>
            <Regist />
            {todos.length === 0 && <p>Todoはまだ登録されていません。</p>}
            <List todos={todos} />
        </main>
    );
}
