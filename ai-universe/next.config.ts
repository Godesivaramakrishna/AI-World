import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow serving static frames from public dir
  images: {
    unoptimized: true,
  },
  // Empty turbopack config to suppress error with Turbopack default in Next.js 16
  turbopack: {},
  devIndicators: false,
};

export default nextConfig;
