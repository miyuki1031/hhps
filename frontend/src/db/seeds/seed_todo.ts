
import { db } from "@/db";
import { todoTable } from "@/db/schema/todo";
export async function insertTodoeData() {
    await db.insert(todoTable).values([
        {
            title: "画面をつく",
            description: "画面政策",
            limit: "2026/08/06",
            isDelete: false,
        }
    ]);
}
// スクリプトの最下部に呼び出しがあるか確認
insertTodoeData()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error("Seeding failed:", err);
        process.exit(1);
    });