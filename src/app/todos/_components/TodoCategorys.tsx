/**
 * 整理：
 * 呼び出し元は一覧と登録フォームから。
 *      一覧 → 通常は表示。クリックで編集モード
 *      登録 → 編集モード
 */

import { TODO_CATEGORY } from "../constants";
import { useFormContext, Controller } from "react-hook-form";
import { SelectBase } from "@/components/Select/SelectBase";

type Props = {
    isLabel: boolean;
    id?: number;
    value: string;
    onValueChange?: (id: number, data: { category: string }) => void;
    //    onChange?: (value: string) => void;
};
export const TodoCategorys = ({
    id,
    isLabel,
    value,
    onValueChange,
}: //    onChange,
Props) => {
    const { control } = useFormContext();
    const width = isLabel ? " w-1/3" : " w-full";

    const renderLabels = () => {
        if (!isLabel) return null;
        return (
            /**
             * 入力フォームではないためlabelではない
             * そのためhtmlForも不要
             */
            <label
                htmlFor={`${id} ? category-${id}: `}
                className={`rounded-box bg-blue-400 text-sm p-2 font-medium text-gray-700 ${width}`}
            >
                カテゴリー
            </label>
        );
    };
    return (
        <div className={`flex flex-row gap-1.5 ${isLabel ? "mb-4" : ""}`}>
            {/** ラベル */}
            {renderLabels()}
            <Controller
                name={`category${id ? +"_" + id : ""}`}
                control={control}
                render={({ field }) => (
                    <SelectBase
                        value={field.value ?? value}
                        classWidth={width}
                        list={Object.values(TODO_CATEGORY).map((t) => {
                            return {
                                label: t.text,
                                value: t.category,
                                icon: t.label,
                            };
                        })}
                        onChange={(value: string) => {
                            if (id && onValueChange) {
                                // 即時更新
                                onValueChange(id, { category: value });
                            } else {
                                field.onChange(value);
                            }
                        }}
                    />
                )}
            />
        </div>
    );
};
