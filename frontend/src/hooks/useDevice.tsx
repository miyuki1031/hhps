/**
 * 課題：
 * スマホ検知もブラウザのリサイズされるたびにすべてがリアクティブに反応してしまう。
 * あとでいい感じのを考える
 */

import { useState, useEffect } from 'react';

export default function useDevice(ua: string) {
    const [ windowSize, setWindowSize ] = useState({
        width: typeof window === 'undefined' || window.innerWidth === undefined
             ? 0
             : window.innerWidth, 
        height: typeof window === 'undefined' || window.innerHeight === undefined
             ? 0
             : window.innerHeight
    });

     useEffect(() => {
        if (typeof window === 'undefined') return;
        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 150); // 150ms待つ
        };
        window.addEventListener('resize', handleResize);
        // 初回実行
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    // 判定ロジック（ステートに持たせず、値からその場で計算する）
    const getIsMobile = (width: number) => width < 640;
    const getIsCompact = (width: number) => width < 640;
    const getIsFull = (width: number) => width > 641;
    const getIsIphone = (currentUa: string) => /iPhone/.test(currentUa);

    // windowSize.width をもとに毎回収導（ステートを減らしてスッキリ）
    const width = windowSize.width;

    // console.log(`★★★End  w  :${windowSize.width} _ h:${windowSize.height}`);
    return {
        ua: ua,
        isMobile: getIsMobile(width),
        isFull: getIsFull(width),
        isCompact: getIsCompact(width),
        isIphone: getIsIphone(ua),
        windowSize: windowSize
    };
}