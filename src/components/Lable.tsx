"use client";
type LabelPropsType = {
    isLabel?: boolean;
    htmlFor?: string;
    textLabel?: string;
};

export const Label = (props: LabelPropsType) => {
    if (!props.isLabel) return;

    const { htmlFor, textLabel } = props;
    return (
        <label
            htmlFor={htmlFor}
            className={`rounded-box bg-blue-400 text-sm p-2 font-medium text-gray-700 w-1/3`}
        >
            {textLabel}
        </label>
    );
};
