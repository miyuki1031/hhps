import { BaseInput } from "./Baseinput";
interface RealTimeInputProps<T>
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "id" | "onChange" | "value"
    > {
    id: number;
    value: T;
    // 第2引数で値を受け取れるように修正（保存するため）
    onSave: (id: number, value: T, isFinish: boolean) => void;
    // その他の標準的なinput属性も受け取りたい場合はここに追加
    placeholder?: string;
}
export const RealTimeInput = <T extends string | number>({
    id,
    value,
    onSave,
    ...props
}: RealTimeInputProps<T>) => {
    // ここで id: number を保証する
    const handleFinish = (saveValue: T) => {
        onSave(id, saveValue, true);
    };
    const handleChange = (saveValue: T) => {
        onSave(id, saveValue, false);
    };

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
