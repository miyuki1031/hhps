
import { db } from "@/db";
import { todoTable } from "@/db/schema/todo";
export async function insertTodoData() {
    await db.insert(todoTable).values([
        {
            title: "Todo画面製造",
            description: "Todo画面製造",
            dueDate: "2026/08/06",
            isPrivate: false,
            isComplete: false,
            isDelete: false,
            isMasterAuthor: true
        }, {
            title: "部屋大掃除",
            description: "お盆のための大掃除",
            dueDate: "2026/08/09",
            isPrivate: true,
            isComplete: false,
            isDelete: false,
            isMasterAuthor: true
        }, {
            title: "Todo画面に登録・編集を付ける",
            description: "Todo画面に登録・編集を付ける",
            dueDate: "2026/08/10",
            isPrivate: true,
            isComplete: false,
            isDelete: false,
            isMasterAuthor: true
        }, {
            title: "お盆",
            description: "お墓参り",
            dueDate: "2026/08/11",
            isPrivate: true,
            isComplete: false,
            isDelete: false,
            isMasterAuthor: true
        }, {
            title: "JAVAの基礎",
            description: "",
            dueDate: "2026/08/14",
            isPrivate: false,
            isComplete: false,
            isDelete: false,
            isMasterAuthor: true
        }, {
            title: "就職就職開始！",
            description: "いざ就職開始！",
            isPrivate: true,
            isComplete: false,
            dueDate: "2026/08/31",
            isDelete: false,
            isMasterAuthor: true
        }
    ]);
}
// スクリプトの最下部に呼び出しがあるか確認
insertTodoData()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error("Seeding failed:", err);
        process.exit(1);
    });