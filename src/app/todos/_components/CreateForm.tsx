"use client";

import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

import { UpdatePayload } from "../../../../types/types";

import { createTodoAction } from "@/app/todos/actions";

import { CirclePlus } from "lucide-react";

import { CategorySelect } from "./CategorySelect";
import { Priority } from "./Priority";
import { Target } from "./Target";
import { Explanation } from "./Explanation";
import { Title } from "./Title";
import { ProgressRate } from "./ProgressRate";
// お試し
type Props = {
    onSetIsCreate: (value: boolean) => void;
};

export const CreateForm = ({ onSetIsCreate }: Props) => {
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
    } = methods;

    const onSubmit = async (data: UpdatePayload) => {
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
                    <CategorySelect
                        isLabel={true}
                        value="" // fieldから値を取得
                    />

                    <Priority isLabel={true} isReadOnly={false} value={0} />

                    <Title
                        isLabel={true}
                        isReadOnly={false}
                        isModeToggle={false}
                        isDefaultMode={true}
                        isRealTimeUpdate={false}
                        value={""}
                    />

                    <Explanation
                        isReadOnly={false}
                        isModeToggle={false}
                        isDefaultMode={false}
                        isRealTimeUpdate={false}
                        isLabel={true}
                        value={""}
                    />

                    <Target
                        isReadOnly={false}
                        isModeToggle={false}
                        isDefaultMode={false}
                        isRealTimeUpdate={false}
                        isLabel={true}
                        value={""}
                    />

                    <ProgressRate
                        isReadOnly={false}
                        isModeToggle={false}
                        isDefaultMode={false}
                        isRealTimeUpdate={false}
                        isLabel={true}
                        value={0}
                    />

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
