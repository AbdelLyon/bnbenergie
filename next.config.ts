import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,

  serverExternalPackages: ['esbuild', 'drizzle-kit', 'pg', 'pg-native', 'payload', '@payloadcms/db-postgres'],

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'bnbenergie01.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  compiler: {
    removeConsole: process.env['NODE_ENV'] === 'production',
  },

  experimental: {
    optimizePackageImports:
      process.env['NODE_ENV'] === 'production'
        ? ['@heroui/react', 'lucide-react', 'framer-motion']
        : [],
    optimizeCss: process.env['NODE_ENV'] === 'production',
  },

  async headers() {
    // En production seulement pour éviter les recompilations en dev
    if (process.env['NODE_ENV'] !== 'production') {
      return [];
    }

    return [
      {
        // Pages HTML - cache court avec revalidation
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=3600',
          },
        ],
      },
      {
        // Assets statiques - cache long
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Images - cache moyen
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
