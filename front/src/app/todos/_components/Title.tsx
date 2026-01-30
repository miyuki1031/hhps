import { useState, useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/Lable";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { RealTimeInput } from "@/components/Input/RealTimeInput";
import { FormInput } from "@/components/Input/FormInput";

type titleProps =
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
          id: string;
          isRealTimeUpdate: true;
          onChange: (id: string, data: { title: string }) => void;
      }
    | {
          // 保存ボタン実行
          id?: never;
          isRealTimeUpdate: false;
          onChange?: never;
      };

type Props = titleProps &
    ApplyTiming & {
        isLabel: boolean;
        value: string;
    };

export const Title = ({
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
        textLabel: "タイトル",
        placeholder: "タイトル",
        type: "text",
        name: "title",
        controlName: id ? "title_" + id : "title",
    };

    const [isShowEditor, setIsShowEditor] = useState<boolean>(
        (() => {
            if (isReadOnly) return false;
            if (isModeToggle) {
                return !isDefaultMode;
            } else {
                return false;
            }
        })(),
    );

    const onToggle = () => {
        // 読み取り専用
        if (isReadOnly) return;
        setIsShowEditor(!isShowEditor);
    };

    const handleRealTimeSave = (saveValue: string, isFinish: boolean) => {
        if (isFinish && isRealTimeUpdate && id !== undefined) {
            onChange(id, { title: saveValue });
            onToggle();
        }
    };

    return (
        <div className={`flex flex-row gap-1.5${isLabel ? " mb-4" : " "}`}>
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
                    onClick={() => onToggle()}
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
                                <RealTimeInput<string>
                                    id={generatedId}
                                    value={field.value ?? value}
                                    placeholder={temp.placeholder}
                                    name={temp.name}
                                    className={width}
                                    required={false}
                                    onSave={(saveValue, isFinish) => {
                                        field.onChange(saveValue);
                                        handleRealTimeSave(saveValue, isFinish);
                                    }}
                                />
                            ) : (
                                <FormInput<string>
                                    id={generatedId}
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
