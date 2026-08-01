'use client';
import { useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface TabsProps {
    profileComponent: ReactNode
    resumeComponent: ReactNode
}


export default function Tabs ({ profileComponent, resumeComponent  }: TabsProps) {
    const router = useRouter();
    const [ isProfile, setIsProfile ] = useState(true);
    const handleToggle = (tabName: 'p' | 'r') => {
        setIsProfile(tabName === "p");
        // リロードせずに URL だけを ?page=p や ?page=r に書き換える（スクロール位置を維持）
        router.push(`?page=${tabName}`, { scroll: false });
    }

    return (
        <>
        <div className="w-auto">
            <div className="grid grid-cols-2">
                <button
                    className={`
                        tab
                        p-2
                        text-center
                        focus:outline-none
                        ${isProfile
                            ? "bg-amber-300 font-bold" 
                            : "bg-gray-300 cursor-pointer"
                        }
                    `}
                    onClick={()=>{ handleToggle("p") }}
                >
                   Profile
                </button>
                <button
                    className={`
                        tab
                        p-2
                        text-center
                        focus:outline-none
                        ${!isProfile
                            ? "bg-amber-300 font-bold" 
                            : "bg-gray-300 cursor-pointer"
                        }
                    `}
                    onClick={()=>{ handleToggle("r") }}
                >
                    Resume
                </button>
            </div>
        </div>
        {/* 状態によって表示を切り替える */}
        <div className={isProfile ? 'block' : 'hidden'}>
            {profileComponent}
        </div>
        <div className={!isProfile ? 'block' : 'hidden'}>
            {resumeComponent}
        </div>
       
       </>
    )
}
