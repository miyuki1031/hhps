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
        <div className="absolute bottom-10 right-10 md:static md:bottom-auto md:right-auto">
            <div className="drawer drawer-end" >
                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label
                        htmlFor="my-drawer-1"
                        className="
                            btn
                            btn-circle
                            drawer-button
                            bg-[radial-gradient(circle_closest-corner,#ffffff_0%,#ffcc00_100%)]
                            w-10
                            h-10
                        "
                    >
                        <Menu
                            className="
                                grow-0
                                w-4
                                h-4
                                text-neutral
                            "
                        />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
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
            </div>
        </div>
    );
}