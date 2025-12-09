import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteSettings();

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image',
        ],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
