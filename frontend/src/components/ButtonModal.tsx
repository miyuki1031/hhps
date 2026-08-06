import {  useModal } from '../providers/ModalProvider';
import { FilePlusCorner, FilePen } from 'lucide-react';

import { ReactNode } from 'react';
import ButtonBase from './Button/ButtonBase';

type ModalProps<T = any> = {
    className?: string
    tooltips?: {
        text: string
        className: 'tooltip-start' | 'tooltip-end' | '' 
    } | undefined
    modalDom: ReactNode
    contents?: T
}

export default function ButtonModal({
    className,
    tooltips,
    modalDom,
    contents,

}: ModalProps) {
    const { openModal } = useModal();

    const handleSwitchData = (modalDom?: ReactNode, contents?: any) => {
        openModal(modalDom, contents);
    };
    return (
        <ButtonBase
            onClick={() =>handleSwitchData(modalDom, contents)}
            className={className}
            tooltips={tooltips}
        >
            {contents?.id 
                 ? <FilePlusCorner />
                 : <FilePen />
            }
        </ButtonBase>)
}
