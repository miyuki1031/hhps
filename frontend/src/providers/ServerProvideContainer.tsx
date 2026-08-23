import { ReactNode } from 'react';

export default function ServerProvideContainer({ 
    children,
}: {
    children: ReactNode,
}) {
    
    return (
        <>
            {children}
        </>

    );
}