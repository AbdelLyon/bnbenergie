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
    title: 'Installation Panneaux Solaires Ain (01) | Entreprise RGE QualiPV',
    description:
      "Expert en installation de panneaux solaires photovoltaïques dans l'Ain (01). ✓ Entreprise RGE QualiPV certifiée. ✓ Devis gratuit sous 48h. ✓ Garantie décennale. Installation clé en main à Bourg-en-Bresse.",
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
