interface Props {
    onClick: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    isTransparent?: boolean; // 透明フラグを追加
}
export const ButtonIcon = ({
    onClick,
    children,
    className,
    disabled,
    isTransparent = false,
}: Props) => {
    // 透明な場合のベースクラス
    const baseClass = isTransparent
        ? "bg-transparent border-none p-0 flex items-center justify-center"
        : "btn btn-ghost"; // デフォルト（DaisyUI等の例）
    return (
        <button
            type="button"
            onClick={onClick}
            className={`${baseClass} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
