import { getInterventionZones, getSiteSettings } from '@/lib/payload-queries';
import { BreadcrumbStructuredData } from '@/components/shared/SEO/StructuredData';
import { SITE_CONFIG } from '@/config/site';
import { slugify } from '@/utils/slugify';
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

  if (!cityName) {
    return { title: 'Zone non trouvée' };
  }

  const canonicalUrl = `${SITE_CONFIG.url}/zones-intervention/${city}`;

  return {
    title: `Installateur Panneaux Solaires ${cityName} | Devis Gratuit`,
    description: `Installateur panneaux solaires & photovoltaïques à ${cityName}. Entreprise RGE QualiPV locale, devis gratuit 48h, intervention rapide et garantie décennale dans l'Ain.`,
    keywords: [
      `installateur panneaux solaires ${cityName}`,
      `installateur panneaux photovoltaïques ${cityName}`,
      `installation solaire ${cityName}`,
      `entreprise RGE ${cityName}`,
      `devis panneaux solaires ${cityName} gratuit`,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Installateur Panneaux Solaires ${cityName} | BNB ÉNERGIE`,
      description: `Votre installateur local certifié RGE panneaux solaires à ${cityName}. Installation clé en main, autoconsommation et économies d'énergie.`,
      url: canonicalUrl,
      type: 'website',
      locale: 'fr_FR',
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Installateur Panneaux Solaires ${cityName} | BNB ÉNERGIE`,
      description: `Votre installateur local certifié RGE panneaux solaires à ${cityName}. Installation clé en main, autoconsommation et économies d'énergie.`,
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

  // Villes de la même zone (hors ville courante) pour le maillage interne
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
      <BreadcrumbStructuredData items={[
        { name: 'Accueil', path: '/' },
        { name: "Zones d'Intervention", path: '/zones-intervention' },
        { name: `Installateur Solaire ${cityName}`, path: `/zones-intervention/${city}` },
      ]} />
    </>
  );
}
