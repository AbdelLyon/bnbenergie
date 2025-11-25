import {
  getInterventionZones,
  getSiteSettings,
} from '@/app/_lib/payload-queries';
import { slugify } from '@/app/_utils/slugify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityPageContent from './CityPageContent';

// Helper to find city name from slug
async function findCityName(slug: string): Promise<string | undefined> {
  const zones = await getInterventionZones();
  const allCommunes = zones.flatMap((zone) => zone.communes.map((c) => c.name));
  return allCommunes.find((city) => slugify(city) === slug);
}

export async function generateStaticParams() {
  const zones = await getInterventionZones();
  const allCommunes = zones.flatMap((zone) => zone.communes.map((c) => c.name));
  return allCommunes.map((city) => ({
    city: slugify(city),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityName = await findCityName(city);
  const siteSettings = await getSiteSettings();

  if (!cityName) {
    return {
      title: 'Zone non trouvée',
    };
  }

  return {
    title: `Installation Panneaux Solaires à ${cityName} | Devis Gratuit`,
    description: `Installateur de panneaux solaires à ${cityName} et ses environs. Entreprise RGE locale, devis gratuit, intervention rapide et garantie décennale.`,
    keywords: [
      `panneaux solaires ${cityName}`,
      `installation photovoltaïque ${cityName}`,
      `installateur solaire ${cityName}`,
      `entreprise RGE ${cityName}`,
      `devis panneaux solaires ${cityName}`,
    ],
    openGraph: {
      title: `Installation Panneaux Solaires à ${cityName} | BNB ÉNERGIE`,
      description: `Votre expert local en panneaux solaires à ${cityName}. Installation clé en main, autoconsommation et économies d'énergie.`,
      url: `${siteSettings.domain}/zones-intervention/${city}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityName = await findCityName(city);
  const siteSettings = await getSiteSettings();
  const zones = await getInterventionZones();

  if (!cityName) {
    notFound();
  }

  // Find the group this city belongs to for specific styling/data if needed
  const cityGroup = zones.find((zone) =>
    zone.communes.some((c) => c.name === cityName)
  );

  return (
    <CityPageContent
      cityName={cityName}
      cityGroup={cityGroup}
      siteSettings={siteSettings}
    />
  );
}
