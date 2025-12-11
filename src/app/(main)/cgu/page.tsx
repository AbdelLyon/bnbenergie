import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import CGUPageContent from './CGUPageContent';
import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: "Conditions Générales d'Utilisation",
    description:
      "Conditions Générales d'Utilisation (CGU) du site BNB Énergie - Règles d'utilisation et obligations des utilisateurs.",
    path: '/cgu',
    keywords: [
      "conditions générales d'utilisation",
      'CGU',
      "règles d'utilisation",
      'obligations utilisateurs',
    ],
  });
}

export default async function CGUPage() {
  const siteSettings = await getSiteSettings();

  return <CGUPageContent siteSettings={siteSettings} />;
}
