
import { auth, signIn, signOut } from "@/../auth";

import { LogIn, LogOut } from 'lucide-react';
import ButtonBase from "./Button/ButtonBase";

export default async function LoginUser({
    className = ""
} : {
    className?: string
}) {
    const session = await auth();
    const isLoggedIn = !!session;
    const loginMes = isLoggedIn ? "ログイン中" : "未ログイン";
    const icon = isLoggedIn ? <LogOut /> : <LogIn />;

    const handleLogin = async () => {
        "use server";
        if (session) {
            await signOut({ redirectTo: "/todo" });
        } else {
            await signIn("google", { redirectTo: "/todo" });
        }
    }

    return (
        <form
            className={className}
            action={handleLogin}
        >
            <ButtonBase
                className="ml-1"
                tooltips={{text: loginMes, className: ''}}
            >
                {icon}
            </ButtonBase>
        </form>
    );
}