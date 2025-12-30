// src/app/page.tsx
import { prisma } from "../../lib/prisma";
import { TodoList } from "./_components/TodoList";

export default async function Home() {
    const todos = await prisma.todoList.findMany();

    return (
        <main className="p-10 flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold text-blue-600">Todo一覧</h1>
            {todos.length === 0 && <p>Todoはまだ登録されていません。</p>}
            <TodoList todos={todos} />
        </main>
    );
}
