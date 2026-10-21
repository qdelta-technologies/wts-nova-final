import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve the smaller AVIF encode where supported, with WebP as the fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
