/**
 *
 */
"use client";

import { useState, useEffect, useTransition } from "react";

import { TodoList as TodoListType } from "@prisma/client";
import { updateTodoAction } from "@/app/todos/actions";

import { BookmarkCheck } from "lucide-react";
import { TodoDelete } from "./TodoDelete";
import { Stars } from "@/components/Stars";
import { TodoCategorys } from "./TodoCategorys";

interface Props {
    todos: TodoListType[];
}
type Delets = number[];

export const TodoList = ({ todos }: Props) => {
    // list再生成
    const list = todos.map((t) => {
        return { isEditTitle: false, ...t };
    });

    // 更新実行コントロール
    const [isPendingTodoUppdate, startTransitionTodoUpdate] = useTransition();

    // 編集フラグ（数値またはNullの配列）
    const [editingId, setEditingId] = useState<number | null>(null);

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

    const handleCompleted = (id: number, completed: boolean) =>
        updateTodo(id, { completed });
    const handleTitle = (id: number, title: string) =>
        updateTodo(id, { title });
    /**
     * DB系
     * */
    type updateType = {
        category?: string;
        title?: string;
        completed?: boolean;
    };
    const getType = (data: updateType) => {
        if (data.title !== undefined) return "title";
        if (data.completed !== undefined) return "completed";
        if (data.category !== undefined) return "category";
        return "unknown";
    };
    // 更新
    const updateTodo = async (id: number, data: updateType) => {
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
        const isRequired = (type: string, data: updateType) => {
            const hasRequired = [
                "title",
                "category",
                "priority",
                "completed",
            ].includes(type);
            return (
                hasRequired &&
                type === "title" &&
                data.title &&
                data.title.trim() === ""
            );
        };
        const type = getType(data);
        // 不明な場合は何もしない
        if (type === "unknown") return;

        // 必須チェック
        if (isRequired(type, data)) {
            setEditingId(null); // 編集をキャンセルして戻す
            return;
        }

        // タイトル更新のときは、Actionを待たずにすぐ入力欄を閉じる
        if (type === "title") setEditingId(null);
        startTransitionTodoUpdate(async () => {
            await updateTodoAction(id, type, { ...data });
        });
    };

    return (
        <>
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
                                    onUpdateTodo={updateTodo}
                                />
                            </td>
                            <td>
                                <Stars
                                    allStars={3}
                                    pos={todo.priority}
                                    readonly={true}
                                />
                            </td>
                            <td>
                                {!isPendingTodoUppdate &&
                                editingId === todo.id ? (
                                    <input
                                        type="text"
                                        className="input"
                                        defaultValue={todo.title}
                                        // フォーカスが外れたら編集終了
                                        onBlur={(e) => {
                                            if (e.target.value === todo.title) {
                                                setEditingId(null); // 変わってなければ閉じるだけ
                                            } else {
                                                handleTitle(
                                                    todo.id,
                                                    e.target.value
                                                );
                                            }
                                        }}
                                        // Enterキーで確定（オプション）
                                        onKeyDown={(e) =>
                                            e.key === "Enter" &&
                                            e.currentTarget.blur()
                                        }
                                        autoFocus
                                    />
                                ) : (
                                    <button
                                        onClick={() => setEditingId(todo.id)}
                                    >
                                        {todo.title}
                                    </button>
                                )}
                            </td>
                            <td>{todo.explanation}</td>
                            <td>{todo.createdAt.toLocaleString("ja-JP")}</td>
                            <td>
                                {todo.targetDate?.toLocaleString("ja-JP") ?? ""}
                            </td>
                            <td>{todo.progressRate}</td>

                            <td>
                                {/** 完了 */}
                                <button
                                    defaultChecked={todo.completed}
                                    onClick={() =>
                                        handleCompleted(
                                            todo.id,
                                            !todo.completed
                                        )
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
        </>
    );
};
