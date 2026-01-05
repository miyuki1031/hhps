"use client";

import { useRef, useActionState, useEffect } from "react";

import { CirclePlus } from "lucide-react";
import { InputLabel } from "@/components/Input/InputLabel";

import { createTodoAction } from "@/app/todos/actions";
import { TodoRegistCategorys } from "./TodoRegistCategorys";
import { TodoRegistStars } from "./TodoRegistStars";
import { TodoRegistCalendar } from "./TodoRegistCalendar";
// お試し
type Props = {
    onSetIsCreate: (value: boolean) => void;
};

export const TodoRegistForm = ({ onSetIsCreate }: Props) => {
    const initialState = { error: null, success: false };

    const [state, formAction, isPending] = useActionState(
        createTodoAction,
        initialState
    );

    const formRef = useRef<HTMLFormElement>(null); // 1. フォームへの「参照」を作る

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset(); // 成功時のみ入力欄を空にする
            onSetIsCreate(false);
        }
    }, [state, onSetIsCreate]);
    return (
        <form ref={formRef} action={formAction} className="flex gap-2">
            <fieldset className="w-full">
                <legend>新しいTodoを追加してください</legend>
                <TodoRegistCategorys name="todoCategory" label="カテゴリー" />
                <TodoRegistStars label="優先順位" />

                <InputLabel
                    name="todoTitle"
                    label="タイトル"
                    id="todo-title"
                    placeholder="タイトル"
                    required={true}
                    max={100}
                ></InputLabel>
                <InputLabel
                    name="todoExplanation"
                    label="説明"
                    id="todo-explanation"
                    placeholder="説明"
                    required={false}
                    max={100}
                ></InputLabel>

                <TodoRegistCalendar name="todoTargetDate" label="目標日" />

                <InputLabel
                    name="todoProgressRate"
                    label="進捗"
                    id="todo-progressRate"
                    placeholder="進捗"
                    type="number"
                ></InputLabel>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded flex flex-row"
                    disabled={isPending}
                >
                    <CirclePlus />
                    {isPending ? "保存中..." : "追加"}
                </button>
                {state.message && (
                    <p className="text-red-500 text-sm">{state.message}</p>
                )}
            </fieldset>
        </form>
    );
};
