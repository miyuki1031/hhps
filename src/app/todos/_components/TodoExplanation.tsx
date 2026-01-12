import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { RealTimeInput } from "@/components/Input/RealTimeInput";
import { FormInput } from "@/components/Input/FormInput";

type ExplanationProps =
    | {
          isReadOnly: true;
          isModeToggle?: never;
          isDefaultMode?: never;
      }
    | {
          isReadOnly: false;
          isModeToggle: boolean; // 編集可能なら、切り替え可能かどうかを必須にする
          isDefaultMode: boolean; // 編集可能なら、初期モードも必須にする
      };

type ApplyTiming =
    | {
          // 入力値即反映
          id: number;
          isRealTimeUpdate: true;
          onChange: (id: number, data: { explanation: string }) => void;
      }
    | {
          // 保存ボタン実行
          id?: never;
          isRealTimeUpdate: false;
          //onChange: (value: string) => void;
          onChange?: never;
      };

type Props = ExplanationProps &
    ApplyTiming & {
        isLabel: boolean;
        value: string;
    };

export const TodoExplanation = ({
    isLabel,
    id,
    isRealTimeUpdate,
    value,
    isReadOnly,
    isModeToggle,
    isDefaultMode,
    onChange,
}: Props) => {
    const { control } = useFormContext();
    const width = isLabel ? " w-1/3" : " w-full";

    // コンポーネント（大文字開始）ではなく、関数（小文字開始）にする
    const renderLabels = () => {
        if (!isLabel) return null;
        return (
            <label
                htmlFor={`explanation${id ? "_" + id : ""}`}
                className={`rounded-box bg-blue-400 text-sm p-2 font-medium text-gray-700 ${width}`}
            >
                説明
            </label>
        );
    };
    const [isShowEditor, setIsShowEditor] = useState<boolean>(
        (() => {
            if (isReadOnly) return false;
            if (isModeToggle) {
                return !isDefaultMode;
            } else {
                return false;
            }
        })()
    );

    const onToggle = () => {
        // 読み取り専用
        if (isReadOnly) return;
        setIsShowEditor(!isShowEditor);
    };

    const handleRealTimeSave = (
        id: number,
        saveValue: string
        // isFinish: boolean
    ) => {
        if (isRealTimeUpdate && id !== undefined) {
            // (onChange as (id: number, data: { explanation: string }) => void)(id, { explanation: value });

            onChange(id, { explanation: saveValue });

            onToggle();
        }
    };

    // const handleFormSave = (saveValue: string) => {
    //     // (onChange as (value: string) => void)(value);
    //     if (!isRealTimeUpdate) {
    //         onChange(saveValue);
    //         // フォーム形式の場合は閉じないことが多いですが、必要なら onToggle()
    //     }
    // };

    return (
        <div className={`flex flex-row gap-1.5${isLabel ? " mb-4" : " "}`}>
            {/** 説明 */}
            {renderLabels()}
            {isShowEditor ? (
                <ButtonIcon
                    className=" w-full "
                    isTransparent={true}
                    position={"l"}
                    onClick={() => onToggle()}
                >
                    {value}
                </ButtonIcon>
            ) : (
                <Controller
                    name={`explanation${id ? "_" + id : ""}`}
                    control={control}
                    render={({ field }) => (
                        <>
                            {isRealTimeUpdate ? (
                                <RealTimeInput<string>
                                    id={id}
                                    value={field.value ?? value}
                                    placeholder="説明"
                                    name="explanation"
                                    required={false}
                                    onSave={(id, value, isFinish) => {
                                        field.onChange(value);
                                        if (isFinish && handleRealTimeSave) {
                                            handleRealTimeSave(id, value);
                                        }
                                    }}
                                />
                            ) : (
                                <FormInput<string>
                                    value={field.value ?? value}
                                    // onSave={(value) => handleFormSave(value)}
                                    onSave={(value) => field.onChange(value)}
                                />
                            )}
                        </>
                    )}
                />
            )}
        </div>
    );
};
