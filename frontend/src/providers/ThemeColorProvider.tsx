'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';

// 外から参照する用
export const ThemeColorContext = createContext({
    isLight: false,
    toggleTheme: () => {}
});

export default function ThemeColorProvider({ children } : { children : ReactNode }) {
    const [ isLight, setIsLight] = useState(false);
    const toggleTheme = () => setIsLight(!isLight);

    useEffect(() => {
      // 状態に合わせて、一番外側のタグ（htmlやbodyなど）のクラスを入れ替える！
      const root = document.body;
      if (isLight) {
        root.classList.add('sun');
        root.classList.remove('moon');
      } else {
        root.classList.add('moon');
        root.classList.remove('sun');
      }
    }, [isLight]);
    return (
        <ThemeColorContext value={{ isLight, toggleTheme }}>
            { children }
        </ThemeColorContext>
    )
}