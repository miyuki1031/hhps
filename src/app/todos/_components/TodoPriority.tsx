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
import { Stars } from "@/components/Stars";

type StarsProps =
    | {
          isReadOnly: true;
          // isReadOnlyがtrueの時は、切り替え関連のPropsは存在すら許さない（またはオプション）
          isModeToggle?: never;
          isDefaultMode?: never;
      }
    | {
          isReadOnly: false;
          isModeToggle: boolean; // 編集可能なら、切り替え可能かどうかを必須にする
          isDefaultMode: boolean; // 編集可能なら、初期モードも必須にする
      };

// 共通で必要なProps（valueやonChangeなど）がある場合は交差型（&）でつなぐ
type Props = StarsProps & {
    id?: number;
    value: number;
    isLabel?: boolean;
    onValueChange?: (id: number, data: { priority: number }) => void;
};

export const TodoPriority = ({
    id = 0,
    value,
    isLabel = false,
    isReadOnly,
    // isModeToggle,
    // isDefaultMode,
    onValueChange, // 即更新
}: Props) => {
    const { control } = useFormContext();
    const allStars = 3;
    const width = isLabel ? " w-1/3" : " w-full";

    // コンポーネント（大文字開始）ではなく、関数（小文字開始）にする
    const renderLabels = () => {
        if (!isLabel) return null;
        return (
            <label
                htmlFor={`priority-${id}`}
                className={`rounded-box bg-blue-400 text-sm p-2 font-medium text-gray-700 ${width}`}
            >
                優先順位
            </label>
        );
    };

    return (
        <div className={`flex flex-row gap-1.5 mb-4`}>
            {/** ラベル */}
            {renderLabels()}
            <Controller
                name={`priority${id ? +"_" + id : ""}`}
                control={control}
                render={({ field }) => (
                    <Stars
                        allStars={allStars}
                        id={id}
                        formName="priority"
                        value={field.value ?? value}
                        readonly={isReadOnly}
                        onChange={(value: number) => {
                            if (id && onValueChange) {
                                onValueChange(id, { priority: value });
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
