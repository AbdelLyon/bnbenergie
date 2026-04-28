import PolitiqueConfidentialitePageContent from './PolitiqueConfidentialitePageContent';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return {
    title: 'Politique de Confidentialité | BNB ÉNERGIE',
    description: 'Politique de confidentialité de BNB ÉNERGIE.',
    robots: { index: false, follow: false },
  };
}

export default async function PolitiqueConfidentialitePage() {
  const siteSettings = await getSiteSettings();

  return <PolitiqueConfidentialitePageContent siteSettings={siteSettings} />;
}
