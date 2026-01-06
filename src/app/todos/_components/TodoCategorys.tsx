/**
 * 整理：
 * 呼び出し元は一覧と登録フォームから。
 *      一覧 → 通常は表示。クリックで編集モード
 *      登録 → 編集モード
 */

import { TODO_CATEGORY } from "../constants";
import { SelectBase } from "@/components/Select/SelectBase";

type Props = {
    isLabel: boolean;
    id?: number | null;
    value: string;
    onUpdateTodo?: (id: number, data: { category: string }) => void;
    onChange?: (value: string) => void;
};
export const TodoCategorys = ({
    id,
    isLabel,
    value,
    onUpdateTodo,
    onChange,
}: Props) => {
    const width = isLabel ? " w-1/3" : " w-full";
    return (
        <div className={`flex flex-row gap-1.5 ${isLabel ? "mb-4" : ""}`}>
            {isLabel && (
                /** ラベル */
                /**
                 * 入力フォームではないためlabelではない
                 * そのためhtmlForも不要
                 */
                <div
                    className={`rounded-box bg-blue-400 text-sm p-2 font-medium text-gray-700 ${width}`}
                >
                    カテゴリー
                </div>
            )}
            <SelectBase
                value={value}
                classWidth={width}
                list={Object.values(TODO_CATEGORY).map((t) => {
                    return {
                        label: t.text,
                        value: t.category,
                        icon: t.label,
                    };
                })}
                onChange={(value: string) => {
                    if (id && onUpdateTodo && value !== undefined) {
                        // 即時更新
                        onUpdateTodo(id, { category: value });
                    } else if (onChange) {
                        // 親へ変更値引き渡し
                        onChange(value);
                    }
                }}
            />
        </div>
    );
};
