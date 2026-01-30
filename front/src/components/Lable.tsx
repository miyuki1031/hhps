"use client";
type LabelPropsType = {
    isStandalone?: boolean;
    isLabel?: boolean;
    htmlFor?: string;
    textLabel?: string;
};

export const Label = ({
    isStandalone = false,
    isLabel,
    htmlFor,
    textLabel,
}: LabelPropsType) => {
    if (!isLabel) return;
    const labelStyle = `rounded-box bg-blue-400 text-sm p-2 font-medium text-gray-700 w-1/3`;

    return (
        <>
            {isStandalone ? (
                <div className={labelStyle}>{textLabel}</div>
            ) : (
                <label htmlFor={htmlFor} className={labelStyle}>
                    {textLabel}
                </label>
            )}
        </>
    );
};
