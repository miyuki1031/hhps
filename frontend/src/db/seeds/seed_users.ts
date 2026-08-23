
import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
export async function insertUsersData() {
    await db.insert(usersTable).values([
        {
            name: "みじぃ",
            email: "miyukiyamazaki1984@gmail.com",
            roll: "m",
        }
    ]);
}
// スクリプトの最下部に呼び出しがあるか確認
insertUsersData()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error("Seeding failed users:", err);
        process.exit(1);
    });