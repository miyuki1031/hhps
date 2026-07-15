import type { NextConfig } from "next";

const config = {
// すでにある設定があればその下に追記
  devIndicators: {},
  // 👇 これを追加します！
  experimental: {
    allowedDevOrigins: ['localhost', 'hoge']
  },
};

const nextConfig = config as NextConfig;
export default nextConfig;
