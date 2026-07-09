import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [128, 256, 384, 512, 640],
    qualities: [65, 68, 70, 72, 75],
  },
};

export default nextConfig;
