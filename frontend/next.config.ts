import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    '192.168.0.14',
    '192.168.0.14:3000',
    '10.0.0.2',
    '10.0.0.2:3000'
  ],
  devIndicators: {
    position: 'bottom-right', // 15移行で邪魔なインジケータを消す場合
    // HMRの通信先（WebSocket）を、スマホから見えているあなたのPCのIPに強制固定する
  },
  // assetPrefix: process.env.NODE_ENV === 'production' ? undefined : process.env.NEXT_PUBLIC_ASSET_URL,
  assetPrefix: '',
};
export default nextConfig;
