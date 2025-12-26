interface Props {
    onClick: () => void;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}
export const ButtonIcon = ({
    onClick,
    children,
    className,
    disabled,
}: Props) => {
    return (
        <button
            onClick={onClick}
            className={`focus:outline-none focus-visible:ring-2 ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
