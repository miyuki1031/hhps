"use client";

import { useState } from "react";

import { CirclePlus } from "lucide-react";
import { ButtonIcon } from "@/components/Button/ButtonIcon";
import { TodoRegistForm } from "./TodoRegistForm";
import { Dialog } from "@/components/Dialog/Dialog";

export const TodoRegist = () => {
    // モーダル開閉制御
    const [isCreate, setIsCreate] = useState<boolean>(false);
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
