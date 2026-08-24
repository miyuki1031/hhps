'use client';

import { SITE_INFO } from '@/lib/constants';
import Navigation from './Navigation';

export default function Header() {
    return (
        <header className="flex justify-between items-center px-2 py-1">
            <h1 className="text-xs"> {SITE_INFO.NAME}</h1>
            <Navigation />
        </header>
    );
}