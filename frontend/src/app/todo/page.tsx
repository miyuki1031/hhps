import { castBoolean, castOrder, castOrderByColumn } from '@/lib/utils';
import { fetchTodo } from '@/lib/db/todo-queries';
import { checkRoll } from "@/lib/db/users-queries";
import { TodoOptions } from '@/lib/definitions';

import TodoModal from './TodoModal';
import TodoSort from './TodoSort'
import TodoCompleted from './TodoCompleted';
import TodoDelete from './TodoDelete';
import LoginUser from '@/components/LoginUser';
import { Globe, GlobeLock } from 'lucide-react';

import { Suspense } from 'react';

export default async function page({
    searchParams,
 }: {
    searchParams: Promise<TodoOptions>
}) {
    
    const getFetchTodoParam = (queries:TodoOptions) => {
        const VALID_TODO_COLUMNS = ["id", "title", "dueDate", "isComplete", "isDelete", "isPrivate"] as const;
        return {
            orderByColumn: castOrderByColumn(queries, VALID_TODO_COLUMNS, "dueDate"),
            order: castOrder("asc"),
            isDelete: castBoolean(queries?.isDelete),
            isComplete: castBoolean(queries.isComplete),
            isPrivate: castBoolean(queries.isPrivate),
        };
    }

    // URLクエリ取得
    const queries = await searchParams;
    // 検索パラメータ生成
    const fetchTodoParam:TodoOptions = getFetchTodoParam(queries);
    // 検索
    const response = await fetchTodo(fetchTodoParam);
    const { todoList } = response.success && response.data
        ? response.data
        : { todoList: [] };

    // ロール
    const session = await checkRoll();
    const { isGuest, isLoginMaster, isLoginUser } = session.data ?? {
        isGuest: true, isLoginMaster: false, isLoginUser: false
    };
    const hasEditor = isLoginMaster || isLoginUser;
    // 管理者のみ表示
    const isHidden = (isMasterAuthor: boolean) : boolean => {
        return (isMasterAuthor && !isLoginMaster) || !hasEditor;

    }
    return (
        <div className="flex-1 bg-white p-4">
            <div className="flex justify-between">
                <div className="flex">
                    {hasEditor? <TodoModal className="ml-1" isLoginMaster={isLoginMaster} />: ""}
                    <LoginUser />
                </div>
                <Suspense>
                    <TodoSort isLoginMaster={isLoginMaster} />
                </Suspense>
            </div>

            <div className="p-2">
                { isGuest
                    ? "Todoを登録・編集するにはGoogleアカウントが必要です。(ログイン情報は破棄しています)"
                    : isLoginUser
                        ? "ログイン情報は破棄しユーザー情報のみ削除可能"
                        : ""
                }
            </div>

             <div className="flex flex-wrap">
                { todoList.map((item, index ) => (
                    <div
                        key={index}
                        className="card card-border bg-base-100 w-96 shadow-sm m-2"
                    >
                        <div className="card-body">
                            <div className="flex justify-end">
                                <span className={`badge
                                    ${item.isComplete? "block": "hidden"}
                                `}>isComplete</span>
                                <span
                                    className={`badge
                                    ${item.isDelete? "block": "hidden"}
                                `}>Delete</span>
                                {item.isPrivate? <GlobeLock size={19} />: <Globe size={19} />}
                                
                            </div>
                            <h2 className="card-title">{item.title}</h2>
                            <p>{ item.description}</p>
                            <p>期限：{ item.dueDate }</p>
                            <div className={`
                                card-actions justify-end flex
                                ${isHidden(item.isMasterAuthor)? "hidden": "block"}
                            `}>
                                {/** 編集 */}
                                <TodoModal initialData={item} isLoginMaster={isLoginMaster} />
                                {/* * 完了 */}
                                <TodoCompleted id={item.id} isComplete={item.isComplete} />
                                {/* * 削除 */}
                                <TodoDelete
                                    id={item.id}
                                    isDelete={item.isDelete}
                                    hardDelete={isLoginMaster}
                                 />
                            </div>
                        </div>
                    </div>
                    )
                ) }
            </div>
        </div>
    )
}