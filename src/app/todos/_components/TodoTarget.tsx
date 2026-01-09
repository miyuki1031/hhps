"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useId } from "react";
import { InputCalendar } from "@/components/Input/InputCalendar";

type Props = {
    id?: number;
    name: string;
    label?: string;
    value?: "";
};
export const TodoTarget = ({ id, name, label, value = "" }: Props) => {
    const { control } = useFormContext();
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
            <Controller
                name={`targetDate${id ? +"_" + id : ""}`}
                control={control}
                render={({ field }) => (
                    <InputCalendar
                        name={name}
                        value={field.value ?? value}
                        id={baseId}
                        onChange={(value: string) => {
                            field.onChange(value);
                        }}
                    />
                )}
            />
        </div>
    );
};
