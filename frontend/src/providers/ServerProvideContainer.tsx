import { ReactNode } from 'react';

import UserAgentProvider from './UserDeviceProvider';

interface ServerProvideContainerProps {
    children: ReactNode, 
    uaInfo: string
}

export default function ServerProvideContainer({ 
    children,
    uaInfo 
}: ServerProvideContainerProps) {
    
    return (
        <UserAgentProvider uaInfo={uaInfo}>
            {/* <SessionProvider> */}
            {children}
            {/* </SessionProvider> */}
        </UserAgentProvider>
    );
}