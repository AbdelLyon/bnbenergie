import { About } from '@/app/(main)/_components/About/About';
import { Benefits } from '@/app/(main)/_components/Benefits/Benefits';
import { GoogleReviewsWrapper } from '@/app/(main)/_components/GoogleReviews/GoogleReviewsWrapper';
import { HomeHeader } from '@/app/(main)/_components/HomeHeader/HomeHeader';
import { Pricing } from '@/app/(main)/_components/Pricing/Pricing';
import { Realisations } from '@/app/(main)/_components/Realisations/Realisations';
import { PageMainWrapper } from '@/components/shared/layout/PageMainWrapper';
import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { PricingStructuredData } from '@/components/shared/SEO/StructuredData';
import { Metadata } from 'next';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return {
    ...generateMetadataHelper({
      title: 'Installateur Panneaux Solaires Bourg-en-Bresse',

      description:
        "Installateur RGE QualiPV à Bourg-en-Bresse et dans l'Ain (01). Devis gratuit 48h, installation photovoltaïque clé en main. Garantie décennale.",

      path: '/',

      keywords: [
        'installateur panneaux solaires Bourg-en-Bresse',
        'installation photovoltaïque Bourg-en-Bresse',
        'installateur RGE QualiPV Bourg-en-Bresse',
        'panneaux solaires Bourg-en-Bresse',
        'devis panneaux solaires Bourg-en-Bresse',
        'installateur panneaux solaires Ain',
        'installation photovoltaïque Ain 01',
        'installateur RGE QualiPV Ain',
        'panneaux solaires Ain 01',
        'autoconsommation solaire Bourg-en-Bresse',
        'entreprise panneaux solaires certifiée Ain',
        'garantie décennale installation solaire',
      ],
    }),

    alternates: {
      canonical: 'https://bnbenergie01.com/',
    },
  };
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
