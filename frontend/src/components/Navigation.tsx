'use client';
import { CONTENTS } from '@/lib/constants';
import ColorTheme from './ColorTheme';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, MouseEvent } from 'react';

interface NavigationProps {
    className?: string
}
export default function Navigation({
    className = "" 
} : NavigationProps) {
    const pathname = usePathname();
    const content = (Object.values(CONTENTS)).filter((item) => item.IS_ENABLED);
    const [ isOpen, setIsOpen ] = useState(false);
    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        if (e.type !== "blur") {
            setIsOpen(!isOpen);
        }
    };
    return (
        <div
            tabIndex={0}
            className={`
                ${className} 
                z-50
                menu-wrapper
                fixed
                inset-y-0
                right-0
                rounded-l-2xl
                items-center
                justify-center
                drawer-button
                cursor-pointer
                ${isOpen
                    ? "w-full md:w-40"
                    : "w-16"
                }
                translate-x-0
                transition-all duration-300 ease-in-out

            `}
            onClick={handleClose}
            onBlur={()=>setIsOpen(false)}
            >
                <ul className={`
                    min-h-full
                    p-4
                    ${isOpen
                        ? "w-full md:w-80"
                        : "w-16"
                    }
                `}>
                    { content.map((item, index) => {
                        const Icon = item.LABEL;
                        return (
                            <li
                                key={index}
                                className="
                                    w-full
                                    h-14
                                    md:tooltip
                                    md:tooltip-start
                                    md:tooltip-left
                                    hover:bg-white/10
                                    items-center
                                "
                                data-tip={item.DESCRIPTION}
                            >
                                <Link
                                    className={`
                                        hover:bg-white/10 text-white
                                        ${ pathname === item.HREF
                                            ? "bg-white/10"
                                            : ""
                                        }
                                    `}
                                    href={item.HREF}
                                >
                                    <div className="flex p-2 pl-1">
                                        <div className="pt-2">
                                            <Icon size={20} />
                                        </div>
                                        <div
                                            className={`
                                                p-2
                                                ${isOpen? "text-white": "hidden"}
                                            `}
                                        >{item.NAME}</div>
                                    </div>
                                </Link>
                            </li>
                            )
                        }) }
                        <li 
                            className="
                                w-full
                                h-14
                                md:tooltip
                                md:tooltip-start
                                md:tooltip-left
                                hover:bg-white/10
                                items-center
                                text-white
                            "
                            data-tip="モード切替">
                                <ColorTheme size={20}>
                                    <div
                                        className={`
                                            p-2
                                            ${isOpen? "text-white": "hidden"}
                                        `}
                                    >モード切替</div>
                            </ColorTheme>
                        </li>

                </ul>
        </div>
    );
}