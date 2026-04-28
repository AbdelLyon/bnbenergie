import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { Metadata } from 'next';
import { getPageHeader, getSiteSettings } from '@/lib/payload-queries';
import NosPacksPageContent from './NosPacksPageContent';
import { PricingStructuredData, BreadcrumbStructuredData } from '@/components/shared/SEO/StructuredData';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Tarifs Panneaux Solaires Bourg-en-Bresse 2025 | Devis Gratuit',
    description:
      "Packs installation panneaux photovoltaïques à Bourg-en-Bresse : 3, 6 ou 9 kWc. Tarifs transparents, garantie décennale, aides MaPrimeRénov incluses. Devis gratuit 48h.",
    path: '/nos-packs',
    keywords: [
      'tarif panneaux solaires Bourg-en-Bresse',
      'prix installation panneaux photovoltaïques Ain',
      'pack panneaux solaires 3kWc 6kWc 9kWc Bourg-en-Bresse',
      'pack autoconsommation photovoltaïque Ain',
      'offre installation solaire RGE Bourg-en-Bresse',
      'devis panneaux solaires Bourg-en-Bresse',
      'prix installation solaire clé en main Ain',
    ],
  });
}

export default async function NosPacksPage() {
  const [header, siteSettings] = await Promise.all([
    getPageHeader('nos-packs'),
    getSiteSettings(),
  ]);

  return (
    <>
      <NosPacksPageContent header={header} siteSettings={siteSettings}>
        <Pricing />
      </NosPacksPageContent>
      <PricingStructuredData />
      <BreadcrumbStructuredData items={[
        { name: 'Accueil', path: '/' },
        { name: 'Nos Packs', path: '/nos-packs' },
      ]} />
    </>
  );
}
