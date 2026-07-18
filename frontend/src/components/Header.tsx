'use client';

import { SITE_INFO } from "@/lib/constants";
import Navigation from "./Navidation";
import ColorTheme from "./ThemeColor/ThemeColorToggle";
// Urlからパラメータ取得
import { usePathname } from "next/dist/client/components/navigation";


export default function Header() {
    const pathname = usePathname();

    return (
        <header className="w-full h-8 flex">
            <h1 className="
                flex-auto
                mt-2
                pl-2
                text-xs
            ">
                {SITE_INFO.NAME} {pathname === "/" ? "" : ` > ${pathname.replace("/", "")}`}
            </h1>

            <div className="
                flex-none
                size-14
            ">
                <ColorTheme />
            </div>

            <div className="
                flex-none
                size-14
                pt-0.5
            ">
                <Navigation />
            </div>
        </header>
    );
}