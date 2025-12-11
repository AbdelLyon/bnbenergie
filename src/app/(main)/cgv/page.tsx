import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import CGVPageContent from './CGVPageContent';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Conditions Générales de Vente',
    description:
      'Conditions Générales de Vente (CGV) de BNB Énergie - Installation de panneaux solaires photovoltaïques.',
    path: '/cgv',
    keywords: [
      'conditions générales de vente',
      'CGV',
      'conditions commerciales',
      'modalités de vente',
      'garanties',
    ],
  });
}

export default async function CGVPage() {
  const siteSettings = await getSiteSettings();

  return <CGVPageContent siteSettings={siteSettings} />;
}
