'use client';

import { ThumbsUp } from 'lucide-react';
import { toggleComplete } from '@/lib/db/todo-actions';
import ButtonBase from '@/components/Button/ButtonBase';

type TodoCompleted = {
    id: string,
    isComplete: boolean,
    className?: string
}

export default function TodoCompleted({
    id,
    isComplete,
    className
}: TodoCompleted) {
    const handleCompleted = async () => {
        toggleComplete({
            id: id,
            isComplete: !isComplete
        })
        .catch((error) => {
            console.error("エラーが発生しました:", error);
        });
    }

    return (
    <div className={className}>
        <ButtonBase
            className="btn-primary"
            onClick={handleCompleted}
            tooltips={{ text: "タスク完了", className: '' }}
        >
            <ThumbsUp />
        </ButtonBase>
    </div>
    )

}