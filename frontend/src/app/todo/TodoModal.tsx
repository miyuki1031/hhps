'use client';

import ButtonBase from '@/components/Button/ButtonBase';
import ButtonModal from '@/components/ButtonModal';
import { useState, useTransition } from 'react';
import { createTodo, updateTodo } from '@/lib/db/todo-actions';
import { useModal } from '@/providers/ModalProvider';
import { TodoSchema } from '@/lib/definitions';

type TodoModalProps = {
    initialData?: TodoSchema; 
    className?: string;
    isLoginMaster: boolean
}

export default function TodoModal({
    initialData,
    className,
    isLoginMaster
}: TodoModalProps) {
    const isNewData = initialData === undefined;
    const { toggleModal } = useModal();
    // 初期データ
    const defaultTodo: TodoSchema = {
        id: "",
        title: "",
        description: "",
        dueDate: "",
        // 基本非公開登録（ただしisLoginMasterを条件に、管理者の時は非公開登録・Userは公開登録）
        isPrivate: isLoginMaster,
        isComplete: false,
        isDelete: false,
        isMasterAuthor: isLoginMaster
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
                modalDom={<TodoBodyDom
                    rowItem={rowItem}
                    toggleModal={toggleModal}
                    isLoginMaster={isLoginMaster} />}
                contents={rowItem}
            />
        </div>
    )
}

// Todo用のモーダル作成
type todoBodyDomProps = {
    rowItem?: TodoSchema;
    toggleModal: ()=>void;
    isLoginMaster: boolean
}
const TodoBodyDom = ({
    rowItem,
    toggleModal,
    isLoginMaster
}: todoBodyDomProps) => {
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const id = rowItem?.id ?? "" ;
    const [ title, setTitle] = useState(rowItem?.title ?? "" );
    const [ description, setDescription] = useState(rowItem?.description ?? "" );
    const [ dueDate, setDueDate ] = useState(rowItem?.dueDate ?? "");
    // 基本非公開登録（ただしisLoginMasterを条件に、管理者の時は非公開登録・Userは公開登録）
    const [ isPrivate, setIsPrivate ] = useState(rowItem?.isPrivate ?? isLoginMaster);
    const [ isComplete, setIsComplete ] = useState(rowItem?.isComplete ?? false);
    const [ isDelete, setIsDelete] = useState(rowItem?.isDelete ?? false );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title") as string;
        const target = id === ""? createTodo: updateTodo;

        startTransition(async () => {
            // サーバーアクションを呼び出し
            const result = await target({
                id: id,
                title: title,
                description: description,
                dueDate: dueDate,
                isPrivate: isPrivate,
                isComplete: isComplete,
                isDelete: isDelete,
                isMasterAuthor: false
            });
            if (result.success) {
                toggleModal();
            } else {
                if (typeof result?.message === "string" && result.message.length > 0) {
                    // エラー表示
                    setErrorMessage(result.message);
                }
            }
        });
    }
    return (
        <form 
            className={`
                touch-none
                flex flex-col
                h-fit md:h-full
                bg-gray-200
                p-5
            `}
            onSubmit={handleSubmit}>
            <input
                type="hidden"
                value={id}
                readOnly
            />
            
            <div className="flex-1">
                {/** タイトル */}
                <fieldset className="fieldset">
                    <div className="flex justify-between">
                        <legend className="fieldset-legend text-gray-800">タイトル</legend><p className="label text-pink-600">必須</p>
                    </div>

                    <input
                        type="text"
                        name="title"
                        className="w-auto input invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/2 bg-white"
                        placeholder="Todoの内容を入力してね"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </fieldset>
                {/** 内容 */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend text-gray-800">内容</legend>
                    <textarea
                        className="w-auto textarea h-24 bg-white border-gray-800"
                        placeholder="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </fieldset>

                {/** 有効期限 */}
                <fieldset className="fieldset">
                    <div className="flex justify-between">
                        <legend className="fieldset-legend text-gray-800">有効期限</legend>
                    </div>
                    <input
                        type="date"
                        className="input input-bordered w-full bg-white border-gray-800"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </fieldset>

                {/**  */}
                <div className="grid grid-cols-3 mb-1">
                    <fieldset className={`
                        fieldset grid grid-cols-2
                        ${isLoginMaster? "block": "hidden"}

                    `}>
                        <legend className="fieldset-legend text-gray-800">公開範囲</legend>
                        <div className="grid grid-cols-3 mb-1">
                            <input
                                type="checkbox" 
                                className="toggle" 
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                            />
                        </div>
                    </fieldset>


                    <fieldset className="fieldset grid grid-cols-2">
                        <legend className="fieldset-legend text-gray-800">完了</legend>
                        <input
                            type="checkbox" 
                            className="toggle" 
                            checked={isComplete}
                            onChange={(e) => setIsComplete(e.target.checked)}
                        />
                    </fieldset>

                    <fieldset className={`
                        fieldset grid grid-cols-2
                        ${id === ""? "hidden": "block"}
                    `}>
                        <legend className="fieldset-legend text-gray-800">削除</legend>
                        <input
                            type="checkbox" 
                            className="toggle" 
                            checked={isDelete}
                            onChange={(e) => setIsDelete(e.target.checked)}
                        />
                    </fieldset>
                </div>
                <div>
                    {isPending ? "作成中..." : ""}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            </div>
            <div className="flex justify-between items-end">
                <ButtonBase type="button" onClick={toggleModal}>キャンセル</ButtonBase>
                <ButtonBase>保存</ButtonBase>
            </div>

       </form>
    )
}