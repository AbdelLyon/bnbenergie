import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import MentionsLegalesPageContent from './MentionsLegalesPageContent';
import { Metadata } from 'next';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Mentions Légales | BNB ÉNERGIE Bourg-en-Bresse',
    description:
      "Mentions légales de BNB ÉNERGIE, installateur de panneaux solaires photovoltaïques à Bourg-en-Bresse (01000). Informations légales, éditeur et hébergeur du site.",
    path: '/mentions-legales',
    keywords: [
      'mentions légales BNB ÉNERGIE',
      'informations légales installateur solaire Ain',
    ],
  });
}

export default async function MentionsLegalesPage() {
  //TODO
  // const siteSettings = await getSiteSettings();

  return <MentionsLegalesPageContent />;
}
