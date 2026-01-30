"use client";

import { useSession } from "next-auth/react";

export const LoginUser = () => {
    const { data: session } = useSession();
    return <span>{session ? "管理者" : "ゲスト"}</span>;
};
