import React from "react";

// T は string | number など、扱う値の型を想定
// onChangeやvalueはいったん消して再設定（特殊にしているため）
interface BaseInputProps<T>
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "onChange" | "value"
    > {
    value: T;
    // 戻り値の型を T に合わせることで、string用・number用どちらでも使えるようにする
    onChange: (value: T) => void;
    // フォーカスアウト時などの「確定」用
    onFinish?: (value: T) => void;
}

export const BaseInput = <T extends string | number>({
    value,
    onChange,
    onFinish,
    className,
    type = "text",
    ...props
}: BaseInputProps<T>) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        // type が number の場合は数値に変換して返すロジックを入れておくと便利
        const val = (type === "number" ? Number(rawValue) : rawValue) as T;
        onChange(val);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const val = (type === "number" ? Number(rawValue) : rawValue) as T;
        onFinish?.(val);
    };

    return (
        <input
            {...props}
            type={type}
            value={value ?? ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
                props.onKeyDown?.(e); // 親から渡された onKeyDown があればそれも実行
            }}
            className={`
                px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:ring-blue-500 focus:border-blue-500 outline-none transition
                ${className}
            `}
        />
    );
};
