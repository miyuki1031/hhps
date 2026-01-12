import { BaseInput } from "./Baseinput";
interface FormInputProps<T>
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "id" | "onChange" | "value"
    > {
    value: T;
    onSave: (value: T) => void;
    placeholder?: string;
}

export const FormInput = <T extends string | number>({
    value,
    onSave,
    placeholder,
    ...props
}: FormInputProps<T>) => {
    const handleFinish = (value: T) => onSave(value);

    return (
        <BaseInput<T>
            {...props}
            value={value}
            placeholder={placeholder}
            onChange={handleFinish}
        />
    );
};
