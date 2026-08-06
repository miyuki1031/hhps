'use client'
import { ThumbsUp, Scissors, SquareCheckBig  } from 'lucide-react';
import { Todo } from '@/lib/definitions';

import ButtonBase from '@/components/Button/ButtonBase'
import TodoModal from './TodoModal';

export default function page() {
    const list:Todo[] = [
        { id: "1", title: "A", description: "aaaasdsdsadsa", limit: "", isDelete: false },
        { id: "2", title: "B", description: "vvcccffff", limit: "", isDelete: true },
        { id: "3", title: "C", description: "sssss", limit: "2026/8/10",isDelete: false },
        { id: "4", title: "C", description: "sssss", limit: "2026/8/4",isDelete: false },
    ];

    // 完了
    const handleCompleted = (id:string) => {
        console.log("完了")
    }

    // 削除（論理）
    const handleDelete = (id:string) => {
    console.log("削除")
    // 確認ダイアログ
    }

    // 保存
    const handleSave = (data: Todo | Omit<Todo, 'id'>) => {
        console.log("開始")
        console.log(data)
    }
    const handleSort = (sort: string) => {
        console.log("完了準でソート")
    }

    return (
        <div
            className="flex-1 bg-white p-4"
        >
            <TodoModal onSave={()=>handleSave} />
            <div className="flex gap-2">
                ソート：
                <ButtonBase
                    onClick={()=>handleSort("complete")}
                    tooltips={{ text: "完了", className: '' }}
                >
                    <SquareCheckBig />
                </ButtonBase>
            </div>

             <div className="flex flex-wrap">
                { list.map((item, index ) => (
                        <div
                            key={index}
                            className="card card-border bg-base-100 w-96 shadow-sm m-2"
                        >
                            <div className="card-body">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{ item.description}</p>
                                <div className="card-actions justify-end">
                                    {/** 編集 */}
                                    <TodoModal
                                        initialData={item}
                                        onSave={handleSave}
                                    />
                                    {/** 完了 */}
                                    <ButtonBase
                                        className="btn-primary"
                                        onClick={()=>{handleCompleted(item.id)}}
                                        tooltips={{ text: "タスク完了", className: '' }}
                                    >
                                        <ThumbsUp />
                                    </ButtonBase>

                                    <ButtonBase
                                        className="btn-primary"
                                        onClick={()=>{handleDelete(item.id)}}
                                        tooltips={{ text: "タスク削除", className: '' }}
                                    >
                                        <Scissors />
                                    </ButtonBase>
                                </div>
                            </div>
                        </div>
                    )
                ) }
            </div>
        </div>
    )
}