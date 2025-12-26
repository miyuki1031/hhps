"use client";
// import { TodoCategorys } from "./TodoCategorys";
import { TODO_CATEGORY } from "../constants";

interface Props {
    id: string;
    name: string;
    label: string;
    selected?: string;
}
export const TodoRegistCategorys = ({ id, name, label, selected }: Props) => {
    return (
        <div className="flex flex-row gap-1.5 mb-4">
            <label
                htmlFor={id}
                className="rounded-box bg-blue-400 w-1/3 text-sm p-2 font-medium text-gray-700"
            >
                {label}
            </label>
            <select className="select select-neutral" name={name}>
                {Object.values(TODO_CATEGORY).map((t) => {
                    return (
                        <option key={t.category} value={t.category}>
                            {/* <TodoCategorys target={t.category} /> */}
                            {t.text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
