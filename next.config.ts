import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@anthropic-ai/sdk'],
  },
  async redirects() {
    return [
      { source: '/en/exchange/:slug', destination: '/exchange/:slug', permanent: true },
      { source: '/pl/exchange/:slug', destination: '/exchange/:slug', permanent: true },
      { source: '/de/exchange/:slug', destination: '/exchange/:slug', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;