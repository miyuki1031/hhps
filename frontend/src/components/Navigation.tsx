'use client';
import { CONTENTS } from '@/lib/constants';
import ColorTheme from './ColorTheme';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';



interface NavigationProps {
    className?: string
}
export default function Navigation({ className }: NavigationProps) {
    const pathname = usePathname();
    const content = (Object.values(CONTENTS)).filter((item) => item.IS_ENABLED);
    const [isChecked, setIsChecked] = useState(false);
    
    return (
        <div className={`absolute bottom-10 right-10 md:static md:bottom-auto md:right-auto z-50
            ${className}
            `}>
            <div className="drawer drawer-end" >
                <input id="my-drawer-1" type="checkbox" className="drawer-toggle" checked={isChecked} 
                onChange={(e) => setIsChecked(e.target.checked)}/>
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
                    <ul className="menu bg-base-200 min-h-full w-full md:w-80 p-4">
                        { content.map((item, index) => {
                            const Icon = item.LABEL;
                            return (
                                <li
                                    key={index}
                                    className="tooltip"
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