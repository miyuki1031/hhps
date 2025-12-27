"use client";

import { useId } from "react";
import { InputCalendar } from "@/components/Input/InputCalendar";

type Props = {
    name: string;
    label?: string;
};
export const TodoRegistCalendar = ({ name, label }: Props) => {
    const baseId = useId();

    return (
        <div className="flex flex-row gap-1.5 mb-4">
            {label && (
                <label
                    htmlFor={baseId}
                    className="rounded-box bg-blue-400 w-1/3 text-sm p-2 font-medium text-gray-700"
                >
                    {label}
                </label>
            )}
            <InputCalendar name={name} id={baseId} />
        </div>
    );
};
