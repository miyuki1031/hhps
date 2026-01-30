// src/app/page.tsx
import { prisma } from "../../lib/prisma";
import { getTodoWhereQuery } from "@/lib/query";
import { cleanUpTodoAction } from "@/app/todos/actions";

import { Regist } from "./_components/Regist";
import { List } from "./_components/List";
import { Filters } from "./_components/Filters";

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
    const params = await searchParams;
    await cleanUpTodoAction();

    const todos = await prisma.todo.findMany({
        where: getTodoWhereQuery(params),
    });

    return (
        <>
            <h1 className="p-4 z-50 text-3xl font-bold text-amber-700 mt-[50px] bg-gray-200">
                Todo一覧
            </h1>
            <main className="w-[calc(100%-3rem)] p-10 pt-0 flex flex-col items-center justify-center">
                <div className="w-full flex justify-between items-center gap-4 py-2">
                    <Regist />
                    <Filters />
                </div>
                {todos.length === 0 && <p>Todoはまだ登録されていません。</p>}
                <List todos={todos} />
                {/* <LoginUser /> */}
            </main>
        </>
    );
}
