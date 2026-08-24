
import { db } from "@/db";
import { profileTable } from "@/db/schema/profile";
export async function insertResumeData() {
    console.log("Profile seeded start");
    await db.insert(profileTable).values({
        name: "MZY[mizi] みじぃ",
        learning: ["NextJs", "ReactJs", "VueJs", "JAVA"],
        location: "ラニアケア超銀河団局所銀河群天の川銀河オリオン腕 太陽系第三惑星地球 日本の関東",
        locationEn: "Location Laniakea / Local Group / Milky Way / Orion Arm Solar System / Earth / Kanto, Japan",
        licenses: "車・電工２（試験合格）"
    })
    console.log("Profile seeded successfully!");
}
// スクリプトの最下部に呼び出しがあるか確認
insertResumeData()
    .then(() => {
        process.exit(0);
    })
    .catch((err) => {
        console.error("Seeding failetd:", err);
        process.exit(1);
    });