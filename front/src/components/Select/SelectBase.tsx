"use client";

import { useState } from "react";

import { ButtonIcon } from "../Button/ButtonIcon";

interface Props<T> {
    isBlank?: boolean;
    classWidth?: string;
    list: {
        label: string;
        value: T;
        icon?: React.ElementType;
    }[];
    value?: T;
    onChange?: (value: T) => void;
}

export const SelectBase = <T,>({
    isBlank,
    classWidth,
    list,
    value,
    onChange,
}: Props<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    const getCurrent = () => {
        const current = list.find((t) => t.value === value) || list[0];
        return {
            label: current.label,
            icon: current.icon,
        };
    };
    const { icon: IconComponent } = getCurrent(); // 分割代入で名前を「IconComponent」に変える

    return (
        <div className={`dropdown ${classWidth || "w-full"}`}>
            <ButtonIcon
                isTransparent={true}
                className="w-full flex items-center justify-center"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                {IconComponent ? (
                    <IconComponent size={20} />
                ) : (
                    getCurrent().label
                )}
            </ButtonIcon>
            <ul
                className={`${
                    isOpen ? "block" : "hidden"
                } menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow-sm`}
            >
                {isBlank && <li> - </li>}
                {list.map((t) => {
                    const Icon = t.icon;
                    return (
                        <li key={String(t.value)}>
                            <ButtonIcon
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                    if (onChange) {
                                        onChange(t.value);
                                    }
                                }}
                            >
                                {Icon && <Icon size={20} />}
                                {t.label}
                            </ButtonIcon>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
