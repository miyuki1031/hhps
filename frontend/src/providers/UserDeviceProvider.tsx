
'use client';

import { createContext, ReactNode } from 'react';
import useDevice from '../hooks/useDevice';


interface UserDeviceProviderProps {
    children : ReactNode,
    uaInfo: string
}

export const UserDeviceContext = createContext({
    ua: '',
    isMobile: false,
    isFull: false,
    isCompact: false,
    isIphone: false,
    windowSize: { width: 0, height: 0 }
});

export default  function UserDeviceProvider({ children, uaInfo } : UserDeviceProviderProps) {
    const device = useDevice(uaInfo);
    return (
    <UserDeviceContext value={device}>
        { children }
    </UserDeviceContext>
    )
}
