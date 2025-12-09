import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { Metadata } from 'next';
import {
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';
import NosPacksPageContent from './NosPacksPageContent';
import { PricingStructuredData } from '@/components/shared/SEO/StructuredData';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';

// ISR - Incremental Static Regeneration
export const revalidate = 60; // MEDIUM_FREQUENCY

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Nos Packs Photovoltaïques - Tarifs Installation Solaire Ain (01)',
    description:
      "Découvrez nos packs d'installation de panneaux solaires adaptés à vos besoins dans l'Ain. Tarifs transparents, garantie décennale incluse. Devis gratuit sous 48h.",
    path: '/nos-packs',
    keywords: [
      'pack panneaux solaires',
      'tarif installation solaire',
      'prix panneaux photovoltaïques',
      'pack photovoltaïque Ain',
      'devis panneaux solaires',
      'installation solaire prix',
      'pack solaire résidentiel',
      'tarif RGE QualiPV',
      'prix installation Bourg-en-Bresse',
      'pack autoconsommation',
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
      <NosPacksPageContent
        header={header}
        siteSettings={siteSettings}
      >
        <Pricing />
      </NosPacksPageContent>
      <PricingStructuredData />
    </>
  );
}
