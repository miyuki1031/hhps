import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['localhost:3000', '192.168.0.15:3000', '192.168.0.15', '10.0.0.2', '10.0.0.2:3000'],
  // assetPrefix: ','
};

export default nextConfig;
