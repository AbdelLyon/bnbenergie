import { MetadataRoute } from 'next';
import { slugify } from '@/app/_utils/slugify';
import siteConfig from '@/data/siteConfig.json';
import zonesData from '@/data/zonesData.json';

interface ZoneGroup {
  zone: string;
  communes: string[];
  gradient: string;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.domain;
  const currentDate = new Date();

  // Generate city URLs
  const cityUrls = zonesData.communes.groups.flatMap((group: ZoneGroup) =>
    group.communes.map((city: string) => ({
      url: `${baseUrl}/zones-intervention/${slugify(city)}`,
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
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zones-intervention`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/garanties`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/realisations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/aides-financement`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq-panneaux-solaires`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    ...cityUrls,
  ];
}
