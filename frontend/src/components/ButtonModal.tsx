import {  useModal } from '../providers/ModalProvider';
import { FilePlusCorner, FilePen } from 'lucide-react';

import { ReactNode } from 'react';
import ButtonBase from './Button/ButtonBase';

type ModalProps<T = unknown> = {
    className?: string
    tooltips?: {
        text: string
        className: 'tooltip-start' | 'tooltip-end' | '' 
    } | undefined
    modalDom: ReactNode
    contents?: T
}

export default function ButtonModal<T extends { id?: string | number } >({
    className,
    tooltips,
    modalDom,
    contents,
}: ModalProps<T>) {
    const { openModal } = useModal();

    const handleSwitchData = (dom?: ReactNode, data?: T) => {
        openModal(dom, data);
    };

    return (
        <ButtonBase
            onClick={() => handleSwitchData(modalDom, contents)}
            className={className}
            tooltips={tooltips}
        >
            {contents?.id ? <FilePlusCorner /> : <FilePen />}
        </ButtonBase>
    );
}