interface Props {
    onClick: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    isTransparent?: boolean; // 透明フラグを追加
    position?: "l" | "c" | "r";
}
export const ButtonIcon = ({
    onClick,
    children,
    className,
    disabled,
    isTransparent = false,
    position,
}: Props) => {
    // bg-transparent

    // 透明な場合のベースクラス
    let baseClass = isTransparent
        ? `border-none p-0 font-inherit cursor-pointer 
            outline-none appearance-none 
            w-full h-full min-h-[1.5em] 
            items-center `
        : "btn btn-ghost";

    if (position === "l") {
        baseClass += "flex justify-start";
    } else if (position === "r") {
        baseClass += "flex justify-end";
    } else {
        baseClass += "flex justify-center";
    }

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
