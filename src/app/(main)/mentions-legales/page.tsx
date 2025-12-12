import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import MentionsLegalesPageContent from './MentionsLegalesPageContent';
import { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Mentions Légales',
    description:
      "Mentions légales de BNB Énergie - Installateur de panneaux solaires photovoltaïques à Bourg-en-Bresse et dans l'Ain.",
    path: '/mentions-legales',
    keywords: [
      'mentions légales',
      'informations légales BNB Énergie',
      'éditeur site web',
      'hébergeur site web',
    ],
  });
}

export default async function MentionsLegalesPage() {
  //TODO
  // const siteSettings = await getSiteSettings();

  return <MentionsLegalesPageContent />;
}
