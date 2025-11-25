import { MetadataRoute } from 'next';
import { getSiteSettings } from './_lib/payload-queries';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteSettings();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
