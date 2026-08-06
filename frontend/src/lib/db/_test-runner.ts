import dotenv from "dotenv";
import path from "path";


// 試験用ファイルから見たプロジェクトルートの .env を明示的に読み込む
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

// 本番用のファイルをインポートして実行
import "./todo-queries"; // または検証したいファイル


async function run() {
    console.log("テスト実行開始...");
    const result = await fetchTodo(/* 必要な引数があれば入れる */);
    console.log("実行結果:", result);
}

run();