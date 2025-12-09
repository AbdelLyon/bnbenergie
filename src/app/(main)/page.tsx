import { About } from '@/app/(main)/_components/About/About';
import { Benefits } from '@/app/(main)/_components/Benefits/Benefits';
import { HomeHeader } from '@/app/(main)/_components/HomeHeader/HomeHeader';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';
import { Realisations } from '@/app/(main)/_components/Realisations/Realisations';
import { PricingStructuredData } from '@/components/shared/SEO/StructuredData';
import { PageMainWrapper } from '@/components/shared/layout/PageMainWrapper';
import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { Metadata } from 'next';

// ISR - Incremental Static Regeneration
// Page d'accueil avec forte fréquence de mise à jour (HIGH_FREQUENCY)
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Installation Panneaux Solaires Ain | Expert RGE QualiPV',
    description:
      "Installateur panneaux solaires photovoltaïques Bourg-en-Bresse & Ain. RGE QualiPV. Devis gratuit 48h, MaPrimeRénov', installation pro 3-9kWc clé en main.",
    path: '',
    keywords: [
      'panneaux solaires Ain',
      'installation photovoltaïque Ain 01',
      'entreprise RGE QualiPV Ain',
      'installateur panneaux solaires Bourg-en-Bresse',
      'devis gratuit panneaux solaires',
      'installation solaire clé en main',
      'autoconsommation solaire Ain',
      'photovoltaïque Bourg-en-Bresse',
    ],
  });
}

export default function Home() {
  return (
    <>
      <PageMainWrapper variant="amber">
        <HomeHeader />
        <About />
        <Benefits />
        <Realisations />
        <Pricing />
      </PageMainWrapper>
      <PricingStructuredData />
    </>
  );
}
