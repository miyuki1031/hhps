'use client';

import { Scissors, Trash2 } from 'lucide-react';
import { deleteTodo } from '@/lib/db/todo-actions';

import ButtonBase from '@/components/Button/ButtonBase';

type TodoCompleted = {
    id: string,
    isDelete: boolean,
    hardDelete: boolean,
    className?: string
}

export default function TodoDelete({
    id,
    isDelete,
    hardDelete,
    className
}: TodoCompleted) {
    const handleDelete = async (hardDeleteButton: boolean) => {
        console.log(`handleCompleted: id ${id}`)
        const rtn = await deleteTodo({
            id: id,
            isDelete: !isDelete,
            isHard: hardDelete && hardDeleteButton
        });
        if (rtn.success) {
            console.log("成功")
        } else {
            console.log("失敗")
        }
    }

    return (
    <div className={className}>
        <ButtonBase
            className="btn-primary gap-1"
            onClick={()=>handleDelete(false)}
            tooltips={{ text: "削除", className: '' }}
        >
            <Scissors />
        </ButtonBase>
        
        <ButtonBase
            className={`btn-primary gap-1 ml-2
                ${hardDelete ? "inline":"hidden"}
                `}
            onClick={()=>handleDelete(true)}
            tooltips={{ text: "削除", className: '' }}
        >
            <Trash2 />
        </ButtonBase>

    </div>
    )

}