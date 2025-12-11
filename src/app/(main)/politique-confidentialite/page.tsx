import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import PolitiqueConfidentialitePageContent from './PolitiqueConfidentialitePageContent';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Politique de Confidentialité',
    description:
      'Politique de confidentialité et protection des données personnelles de BNB Énergie - Conformité RGPD.',
    path: '/politique-confidentialite',
    keywords: [
      'politique de confidentialité',
      'protection des données',
      'RGPD',
      'données personnelles',
      'vie privée',
    ],
  });
}

export default async function PolitiqueConfidentialitePage() {
  const siteSettings = await getSiteSettings();

  return <PolitiqueConfidentialitePageContent siteSettings={siteSettings} />;
}
