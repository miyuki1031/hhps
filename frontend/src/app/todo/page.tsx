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

    // 管理者のみ表示
    const isHidden = (isMasterAuthor: boolean) : boolean => {
        return (isMasterAuthor && !isLoginMaster) || !hasEditor;
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

    const text = isGuest
         ? "登録・編集はGoogleアカウント要(情報は破棄)"
         : isLoginUser
             ? "ログイン情報は破棄しユーザー情報のみ削除可能"
             : "";

    return (
        <div className="
            w-1/2
            flex-1
            p-2 md:p-4
            bg-white
        ">
            <div className="w-full text-black break-all">
                <Suspense>
                    <div className="block md:hidden">
                        { hasEditor? <TodoModal className="pl-1" isLoginMaster={isLoginMaster} />: ""}
                        <LoginUser className="pl-0 pt-2" />
                        <div className="
                            mt-2
                            pl-2
                            pt-2
                            pb-2
                            text-wrap
                        ">
                            {text}
                        </div>
                        <TodoSort
                            className="pt-2"
                            isLoginMaster={isLoginMaster}
                        />
                    </div>

                    <div className="
                        hidden md:flex
                        justify-between
                        w-full
                    ">
                        <div className="md:flex">
                            { hasEditor? <TodoModal isLoginMaster={isLoginMaster} />: ""}
                            <LoginUser />
                            <div className="
                                pl-2
                                pt-2
                                h-10
                            ">
                                {text}
                            </div>
                        </div>
                        <TodoSort
                            className="hidden md:block"
                            innerClassName="justify-end"
                            isLoginMaster={isLoginMaster}
                        />
                    </div>

                    <div className="flex flex-wrap">
                        { todoList.map((item, index ) => (
                            <div
                                key={index}
                                className="card card-border w-full md:w-96 shadow-sm m-2 bg-white"
                            >
                                <div className="card-body p-2 md:p-6">
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
                </Suspense>
            </div>
        </div>

    )
}