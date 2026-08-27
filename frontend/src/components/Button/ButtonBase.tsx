'use client'
import { useRouter } from 'next/navigation';
import { ReactNode, ComponentPropsWithoutRef, MouseEvent } from 'react';

// buttonタグが本来持っている全プロップスをベースにしつつ、独自のものを定義する
// ComponentPropsWithoutRef<'button'> を使うことで、disabled や className なども自動で引き継げます
/**
 これを使うと、わざわざ自分で className や disabled、type などの型を定義しなくても、HTMLの button が本来持っているすべての属性（Props）を自動で引き継いでくれます。* 
 */
interface ButtonBaseProps extends ComponentPropsWithoutRef<'button'> {
    children: ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    href?: string
    className?: string
    tooltips?: {
        text: string
        className: 'tooltip-start' | 'tooltip-end' | ''
    } | undefined
    isNoPadding?: boolean
}

export default function ButtonBase({
    children,
    onClick,
    href,
    tooltips,
    isNoPadding = false,
    ...props // extendsで定義してあるその他の属性（className や type formActionなど）をまるっと受け取る
} : ButtonBaseProps) {
    const router = useRouter();
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (href!== undefined) {
            router.push(href); 
        }
        if (onClick !== undefined) {
            onClick(e);
        }
    }
    let tooltipProps = {}, tooltipsClassName = "";
    const isTooltips = tooltips !== undefined;
    // 1. 条件に応じたオブジェクトを用意する
    if (isTooltips && "text" in tooltips) {
        tooltipProps = { "data-tip": tooltips.text };
        tooltipsClassName = `tooltip tooltip-top ${tooltips.className || ""}`
}
    return (
        <button
            onClick={handleClick}
            {...props}
            {...tooltipProps}
            className={`
                ${isNoPadding
                    ? ""
                    : "btn btn-soft"
                }
                ${props.className || "" }
                ${tooltipsClassName}`
            }
        >
        { children }
        </button>
    );

}