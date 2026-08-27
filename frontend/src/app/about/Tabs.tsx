'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Tabs() {
    const pathname = usePathname();
    const isProfile = pathname === '/about';
    const isResume =  pathname === '/about/resume';
    const isIntroduction =  pathname === '/about/introduction';
    const style_button_base ="tab p-6 text-center focus:outline-none ";
    return (
        <div className="w-auto">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <Link
                    href="/about"
                    scroll={false} // 必要に応じてスクロール位置を維持したいとき
                    className={`
                        ${style_button_base}
                        ${isProfile
                            ? "bg-amber-300 font-bold" 
                            : "bg-gray-300 cursor-pointer"
                        }
                    `}
                >
                    Profile
                </Link>

                <Link
                    href="/about/resume"
                    scroll={false} // 必要に応じてスクロール位置を維持したいとき
                    className={`
                        ${style_button_base}
                        ${isResume
                            ? "bg-amber-300 font-bold" 
                            : "bg-gray-300 cursor-pointer"
                        }
                    `}
                >
                    Resume
                </Link>

                <Link
                    href="/about/introduction"
                    scroll={false} // 必要に応じてスクロール位置を維持したいとき
                    className={`
                        ${style_button_base}
                        ${isIntroduction
                            ? "bg-amber-300 font-bold" 
                            : "bg-gray-300 cursor-pointer"
                        }
                    `}
                >
                    Introduction
                </Link>
            </div>
        </div>
    )
}
