import { ReactNode } from 'react';

import ThemeColorProvider from './ThemeColorProvider';
import ModalProvider from './ModalProvider';
export default function ClientProvideContainer({ children }: { children: ReactNode }) {
    return (
        <ModalProvider>
            <ThemeColorProvider>
                {children}
            </ThemeColorProvider>
        </ModalProvider>
    );
}