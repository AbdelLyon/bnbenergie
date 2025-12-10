import { MetadataRoute } from 'next';
import { slugify } from '@/utils/slugify';
import {
  getSiteSettings,
  getInterventionZones,
} from '@/lib/payload-queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [siteConfig, zones] = await Promise.all([
    getSiteSettings(),
    getInterventionZones()
  ]);

  const baseUrl = siteConfig.domain?.replace(/\/$/, '') + '/';
  const currentDate = new Date();

  // Generate city URLs from intervention zones
  const cityUrls = zones.flatMap((zone) =>
    zone.communes.map((commune) => ({
      url: `${baseUrl}zones-intervention/${slugify(commune.name)}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}zones-intervention`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}garanties`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}realisations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}aides-financement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}nos-packs`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}faq-panneaux-solaires`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    ...cityUrls,
  ];
}
