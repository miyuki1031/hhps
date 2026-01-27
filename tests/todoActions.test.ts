import { vi, describe, it, expect } from 'vitest';
import { createTodoAction } from '../src/app/todos/actions';
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"
import { UpdatePayload } from "../types/types";


vi.mock("@/lib/prisma", () => ({
    prisma: {
        todoList: {
            create: vi.fn(), // DB保存したふり
        }
    }
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(), // 画面更新した不利
}));

describe('createTodoAction の本物ロジックテスト', () => {
    it("正しいデータを渡すとバリデーションを通りDB保存が呼ばれること", async () => {
        const testData: UpdatePayload = {
            title: "テストタスク",
            category: "WORK",
            priority: 1,
            explanation: "テスト説明",
            progressRate: 0,
            targetDate: "2026-01-27",
        };
        // 2. 【本物】の関数を実行！
        const result = await createTodoAction(testData);

        // 3. 検証：成功が返ってきているか？
        expect(result.success).toBe(true);

        // 4. 検証：内部でちゃんとDB保存の命令が飛んだか？
        expect(prisma.todoList.create).toHaveBeenCalled();
        
        // 5. 検証：Next.jsの画面更新が呼ばれたか？

        expect(revalidatePath).toHaveBeenCalledWith("/todos");
    })
})
