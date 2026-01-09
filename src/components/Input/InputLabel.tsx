"use client";
interface Props<T> {
    name: string;
    label: string;
    id: string;
    type?: "text" | "number";
    placeholder?: string;
    value?: T;
    required?: boolean;
    max?: number;
    onChange?: (value: T) => void;
}

export const InputLabel = <T,>({
    label,
    name,
    id,
    type = "text",
    required = false,
    value,
    max,
    onChange,
    ...props
}: Props<T>) => {
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
                value={value as string | number | undefined}
                onChange={(e) => {
                    const rawValue = e.target.value;
                    const val = (
                        type === "text" ? rawValue : Number(rawValue)
                    ) as T;
                    // 空文字の時は 0 にせず空のままにする工夫
                    if (onChange && e?.target?.value) {
                        onChange(val);
                    }
                }}
                {...props} // value, onChange, placeholder などをまとめて流し込む
            />
        </div>
    );
};
