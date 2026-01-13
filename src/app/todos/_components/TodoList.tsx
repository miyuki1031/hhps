/**
 *
 */
"use client";

import { useState, useEffect, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { UpdatePayload } from "../../../../types/types";

import { TodoList as TodoListType } from "@prisma/client";
import { updateTodoAction } from "@/app/todos/actions";

import { BookmarkCheck } from "lucide-react";
import { TodoDelete } from "./TodoDelete";
import { TodoCategorys } from "./TodoCategorys";
import { TodoPriority } from "./TodoPriority";
import { TodoExplanation } from "./TodoExplanation";
import { TodoTitle } from "./TodoTitle";
import { TodoTarget } from "./TodoTarget";

interface Props {
    todos: TodoListType[];
}
type Delets = number[];

export const TodoList = ({ todos }: Props) => {
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
                -2
            )}/${("0" + d.getDate()).slice(-2)}`;
        }
    };

    // list再生成
    type TodoDisplayType = Omit<TodoListType, "targetDate"> & {
        targetDate: string;
        isEditTitle: boolean;
    };
    const list: TodoDisplayType[] = todos.map((t) => {
        return {
            ...t,
            isEditTitle: false,
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
    const handleSelectedDelete = (id: number) => {
        const copy = new Set(selectedDelets);
        if (copy.has(id)) {
            copy.delete(id);
        } else {
            copy.add(id);
        }
        setSelectedDelets([...copy]);
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
        target?: string;
    };
    // 更新
    const handleUpdateTodo = async (id: number, data: updateType) => {
        console.log(id);
        console.log(data);
        console.log("------------------------");

        /**
         * カテゴリ:category ★
         * 優先順位:priority ★
         * タイトル:title ★
         * 説明:explanation
         * 目標日:target
         * 進捗:progress ★(0)
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
                        <th>id</th>
                        <th>カテゴリー</th>
                        <th>優先順位</th>
                        <th>タイトル</th>
                        <th>説明</th>
                        <th>登録</th>
                        <th>目標日</th>
                        <th>進捗</th>
                        <th>完了</th>
                        <th>削除{/** 削除選択 */}</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((todo) => (
                        <tr key={todo.id} className="border-b py-2">
                            <td>{todo.id}</td>
                            <td>
                                {/* カテゴリ */}
                                <TodoCategorys
                                    isLabel={false}
                                    id={todo.id}
                                    value={todo.category}
                                    onValueChange={handleUpdateTodo}
                                />
                            </td>
                            <td>
                                {/* 優先順位 */}
                                <TodoPriority
                                    isLabel={false}
                                    id={todo.id}
                                    value={todo.priority} // fieldから値を取得
                                    isReadOnly={false}
                                    isModeToggle={true}
                                    isDefaultMode={false}
                                    onValueChange={handleUpdateTodo}
                                />
                            </td>
                            <td>
                                {/** タイトル */}
                                <TodoTitle
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
                                <TodoExplanation
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
                            <td>{todo.createdAt.toLocaleString("ja-JP")}</td>
                            <td>
                                {/** 目標日 */}
                                <TodoTarget
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
                            <td>{todo.progressRate}</td>

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
                                {/** 削除選択 */}
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={selectedDelets.includes(todo.id)}
                                    disabled={!isDelete}
                                    onChange={() =>
                                        handleSelectedDelete(todo.id)
                                    }
                                />
                                {/* チェックボックスの値はvalueではなくchecked!!! */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <TodoDelete
                list={selectedDelets}
                isDelete={isDelete}
                onSetIsDelete={setIsDelete}
                onSetSelectedDelets={setSelectedDelets}
                disabled={list.length === 0}
            />
        </FormProvider>
    );
};
