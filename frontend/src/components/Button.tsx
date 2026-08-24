'use client';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ArrowRight
} from 'lucide-react';

type ButtonPagerProps = {
    order:  'asc' | 'desc';
    isDisabledPrev: boolean;
    isDisabledNext: boolean;
}
export function ButtonPager({
    order,
    isDisabledPrev,
    isDisabledNext
}: ButtonPagerProps) {
    const router = useRouter();
    const urlbase = `?page=r&order=${order}`;
    const handlePageMove = (move: 'prev' | 'next') => {
        // ページ移動の処理をここに実装する
        console.log(`Move to ${move} page`);
        router.push(`${urlbase}&move=${move}`);
    };
return (
    
    <div className="grid grid-cols-2 gap-4 ml-2 mr-2">
        <button
            className="btn border p-2 hover:bg-gray-100 rounded-md"
            onClick={() => handlePageMove('prev')}
            disabled={isDisabledPrev}
        >
            <ArrowLeft />
        </button>
        <button
            className="btn border p-2 hover:bg-gray-100 rounded-md"
            onClick={() => handlePageMove('next')}
            disabled={isDisabledNext}
        >
            <ArrowRight />
        </button>
    </div>
    )
}