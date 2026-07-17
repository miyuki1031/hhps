'use client';

import { SITE_INFO } from "@/lib/constants";
import Navigation from "./Navidation";
import ColorTheme from "./ColorTheme";
import { usePathname } from "next/dist/client/components/navigation";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="
            w-full
            h-8
            flex
            bg-[linear-gradient(to_right,#0B131E_0%_40%,#1A305C_40%_55%,#285C8F_75%_85%,#3D85C6_75%_100%)]">
            <h1 className="
                flex-auto
                mt-2
                text-xs
                text-white/50
            ">
                {SITE_INFO.NAME}
                {pathname === "/" ? "" : ` > ${pathname.replace("/", "")}`}
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
            ">
                <Navigation />
            </div>
        </header>
    );
}