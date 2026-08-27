'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ModalProps = {
    // モーダルフラグ
    isOpenModal: boolean;
    // モーダル開閉
    toggleModal: () => void;//いまは引数なし
    // 表示内容
    contents: Record<string, unknown>
    // 表示内容をセット
    setBodyContents: (info: Record<string, string>) => void;
    // モーダルDom
    modalDom: ReactNode;
    // モーダルDom更新
    setModalDom: (modalDom: ReactNode) => void;
    // DOMとデータを同時にセットして開く
    openModal: (dom: ReactNode, contents?: Record<string, unknown>) => void;
}

export const ModalContext = createContext<ModalProps | undefined>(undefined);

export default function ModalProvider({ children }: { children: ReactNode }) {
    // モーダルフラグ
    const [ isOpenModal, setIsOpenModal ] = useState(false);
    // 表示コンテンツの内容（タイトルの中身とか）
    const [ contents, setContents ] = useState<Record<string, unknown>>({});
    // モーダルDOM
    const [ modalDom, setModalDom ] = useState<ReactNode>(null);

    // モーダル展開
    const toggleModal = () => {
        setModalDom(null)
        setIsOpenModal(prev => !prev);
    };
    // 表示内容セット（DOMそのまま）
    const setBodyContents = (info: Record<string, unknown>) => {
        setContents(info)
    }
    // DOMとデータを同時にセットして開く
    const openModal = (dom: ReactNode, info: Record<string, unknown> = {}) => {
        setModalDom(dom);
        setContents(info);
        setIsOpenModal(true);
    };

    return (
        <>
        <ModalContext.Provider value={{
            isOpenModal, 
            contents, 
            toggleModal, 
            setBodyContents, 
            modalDom,
            setModalDom,
            openModal
         }}>
            {children}
            <div className={`
                ${isOpenModal
                     ? "block"
                    : "hidden"
                }
                fixed inset-0 z-200 h-full bg-orange-500/50 grid place-items-center touch-none md:touch-auto
            `}>
                <div className={`
                    relative
                    w-full
                    md:w-5/12
                    h-full
                    md:rounded-lg
                    md:h-11/12
                    bg-white
                    shadow-xl/30
                    p-4 md:p-10
`}>
                        {modalDom}
                </div>
            </div>
        </ModalContext.Provider>

        </>
    )
}
// 使うときのカスタムフック
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};