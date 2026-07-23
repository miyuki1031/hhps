import { useRouter } from 'next/navigation';
import { ReactNode, ComponentPropsWithoutRef, MouseEvent } from 'react';

// buttonタグが本来持っている全プロップスをベースにしつつ、独自のものを定義する
// ComponentPropsWithoutRef<'button'> を使うことで、disabled や className なども自動で引き継げます
/**
 これを使うと、わざわざ自分で className や disabled、type などの型を定義しなくても、HTMLの button が本来持っているすべての属性（Props）を自動で引き継いでくれます。* 
 */
interface ButtonBaseProps extends ComponentPropsWithoutRef<'button'> {
    children: ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    href?: string
}

export default function ButtonBase({
    children,
    onClick,
    href,
    ...props // その他の属性（className や type など）をまるっと受け取る
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
    return (
        <button
            onClick={handleClick}
            {...props}
        >
            { children }
        </button>
    );

}