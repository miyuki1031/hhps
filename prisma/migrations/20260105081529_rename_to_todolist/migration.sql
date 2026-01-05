-- TodoListB を削除して TodoList を作成する
DROP TABLE IF EXISTS "Todo";
DROP TABLE IF EXISTS "TodoListA";
DROP TABLE IF EXISTS "TodoListB";


CREATE TABLE "TodoList" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,
    "explanation" TEXT,
    "targetDate" TIMESTAMP(3),
    "progressRate" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,


    CONSTRAINT "TodoList_pkey" PRIMARY KEY ("id")
);