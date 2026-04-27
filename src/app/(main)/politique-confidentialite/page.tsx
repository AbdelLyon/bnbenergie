import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import PolitiqueConfidentialitePageContent from './PolitiqueConfidentialitePageContent';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Politique de Confidentialité RGPD | BNB ÉNERGIE',
    description:
      "Politique de confidentialité et protection des données personnelles de BNB ÉNERGIE, installateur panneaux solaires Bourg-en-Bresse. Conformité RGPD.",
    path: '/politique-confidentialite',
    keywords: [
      'politique de confidentialité BNB ÉNERGIE',
      'protection données personnelles RGPD',
    ],
  });
}

export default async function PolitiqueConfidentialitePage() {
  const siteSettings = await getSiteSettings();

  return <PolitiqueConfidentialitePageContent siteSettings={siteSettings} />;
}
