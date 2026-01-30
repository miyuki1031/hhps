/**
 * 整理：
 * 呼び出し元は一覧と登録フォームから。
 *      一覧 → 通常は表示。クリックで編集モード
 *      登録 → 編集モード
 */

import { TODO_CATEGORY } from "../constants";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/Lable";
import { SelectBase } from "@/components/Select/SelectBase";

type Props = {
    isLabel: boolean;
    id?: string;
    value: string;
    onChange?: (id: string, data: { category: string }) => void;
};
export const CategorySelect = ({ id, isLabel, value, onChange }: Props) => {
    const { control } = useFormContext();
    const width = isLabel ? " w-2/3" : " w-full";
    const temp = {
        textLabel: "カテゴリー",
        name: "category",
        controlName: id ? "category_" + id : "category",
    };
    const handleRealTimeSave = (saveValue: string) => {
        if (onChange && id !== undefined) {
            onChange(id, { category: saveValue });
        }
    };

    return (
        <div className={`flex flex-row gap-1.5 ${isLabel ? "mb-4" : ""}`}>
            <Label
                isStandalone={true}
                isLabel={isLabel}
                textLabel={temp.textLabel}
            />

            <Controller
                name={temp.controlName}
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
                        onChange={(saveValue: string) => {
                            field.onChange(saveValue);
                            // 即時更新
                            handleRealTimeSave(saveValue);
                        }}
                    />
                )}
            />
        </div>
    );
};
