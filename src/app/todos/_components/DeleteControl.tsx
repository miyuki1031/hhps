import { useTransition } from "react";

import { Trash2 } from "lucide-react";

import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { deleteTodoAction } from "@/app/todos/actions";

type Props = {
    list: string[];
    isDelete: boolean;
    onSetIsDelete: (value: boolean) => void;
    onSetSelectedDelets: (value: []) => void;
    disabled?: boolean;
};
export const DeleteControl = ({
    list,
    isDelete,
    onSetIsDelete,
    onSetSelectedDelets,
    disabled,
}: Props) => {
    // 削除実行コントロール
    const [_isPainging, startTransitionDeleteControl] = useTransition();

    // 削除
    const delteTodo = () => {
        startTransitionDeleteControl(async () => {
            const rtn = await deleteTodoAction(list, true);
            if (rtn.success) {
                // 成功時初期化
                onSetIsDelete(false);
                onSetSelectedDelets([]);
            }
        });
    };

    return (
        <div className="w-full flex justify-end items-center gap-4 py-2">
            <div className="w-30 flex justify-start items-center">
                <div className="text-sm font-bold text-gray-700">
                    削除機能：{isDelete}
                </div>
                <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={isDelete}
                    onChange={(e) => onSetIsDelete(e.target.checked)}
                    disabled={disabled}
                />
            </div>
            <div className="w-30 flex justify-start items-center">
                <div className="text-sm font-bold text-gray-700">
                    削除選択件数：{list.length}
                </div>
            </div>
            <ButtonIcon
                className="btn pl-2.5"
                onClick={() => delteTodo()}
                disabled={list.length === 0}
            >
                <Trash2 absoluteStrokeWidth />
            </ButtonIcon>
        </div>
    );
};
