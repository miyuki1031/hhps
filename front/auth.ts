import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google" // 1. これを追加
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    // 1. PrismaとAuth.jsを繋ぐ「アダプター」を設定
    adapter: PrismaAdapter(prisma),
  
    // 2. ログイン方法（プロバイダー）の設定
    providers: [
        GoogleProvider({ // 2. これを追加
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            // ログイン画面の入力項目を定義（後で自作画面を作るのでシンプルでOK）
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                // ここでDBを検索して、ユーザーが正しいかチェックする
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                // 本来はここでパスワードのハッシュ化比較（bcrypt等）をしますが、
                // まずは「ユーザーが存在するか」だけでテストします
                if (!user) return null;

                return user;
            },
        }),
    ],
  
    // 3. セッションの設定（Prismaアダプターを使う場合はデフォルトでデータベースセッションになります）
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user }) {
            const email = user?.email;
            if (!email) return false; // メアドがなければ即終了
            return (process.env.MASTER_ADDRESS?.split(",") || [])
        .map(s => s.trim())
        .includes(email);
            
        },
        // セッションにユーザーIDを載せるためのマジック
        session: ({ session, token }) => {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
});