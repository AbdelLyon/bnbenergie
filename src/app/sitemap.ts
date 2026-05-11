import { MetadataRoute } from "next";
import { slugify } from "@/utils/slugify";
import { getSiteSettings, getInterventionZones } from "@/lib/payload-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [siteConfig, zones] = await Promise.all([
    getSiteSettings(),
    getInterventionZones(),
  ]);

  const baseUrl =
    siteConfig.domain?.replace(/\/$/, "") ?? "https://bnbenergie01.com";
  const currentDate = new Date();

  type CityPriority = 0.45 | 0.4;
  type CityChangeFrequency = "monthly";

  const cityUrls: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: CityChangeFrequency;
    priority: CityPriority;
  }> = zones.flatMap((zone) =>
    zone.communes.map((commune) => {
      const isBourgEnBresse = commune.name === "Bourg-en-Bresse";
      const priority: CityPriority = isBourgEnBresse ? 0.45 : 0.4;

      return {
        url: `${baseUrl}/zones-intervention/${slugify(commune.name)}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority,
      };
    })
  );

  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/zones-intervention`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nos-packs`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/garanties`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/realisations`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/aides-financement`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq-panneaux-solaires`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...cityUrls,
  ];
}
