import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteSettings();
  const baseUrl = siteConfig.domain?.replace(/\/$/, '');

  return {
    rules: [
      // Règle générale — tous les bots
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
          '/opengraph-image',
          '/logo.svg',
          '/favicon.svg',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/server/',
          '/*.json$',
          '/google*.html',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/image', '/opengraph-image'],
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/'],
        disallow: ['/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/_next/image'],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
