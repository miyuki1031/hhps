"use client";
/** import { usePathname } from "next/navigation"; */
import { useState } from "react";

import { CONTENTS } from "../lib/constants";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { LoginButton } from "./Button/LoginButton";
export default function Navigation() {
    const content = Object.values(CONTENTS);
    const [isDisplay, setIsDisplay] = useState(false);
    const onToggle = () => {
        setIsDisplay(!isDisplay);
    };
    return (
        <nav
            className={`
                absolute right-0 top-0 min-h-screen
                transition-all duration-300 ease-in-out
                ${isDisplay ? "w-60" : "w-12"}
              `}
        >
            <ul className="menu w-56">
                <li className="mt-1">
                    <ButtonIcon
                        className={`bg-yellow-300 h-10 flex justify-end ${
                            isDisplay ? "w-60" : "w-12"
                        }`}
                        onClick={onToggle}
                    >
                        <Menu size={20} className=" w-10" />
                    </ButtonIcon>
                </li>
                {content.map((item) => {
                    const Icon = item.label; // 大文字で代入するのがポイント！
                    return (
                        <li
                            key={item.name}
                            className="mt-5 h-10 w-56  tooltip tooltip-left"
                            data-tip={item.name}
                        >
                            <Link
                                href={item.href}
                                className="py-3 bg-yellow-400 text-sky-900 rounded-lg hover:bg-yellow-600 transition"
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            <LoginButton />
        </nav>
    );
}
