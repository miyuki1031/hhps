'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Trash2, CalendarDays, ZoomIn, ZoomOut,
    BookmarkCheck, GlobeLock, Globe } from 'lucide-react';
import ButtonBase from '@/components/Button/ButtonBase';


export default function TodoSort({
    isLoginMaster
}:{
    isLoginMaster: boolean
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setOpen] = useState(false);

    // URLのクエリから直接現在の状態取得
    const isDelete = searchParams.get("isDelete") === "true";
    const isComplete = searchParams.get("isComplete") === "true";
    const isPrivate = searchParams.get("isPrivate") === "true";

    /** ソート */
    const handleSort = (sortTarget: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (sortTarget === "dueDate") {
            const currentOrder = params.get("order") || "desc";
            const currentColumn = params.get("orderByColumn");

            let nextOrder: "asc" | "desc" = "desc";

            if (currentColumn === sortTarget) {
                nextOrder = currentOrder === "desc" ? "asc" : "desc";
            }
            params.set("orderByColumn", sortTarget);
            params.set("order", nextOrder);
        } else if (sortTarget === "isDelete") {
            // 現在の値の反転をURLに直接セットする
            params.set("isDelete", String(!isDelete));
        } else if (sortTarget === "isComplete") {
            params.set("isComplete", String(!isComplete));
        } else if (sortTarget === "isPrivate") {
            params.set("isPrivate", String(!isPrivate));
        }

        router.replace(`?${params.toString()}`);
    };

    return (
        <div className="flex justify-end w-100">
            <ButtonBase
                className={`
                    ml-1
                    ${isOpen? "block":"hidden"}
                `}
                onClick={()=>{ handleSort("dueDate") }}
                tooltips={{ text: "有効期限", className: '' }}
            >
                <CalendarDays />
            </ButtonBase>

            <ButtonBase
                className={`
                    ml-1
                    ${isComplete? "bg-slate-500":""}
                    ${isOpen? "block":"hidden"}
                `}
                onClick={()=>{ handleSort("isComplete") }}
                tooltips={{ text: "完了", className: '' }}
            >
                <BookmarkCheck />
            </ButtonBase>

            <ButtonBase
                className={`
                    ml-1
                    ${isDelete? "bg-slate-500":""}
                    ${isOpen? "block":"hidden"}
                `}
                onClick={()=>{ handleSort("isDelete") }}
                tooltips={{ text: "削除", className: '' }}
            >
                <Trash2 />
            </ButtonBase>

            <ButtonBase
                className={`
                    ml-1
                    ${isPrivate? "bg-slate-500":""}
                    ${isLoginMaster && isOpen? "block":"hidden"}
                `}
                onClick={()=>{ handleSort("isPrivate") }}
                tooltips={{ text: "公開", className: '' }}
            >
                {isPrivate? <GlobeLock size={19} />: <Globe size={19} />}
            </ButtonBase>

            <ButtonBase
                className="ml-1"
                onClick={()=>{ setOpen(!isOpen) }}
                tooltips={{ text: "検索機能", className: '' }}
            >
                { isOpen
                ? <ZoomOut />
                : <ZoomIn />}
            </ButtonBase>
    </div>
    )

}