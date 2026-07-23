'use client';
import { CONTENTS } from '@/lib/constants';

import { Menu } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';

import ColorTheme from './ColorTheme';
import ButtonBase from '@/components/Button/ButtonBase';

interface NavigationProps {
    className?: string
}
export default function Navigation({ className = '' }: NavigationProps) {
    
    const pathname = usePathname();
    const content = (Object.values(CONTENTS)).filter((item) => item.IS_ENABLED);
    const [ isOpen, setIsOpen ] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    /** メニュー開閉 */
    const handleToggleMenu = () => {
        // トグル
        setIsOpen(!isOpen);
    }
    /** メニュー閉 */
    const handleCloseMenu =  (e: React.FocusEvent) => {
        // クリックされた先が、ドロップダウンメニューの内側（ボタンやリスト）であれば閉じない
        if (e.currentTarget.contains(e.relatedTarget as Node)) {
        return;
        }
        setIsOpen(false);
    }        

    return (
        
        <div className={`
            hsl-c-navigation
            ${className}
            `}
            onBlur={handleCloseMenu}
        >
            <div className="hsl-screen-full">
                <button
                    ref={buttonRef}
                    className="
                        z-100
                        w-7.5 h-7.5
                        btn btn-square
                        min-h-0
                        bg-[radial-gradient(circle_closest-corner,#ffffff_0%,#ffcc00_100%)]
                        border-none
                        cursor-pointer
                    "
                    onClick={handleToggleMenu}
                    suppressHydrationWarning={true}
                    >
                    <Menu className="grow-0 w-4 h-4 text-neutral" />
                </button>
                <ul
                    className={`
                        menu 
                        bg-neutral-800 
                        text-white 
                        rounded-box 
                        w-52 
                        p-2 
                        shadow-lg 
                        border border-white/10
                        mt-2
                        transition-all duration-200 ease-out
                        relative
                        -top-[15px]
                        right-[155px]
                        z-100
                        ${isOpen 
                            ? "opacity-100 visible translate-y-0 scale-100" 
                            : "opacity-0 invisible -translate-y-2 scale-95"
                        }
                `}>
                    { content.map((item, index) => {
                        const Icon = item.LABEL;
                        return (
                            <li
                                key={index}
                                className="tooltip"
                                data-tip={item.DESCRIPTION}
                            >
                                <Link
                                    onClick={() => setIsOpen(false) }
                                    className={`
                                        hover:bg-white/10 text-white
                                        ${ pathname === item.HREF
                                            ? "bg-white/10"
                                            : ""
                                        }
                                    `}
                                    href={item.HREF}
                                >
                                        
                                    <Icon size={20} />
                                    {item.NAME}
                                </Link>
                            </li>
                        )
                    }) }
                    <li 
                        className="
                            tooltip
                            hover:bg-white/10
                            text-white
                            flex justify-start
                        "
                        data-tip="モード切替">
                        <ColorTheme
                            size={20}
                            className="
                                grid
                                justify-items-start
                            "
                            description="モード切替"
                        />
                    </li>
                </ul>
            </div>

            <div className="
                fab
                fab-flower
                hsl-screen-compact
            ">
                <div
                    tabIndex={0}
                    role="button"
                    className="
                        btn
                        btn-lg
                        btn-circle
                    "
                    onClick={handleToggleMenu}
                >
                    <Menu className="grow-0 w-4 h-4 text-neutral" />

                </div>
                    { content.map((item, index) => {
                        return (
                            <ButtonBase
                                key={index}
                                className={`
                                    btn btn-lg btn-circle
                                `}
                                onClick={() => setIsOpen(false) }
                                href={item.HREF}
                            >
                            {item.NAME.slice(0,1)}
                            </ButtonBase>
                        )
                    })}
                    <ColorTheme
                        size={24}
                        className="
                            btn
                            btn-lg
                            btn-circle
                        "
                    />
                </div>
        </div>
    );
}