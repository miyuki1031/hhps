"use client";
type Props = {
    title: string;
    isOpen: boolean;
    onSetIsOpen: (value: boolean) => void;
    children: React.ReactNode;
    childrenSubmit?: React.ReactNode;
};

export const Dialog = ({
    title,
    isOpen,
    onSetIsOpen,
    children,
    childrenSubmit,
}: Props) => {
    return (
        <dialog id="my_modal_1" className="modal" open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        {/** 実行ボタン */}
                        {childrenSubmit}
                        {/** キャンセル */}
                        <button
                            className="btn"
                            onClick={() => onSetIsOpen(!isOpen)}
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
