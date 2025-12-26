/***
 * DialogRegistTodo
 */
"use client";

import { CirclePlus } from "lucide-react";

import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { TodoRegistForm } from "./TodoRegistForm";
import { Dialog } from "@/components/Dialog/Dialog";

type Props = {
    isCreate: boolean;
    setIsCreate: (value: boolean) => void;
};
export const TodoRegist = ({ isCreate, setIsCreate }: Props) => {
    return (
        <div>
            <ButtonIcon className="btn" onClick={() => setIsCreate(!isCreate)}>
                <CirclePlus absoluteStrokeWidth />
                {isCreate ? "追加中" : "追加する？"}
            </ButtonIcon>
            <Dialog
                title="新しい目標"
                isOpen={isCreate}
                onSetIsOpen={setIsCreate}
            >
                <TodoRegistForm onSetIsCreate={setIsCreate} />
            </Dialog>
        </div>
    );
};
