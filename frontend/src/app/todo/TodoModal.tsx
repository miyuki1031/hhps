'use client';

import ButtonBase from '@/components/Button/ButtonBase';
import ButtonModal from '@/components/ButtonModal';

import { useState,useEffect } from 'react';

import { useModal } from '@/providers/ModalProvider';
import { Todo } from '@/lib/definitions';

type TodoModalProps = {
    initialData?: Todo; 
    onSave: (data: Todo | Omit<Todo, 'id'>) => void;
    className?: string;
}

export default function TodoModal({
    initialData,
    onSave,
    className
}: TodoModalProps) {
    const isNewData = initialData === undefined;
    const { toggleModal } = useModal();
    // 初期データ
    const defaultTodo: Todo = {
        id: "",
        title: "",
        description: "",
        limit: "",
        isDelete: false,
    };
    const rowItem = initialData ?? defaultTodo;

    return (
        <div className={className}>
            <ButtonModal
                tooltips={
                    isNewData
                     ? { text: "新規作成", className: '' }
                     : { text: "編集", className: '' }
                }
                className="btn-primary"
                modalDom={<TodoBodyDom rowItem={rowItem} toggleModal={toggleModal} onSave={onSave} />}
                contents={rowItem}
            />
        </div>
    )
}

// Todo用のモーダル作成
type todoBodyDomProps = {
    rowItem?: Todo;
    toggleModal: ()=>void;
    onSave: (saveData:Todo) => void;
}
const TodoBodyDom = ({
    rowItem,
    toggleModal,
    onSave
}: todoBodyDomProps) => {
    const [ id, setId] = useState(rowItem?.id ?? "" );
    const [ title, setTitle] = useState(rowItem?.title ?? "" );
    const [ description, setDescription] = useState(rowItem?.description ?? "" );
    const [ limit, setLimit ] = useState(rowItem?.limit ?? "");
    const [ isDelete, setIsDelete] = useState(rowItem?.isDelete ?? false );

    // 選択データが変わったら書き換え
    useEffect(() => {
        setId(rowItem?.id ?? "" );
        setTitle(rowItem?.title ?? "" );
        setDescription(rowItem?.description ?? "" );
        setLimit(rowItem?.limit ?? "" );
        setIsDelete(rowItem?.isDelete ?? false );
    }, [rowItem]);

    return (
        <div>
            <input
                type="hidden"
                value={id}
                readOnly
             />
            <fieldset className="fieldset">
                <legend className="fieldset-legend">タイトル</legend>
                <input
                    type="text"
                    className="input"
                    placeholder="Todoの内容を入力してね"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                 />
                <p className="label">必須</p>
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">内容</legend>
                <textarea
                    className="textarea h-24"
                    placeholder="description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="label">必須</div>
            </fieldset>

            <input
                type="date"
                className="input input-bordered w-full"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
            />
            
            <div className="flex justify-between">
                <ButtonBase onClick={toggleModal}>キャンセル</ButtonBase>
                <ButtonBase onClick={() => onSave({ id, title, description, limit, isDelete })}>保存</ButtonBase>
            </div>
       </div>
    )
}