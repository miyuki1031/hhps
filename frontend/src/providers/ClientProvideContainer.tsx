import { ReactNode } from 'react';

import UserAgentProvider from './UserDeviceProvider';
import ThemeColorProvider from './ThemeColorProvider';
import ModalProvider from './ModalProvider';
export default function ClientProvideContainer({
    children,
    uaInfo,
 }: {
    children: ReactNode,
    uaInfo: string,
}) {
    return (
        <UserAgentProvider uaInfo={uaInfo}>
            <ModalProvider>
                <ThemeColorProvider>
                    {children}
                </ThemeColorProvider>
            </ModalProvider>
        </UserAgentProvider>
    );
}