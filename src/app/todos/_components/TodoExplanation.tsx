import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/Lable";
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
    const width = isLabel ? " w-2/3" : " w-full";
    const temp = {
        textLabel: "説明",
        placeholder: "説明",
        type: "text",
        name: "explanation",
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

    const handleRealTimeSave = (id: number, saveValue: string) => {
        if (isRealTimeUpdate && id !== undefined) {
            onChange(id, { explanation: saveValue });
            onToggle();
        }
    };

    return (
        <div className={`flex flex-row gap-1.5${isLabel ? " mb-4" : " "}`}>
            <Label
                isLabel={isLabel}
                htmlFor={`${temp.name}${id ? "_" + id : ""}`}
                textLabel={temp.textLabel}
            />
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
                    name={`${temp.name}${id ? "_" + id : ""}`}
                    control={control}
                    render={({ field }) => (
                        <>
                            {isRealTimeUpdate ? (
                                <RealTimeInput<string>
                                    id={id}
                                    value={field.value ?? value}
                                    placeholder={temp.placeholder}
                                    name={temp.name}
                                    required={false}
                                    className={width}
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
                                    className={width}
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
