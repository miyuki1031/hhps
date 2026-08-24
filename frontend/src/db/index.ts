/** 
 * サーバーの起動ファイルやAPIのルートファイルからは 
 * import { db } from "@/db" するだけで、いつでもどこからでもデータベースが使えるようになる
 * 
 * 
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import { Pool } from "pg";
import * as schema from "./schema/profile"; // スキーマのパスに合わせて調整

console.log("１URLチェック");

console.log(process.env.DATABASE_URL);

console.log("1POSE");
console.log(process.env.POSE);
console.log("1手動合体");
console.log(`postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.DB_HOST || 'localhost'}:5432/${process.env.POSTGRES_DB}`);



const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// export const db = drizzle(pool, { schema });
export const db = drizzle(pool, { schema, logger: true });