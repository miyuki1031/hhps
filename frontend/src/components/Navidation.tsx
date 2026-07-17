import { CONTENTS } from '@/lib/constants';
import { Menu } from 'lucide-react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from "react";


export default function Navigation() {
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
        <div className="
            dropdown
            dropdown-bottom
            dropdown-end"
            onBlur={handleCloseMenu}
        >
            <button
                ref={buttonRef}
                className="
                    btn btn-square
                    h-7 w-7
                    min-h-0
                    bg-[radial-gradient(circle_closest-corner,#ffffff_0%,#ffcc00_100%)]
                    border-none
                "
                onClick={handleToggleMenu}
                >
                <Menu className="grow-0 w-4 h-4 text-neutral" />
            </button>
                <ul
                    className={`
                        dropdown-content 
                        menu 
                        bg-neutral-800 
                        text-white 
                        rounded-box 
                        w-52 
                        p-2 
                        shadow-lg 
                        border border-white/10
                        mt-2
                        z-[1]
                        transition-all duration-200 ease-out
                        ${isOpen 
                            ? "opacity-100 visible translate-y-0 scale-100" 
                            : "opacity-0 invisible -translate-y-2 scale-95"
                        }
                    `}
                    >
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
                </ul>
        </div>
    );
}