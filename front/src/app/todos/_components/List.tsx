/**
 *
 */
"use client";

import { useState, useEffect, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { UpdatePayload } from "../../../../types/types";

import { Todo } from "@prisma/client";
import { updateTodoAction } from "@/app/todos/actions";

import { BookmarkCheck } from "lucide-react";
import { DeleteControl } from "./DeleteControl";
import { CategorySelect } from "./CategorySelect";
import { Priority } from "./Priority";
import { Explanation } from "./Explanation";
import { Title } from "./Title";
import { Target } from "./Target";
import { ProgressRate } from "./ProgressRate";

interface Props {
    todos: Todo[];
}
type Delets = string[];

export const List = ({ todos }: Props) => {
    const { data: session } = useSession();

    const methods = useForm<UpdatePayload>({
        defaultValues: {
            category: "WORK",
            priority: 0,
            title: "",
            explanation: "",
            progressRate: 0,
            targetDate: null,
            completed: false,
        },
        mode: "onChange",
    });
    const toStringDate = (d: Date | null) => {
        if (d === null) {
            return "";
        } else {
            return `${d.getFullYear()}/${("0" + (d.getMonth() + 1)).slice(
                -2,
            )}/${("0" + d.getDate()).slice(-2)}`;
        }
    };

    // list再生成
    type TodoDisplayType = Omit<Todo, "createdAt" | "targetDate"> & {
        createdAt: string;
        targetDate: string;
        isEditTitle: boolean;
    };
    const list: TodoDisplayType[] = todos.map((t) => {
        return {
            ...t,
            isEditTitle: false,
            createdAt: toStringDate(t.createdAt),
            targetDate: toStringDate(t.targetDate),
        };
    });

    // 更新実行コントロール
    const [isPendingTodoUppdate, startTransitionTodoUpdate] = useTransition();

    // 削除フラグ
    const [isDelete, setIsDelete] = useState(false);
    // 削除選択(list分生成)
    const [selectedDelets, setSelectedDelets] = useState<Delets>([]);

    useEffect(() => {
        // 削除機能オフ時に選択されていたら解除
        if (!isDelete && selectedDelets.length !== 0) {
            setSelectedDelets([]);
        }
    }, [isDelete, selectedDelets, setSelectedDelets]);

    // 削除選択
    const handleSelectedDelete = (id: string) => {
        // 権限チェック
        if (session) {
            //
            // 複数選択
            //
            const copy = new Set(selectedDelets);
            if (copy.has(id)) {
                copy.delete(id);
            } else {
                copy.add(id);
            }
            setSelectedDelets([...copy]);
        } else {
            //
            // 単数選択
            //
            setSelectedDelets([id]);
        }
    };

    /**
     * DB系
     * */
    type updateType = {
        category?: string;
        title?: string;
        completed?: boolean;
        priority?: number;
        explanation?: string;
        targetDate?: string;
        progressRate?: number;
    };
    // 更新
    const handleUpdateTodo = async (id: string, data: updateType) => {
        /**
         * カテゴリ:category ★
         * 優先順位:priority ★
         * タイトル:title ★
         * 説明:explanation
         * 目標日:target
         * 進捗:progressRate ★(0)
         * 完了:completed ★(false)
         *
         */
        // 更新
        // 1. 送られてきた項目の key を取得 (例: ["category"])
        const [key] = Object.keys(data) as (keyof updateType)[];
        if (!key) return;

        // 2. 必須チェック（タイトルが空ならキャンセル）
        if (key === "title" && (!data.title || data.title.trim() === "")) {
            return;
        }

        // 4. 実行！ (key を type としてそのまま渡す)
        startTransitionTodoUpdate(async () => {
            await updateTodoAction(id, key, { ...data });
        });
    };

    return (
        <FormProvider {...methods}>
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th className="w-[8%]">カテゴリー</th>
                        <th className="w-[10%]">優先順位</th>
                        <th className="w-[25%]">タイトル</th>
                        <th className="w-[26%]">説明</th>
                        <th className="w-[8%]">登録日</th>
                        <th className="w-[8%]">目標日</th>
                        <th className="w-[5%]">進捗</th>
                        <th className="w-[5%]">完了</th>
                        <th className="w-[5%]">削除{/** 削除選択 */}</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((todo) => (
                        <tr key={todo.id} className="border-b py-2">
                            <td>
                                {/* カテゴリ */}
                                <CategorySelect
                                    isLabel={false}
                                    id={todo.id}
                                    value={todo.category}
                                    onChange={handleUpdateTodo}
                                />
                            </td>
                            <td>
                                {/* 優先順位 */}
                                <Priority
                                    isLabel={false}
                                    id={todo.id}
                                    value={todo.priority} // fieldから値を取得
                                    isReadOnly={false}
                                    isRealTimeUpdate={true}
                                    onChange={handleUpdateTodo}
                                />
                            </td>
                            <td>
                                {/** タイトル */}
                                <Title
                                    isReadOnly={false}
                                    isModeToggle={true}
                                    isRealTimeUpdate={true}
                                    isDefaultMode={false}
                                    value={todo.title ?? ""}
                                    isLabel={false}
                                    id={todo.id}
                                    onChange={handleUpdateTodo}
                                />
                            </td>
                            <td>
                                {/** 説明 */}
                                <Explanation
                                    isReadOnly={false}
                                    isModeToggle={true}
                                    isRealTimeUpdate={true}
                                    isDefaultMode={false}
                                    value={todo.explanation ?? ""}
                                    isLabel={false}
                                    id={todo.id}
                                    onChange={handleUpdateTodo}
                                />
                            </td>
                            <td>{todo.createdAt}</td>
                            <td>
                                {/** 目標日 */}
                                <Target
                                    isReadOnly={false}
                                    isModeToggle={true}
                                    isRealTimeUpdate={true}
                                    isDefaultMode={false}
                                    value={todo.targetDate ?? ""}
                                    isLabel={false}
                                    id={todo.id}
                                    onChange={handleUpdateTodo}
                                />
                            </td>
                            <td>
                                <ProgressRate
                                    isReadOnly={false}
                                    isModeToggle={true}
                                    isRealTimeUpdate={true}
                                    isDefaultMode={false}
                                    value={todo.progressRate ?? 0}
                                    isLabel={false}
                                    id={todo.id}
                                    onChange={handleUpdateTodo}
                                />
                            </td>

                            <td>
                                {/** 完了 */}
                                <button
                                    defaultChecked={todo.completed}
                                    onClick={() =>
                                        handleUpdateTodo(todo.id, {
                                            completed: !todo.completed,
                                        })
                                    }
                                    disabled={isPendingTodoUppdate}
                                >
                                    {todo.completed ? (
                                        <BookmarkCheck absoluteStrokeWidth />
                                    ) : (
                                        "　　"
                                    )}
                                </button>
                            </td>
                            <td>
                                {session ? (
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        checked={selectedDelets.includes(
                                            todo.id,
                                        )}
                                        disabled={!isDelete}
                                        onChange={() =>
                                            handleSelectedDelete(todo.id)
                                        }
                                    />
                                ) : (
                                    <input
                                        type="radio"
                                        name="radio-1"
                                        className="radio"
                                        disabled={
                                            !isDelete || todo.userId !== null
                                        }
                                        checked={
                                            selectedDelets.includes(todo.id) ||
                                            false
                                        }
                                        onChange={() =>
                                            handleSelectedDelete(todo.id)
                                        }
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteControl
                list={selectedDelets}
                isDelete={isDelete}
                onSetIsDelete={setIsDelete}
                onSetSelectedDelets={setSelectedDelets}
                disabled={list.length === 0}
            />
        </FormProvider>
    );
};
