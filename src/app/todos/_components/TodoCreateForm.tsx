"use client";

import { FormProvider, useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

import { UpdatePayload } from "../../../../types/types";

import { createTodoAction } from "@/app/todos/actions";

import { CirclePlus } from "lucide-react";

import { InputLabel } from "@/components/Input/InputLabel";
import { TodoCategorys } from "./TodoCategorys";
import { TodoPriority } from "./TodoPriority";
import { TodoTarget } from "./TodoTarget";
import { TodoExplanation } from "./TodoExplanation";
// お試し
type Props = {
    onSetIsCreate: (value: boolean) => void;
};

export const TodoCreateForm = ({ onSetIsCreate }: Props) => {
    const methods = useForm<UpdatePayload>({
        defaultValues: {
            completed: false,
            title: "",
            category: "WORK",
            priority: 0,
            explanation: "",
            progressRate: 0,
            targetDate: null,
        },
        mode: "onChange",
    });
    const {
        // register,
        handleSubmit,
        // isSubmitSuccessful,
        // formState: { errors },
        control,
    } = methods;

    const onSubmit = async (data: UpdatePayload) => {
        console.log("onSubmitonSubmitonSubmit");
        console.log(data);
        // 1. サーバー送信
        const result = await createTodoAction(data);

        if (result.success) {
            // 2. 成功したらフォームをリセット
            methods.reset();
            // 3. モーダルを閉じる！
            onSetIsCreate(false); // 親から受け取った「閉じる関数」などを呼ぶ
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <fieldset className="w-full">
                    <legend>新しいTodoを追加してください</legend>
                    <TodoCategorys
                        isLabel={true}
                        value="" // fieldから値を取得
                    />

                    <TodoPriority
                        isLabel={true}
                        isReadOnly={false}
                        isModeToggle={false} // モード切替はしない（仮）
                        isDefaultMode={true} // デフォルトモードで表示（仮
                        value={0}
                    />

                    <Controller
                        name={"title"}
                        control={control}
                        render={({ field }) => (
                            <InputLabel
                                name="title"
                                label="タイトル"
                                id="todo-title"
                                placeholder="タイトル"
                                required={true}
                                max={100}
                                onChange={(value: string) =>
                                    field.onChange(value)
                                }
                            ></InputLabel>
                        )}
                    />

                    <TodoExplanation
                        isReadOnly={false}
                        isModeToggle={false}
                        isDefaultMode={false}
                        isRealTimeUpdate={false}
                        isLabel={true}
                        value={""}
                    />
                    <TodoTarget name="todoTargetDate" label="目標日" />
                    {/* <Controller
                        name={"progressRate"}
                        control={control}
                        render={({ field }) => (
                            <InputLabel
                                name="progressRate"
                                label="進捗"
                                id="todo-progressRate"
                                placeholder="進捗"
                                type="number"
                                onChange={(value: number) =>
                                    field.onChange(value)
                                }
                            ></InputLabel>
                        )}
                    /> */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded flex flex-row"
                        // disabled={isPending}
                    >
                        <CirclePlus />
                    </button>
                    {/* {state.message && (
                        <p className="text-red-500 text-sm">{state.message}</p>
                    )} */}
                </fieldset>
            </form>
        </FormProvider>
    );
};
