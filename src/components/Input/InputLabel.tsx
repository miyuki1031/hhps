"use client";
interface Props {
    name: string;
    label: string;
    id: string;
    type?: "text" | "number";
    placeholder?: string;
    value?: string | number;
    required?: boolean;
    max?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputLabel = ({
    label,
    name,
    id,
    type = "text",
    required = false,
    value,
    max,
    ...props
}: Props) => {
    return (
        <div className="flex flex-row gap-1.5 mb-4">
            {/* htmlFor と input の id を一致させるのがHTMLのルールです */}
            <label
                htmlFor={id}
                className="rounded-box bg-blue-400 w-1/3 text-sm p-2 font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                maxLength={max}
                required={required}
                className="px-3 py-2 border border-gray-300 w-2/3 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                {...props} // value, onChange, placeholder などをまとめて流し込む
                value={value}
            />
        </div>
    );
};
