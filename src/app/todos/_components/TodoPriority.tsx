/**
 * 整理：
 * 呼び出し元は一覧と登録フォームから。
 *   モード切替：
 *     ・表示
 *     ・編集
 *
 *   画面別：
 *     一覧 → 表示・編集モードをクリックで切り替え
 *     登録 → 編集のみ
 *
 *   コンポーネント設計メモ：
 *     ・isLabel?：ラベル表示の有無
 *     ・isReadOnly?：true=表示のみ / false=編集
 *     ・isModeToggle?：モード切替可能かどうか
 *     ・isDefaultMode?：初期表示モード（true=編集 / false=表示）
 *
 *   フラグ組み合わせ：
 *      ・isReadOnly
 *          true  → 表示モード固定
 *          false → 編集可能
 *                    isModeToggle
 *                      true → クリックで表示・編集切替可能
 *                      false → 編集のみ
 *                      ・isDefaultMode
 *                          true → 編集モードから
 *                          false → 表示モードから
 *
 *
 */

import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/Lable";
import { Stars } from "@/components/Stars";

// 共通で必要なProps（valueやonChangeなど）がある場合は交差型（&）でつなぐ
type Props = {
    id?: number;
    value: number;
    isReadOnly: boolean;
    isLabel?: boolean;
    isRealTimeUpdate?: boolean;
    onChange?: (id: number, data: { priority: number }) => void;
};

export const TodoPriority = ({
    id = 0,
    value,
    isLabel = false,
    isReadOnly,
    isRealTimeUpdate, // 即更新
    onChange, // 即更新
}: Props) => {
    const { control } = useFormContext();
    const allStars = 3;
    const temp = {
        textLabel: "優先順位",
        name: "priority",
    };

    const handleRealTimeSave = (id: number, saveValue: number) => {
        if (isRealTimeUpdate && id !== undefined && onChange) {
            onChange(id, { priority: saveValue });
        }
    };

    return (
        <div className={`flex flex-row gap-1.5 mb-4`}>
            <Label
                isLabel={isLabel}
                htmlFor={`${temp.name}${id ? "_" + id : ""}`}
                textLabel={temp.textLabel}
            />
            <Controller
                name={`${temp.name}${id ? +"_" + id : ""}`}
                control={control}
                render={({ field }) => (
                    <Stars
                        allStars={allStars}
                        id={id}
                        formName={temp.name}
                        value={field.value ?? value}
                        readonly={isReadOnly}
                        onChange={(value: number) => {
                            if (id && onChange) {
                                handleRealTimeSave(id, value);
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
