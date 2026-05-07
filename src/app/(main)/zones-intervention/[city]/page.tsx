import { getInterventionZones, getSiteSettings } from '@/lib/payload-queries';
import {
  BreadcrumbStructuredData,
  LocalServiceStructuredData,
} from '@/components/shared/SEO/StructuredData';
import { SITE_CONFIG } from '@/config/site';
import { slugify } from '@/utils/slugify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityPageContent from './CityPageContent';

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, '');

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

  if (!cityName) {
    return { title: 'Zone non trouvée' };
  }

  const canonicalUrl = `${BASE_URL}/zones-intervention/${city}`;

  const title = `Installateur Solaire ${cityName} (Ain) | Devis Gratuit`;

  const description = `Panneaux solaires & photovoltaïques à ${cityName}, Ain (01). Installateur RGE QualiPV local, devis gratuit 48h, installation clé en main et garantie décennale.`;

  return {
    title,
    description,
    keywords: [
      `installateur panneaux solaires ${cityName}`,
      `installateur panneaux photovoltaïques ${cityName}`,
      `installation solaire ${cityName}`,
      `entreprise RGE ${cityName}`,
      `devis panneaux solaires ${cityName} gratuit`,
      `panneaux solaires ${cityName} Ain`,
      `photovoltaïque ${cityName} Ain 01`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Installateur Panneaux Solaires ${cityName} | BNB ÉNERGIE Ain`,
      description: `Installateur RGE QualiPV local à ${cityName}. Installation clé en main, autoconsommation et économies d'énergie dans l'Ain (01).`,
      url: canonicalUrl,
      type: 'website',
      locale: 'fr_FR',
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Installateur Panneaux Solaires ${cityName} | BNB ÉNERGIE Ain`,
      description: `Installateur RGE QualiPV local à ${cityName}. Installation clé en main, autoconsommation et économies d'énergie dans l'Ain (01).`,
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

  const cityGroup = zones.find((zone) =>
    zone.communes.some((c) => c.name === cityName)
  );

  const relatedCities = (cityGroup?.communes ?? [])
    .filter((c) => c.name !== cityName)
    .map((c) => ({ name: c.name, slug: slugify(c.name) }))
    .slice(0, 10);

  return (
    <>
      <CityPageContent
        cityName={cityName}
        zoneName={cityGroup?.zone ?? ''}
        siteSettings={siteSettings}
        relatedCities={relatedCities}
      />
      <LocalServiceStructuredData cityName={cityName} citySlug={city} />
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', path: '/' },
          { name: "Zones d'Intervention", path: '/zones-intervention' },
          {
            name: `Installateur Solaire ${cityName}`,
            path: `/zones-intervention/${city}`,
          },
        ]}
      />
    </>
  );
}
