import { useState, useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/Lable";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { RealTimeInput } from "@/components/Input/RealTimeInput";
import { FormInput } from "@/components/Input/FormInput";

type ProgressRatePropsType =
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
          onChange: (id: number, data: { progressRate: number }) => void;
      }
    | {
          // 保存ボタン実行
          id?: never;
          isRealTimeUpdate: false;
          onChange?: never;
      };

type Props = ProgressRatePropsType &
    ApplyTiming & {
        isLabel: boolean;
        value: number;
    };

export const TodoProgressRate = ({
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
    const generatedId = useId();
    const width = isLabel ? " w-2/3" : " w-full";
    const temp = {
        textLabel: "進捗率",
        placeholder: "進捗率",
        type: "number",
        name: "progressRate",
        controlName: id ? "progressRate_" + id : "progressRate",
        min: 0,
        max: 100,
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

    const handleRealTimeSave = (saveValue: number, isFinish: boolean) => {
        if (isFinish && isRealTimeUpdate && id !== undefined) {
            onChange(id, { progressRate: saveValue });
            onToggle();
        }
    };

    return (
        <div className={`flex flex-row gap-1.5${isLabel ? " mb-4" : ""}`}>
            <Label
                isLabel={isLabel}
                htmlFor={generatedId}
                textLabel={temp.textLabel}
            />
            {isShowEditor ? (
                <ButtonIcon
                    className=" w-full "
                    isTransparent={true}
                    position={"l"}
                    onClick={onToggle}
                >
                    {value}
                </ButtonIcon>
            ) : (
                <Controller
                    name={temp.controlName}
                    control={control}
                    render={({ field }) => (
                        <>
                            {isRealTimeUpdate ? (
                                <RealTimeInput<number>
                                    id={generatedId}
                                    value={field.value ?? value}
                                    placeholder={temp.placeholder}
                                    type={temp.type}
                                    min={temp.min}
                                    max={temp.max}
                                    name={temp.name}
                                    required={false}
                                    className={width}
                                    onSave={(saveValue, isFinish) => {
                                        field.onChange(saveValue);
                                        handleRealTimeSave(saveValue, isFinish);
                                    }}
                                />
                            ) : (
                                <FormInput<number>
                                    id={generatedId}
                                    value={field.value ?? value}
                                    className={width}
                                    type={temp.type}
                                    name={temp.name}
                                    min={temp.min}
                                    max={temp.max}
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
