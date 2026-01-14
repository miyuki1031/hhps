import { BaseInput } from "./Baseinput";
interface RealTimeInputProps<T>
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "id" | "onChange" | "value"
    > {
    id: string;
    value: T;
    // 第2引数で値を受け取れるように修正（保存するため）
    onSave: (value: T, isFinish: boolean) => void;
    // その他の標準的なinput属性も受け取りたい場合はここに追加
    placeholder?: string;
}
export const RealTimeInput = <T extends string | number>({
    id,
    value,
    onSave,
    ...props
}: RealTimeInputProps<T>) => {
    const handleFinish = (saveValue: T) => onSave(saveValue, true);
    const handleChange = (saveValue: T) => onSave(saveValue, false);

    return (
        <BaseInput<T>
            {...props}
            id={String(id)}
            value={value}
            onFinish={handleFinish}
            onChange={handleChange}
        />
    );
};
