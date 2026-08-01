
import Link from 'next/link';
import {
    ArrowDownWideNarrow,
    ArrowUpNarrowWide 
 } from 'lucide-react';

export default function ResumeControl () {

    return (
        <div className="flex gap-2 ml-auto p-3">
            <Link
                href="?page=r&order=desc"
                scroll={false} // 必要に応じてスクロール位置を維持したいとき
                className="btn btn-xs border p-2 hover:bg-gray-100 rounded-md"
            >
                <ArrowDownWideNarrow className="w-4 h-4" />
            </Link>

            {/* 昇順にするリンク */}
            <Link
                href="?page=r&order=asc"
                scroll={false}
                className="btn btn-xs border p-2 hover:bg-gray-100 rounded-md"
            >
                <ArrowUpNarrowWide className="w-4 h-4" />
            </Link>
        </div>
    )
}