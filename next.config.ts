import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@anthropic-ai/sdk'],
  },
  async redirects() {
    return [
      { source: '/en/coins', destination: '/coins', permanent: false },
      { source: '/pl/coins', destination: '/coins', permanent: false },
      { source: '/de/coins', destination: '/coins', permanent: false },
    ];
  },
};

export default nextConfig;
