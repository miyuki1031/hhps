import { ReactNode } from 'react';

import ThemeColorProvider from './ThemeColorProvider';
export default function ClientProvideContainer({ children }: { children: ReactNode }) {
    return (
        <ThemeColorProvider>
            {children}
        </ThemeColorProvider>
    );
}