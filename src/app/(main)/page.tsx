import { About } from '@/app/(main)/_components/About/About';
import { Benefits } from '@/app/(main)/_components/Benefits/Benefits';
import { GoogleReviewsWrapper } from '@/app/(main)/_components/GoogleReviews/GoogleReviewsWrapper';
import { HomeHeader } from '@/app/(main)/_components/HomeHeader/HomeHeader';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';
import { Realisations } from '@/app/(main)/_components/Realisations/Realisations';
import { PricingStructuredData } from '@/components/shared/SEO/StructuredData';
import { PageMainWrapper } from '@/components/shared/layout/PageMainWrapper';
import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Installation Panneaux Solaires Bourg-en-Bresse | RGE QualiPV',
    description:
      'N°1 Installateur panneaux solaires à Bourg-en-Bresse. Entreprise RGE QualiPV certifiée. Devis gratuit 48h, installation pro 3-9kWc clé en main dans l\'Ain.',
    path: '/',
    keywords: [
      'installation panneaux solaires Bourg-en-Bresse',
      'installateur panneaux solaires Bourg-en-Bresse',
      'panneaux solaires Bourg-en-Bresse',
      'photovoltaïque Bourg-en-Bresse',
      'entreprise RGE Bourg-en-Bresse',
      'installateur RGE QualiPV Bourg-en-Bresse',
      'devis panneaux solaires Bourg-en-Bresse gratuit',
      'panneaux solaires Ain',
      'installation photovoltaïque Ain 01',
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
      </PageMainWrapper>
      <GoogleReviewsWrapper />
      <PageMainWrapper variant="amber">
        <Realisations />
        <Pricing />
      </PageMainWrapper>
      <PricingStructuredData />
    </>
  );
}
