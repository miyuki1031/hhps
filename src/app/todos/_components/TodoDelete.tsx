import { useEffect, useTransition } from "react";

import { Trash2 } from "lucide-react";

import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { deleteTodoAction } from "@/app/todos/actions";

type Props = {
    list: number[];
    isDelete: boolean;
    onSetIsDelete: (value: boolean) => void;
    onSetSelectedDelets: (value: []) => void;
    disabled?: boolean;
};
export const TodoDelete = ({
    list,
    isDelete,
    onSetIsDelete,
    onSetSelectedDelets,
    disabled,
}: Props) => {
    // 削除実行コントロール
    const [isPendingTodoDelete, startTransitionTodoDelete] = useTransition();

    // 削除
    const delteTodo = () => {
        startTransitionTodoDelete(async () => {
            const rtn = await deleteTodoAction(list);
            if (rtn.success) {
                // 成功時初期化
                onSetIsDelete(false);
                onSetSelectedDelets([]);
            }
        });
    };

    return (
        <>
            <div>
                <div>
                    削除機能：{isDelete}
                    <input
                        type="checkbox"
                        className="toggle toggle-primary"
                        checked={isDelete}
                        onChange={(e) => onSetIsDelete(e.target.checked)}
                        disabled={disabled}
                    />
                </div>
            </div>
            <div>削除選択件数: {list.length}</div>
            <ButtonIcon
                className="btn"
                onClick={() => delteTodo()}
                disabled={list.length === 0}
            >
                <Trash2 absoluteStrokeWidth />
            </ButtonIcon>
        </>
    );
};
