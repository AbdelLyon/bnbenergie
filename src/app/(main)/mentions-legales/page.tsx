import MentionsLegalesPageContent from './MentionsLegalesPageContent';
import { Metadata } from 'next';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return {
    title: 'Mentions Légales',
    description:
      'Mentions légales de BNB ÉNERGIE - Installateur de panneaux solaires à Bourg-en-Bresse (Ain).',
    robots: { index: false, follow: false },
  };
}

export default async function MentionsLegalesPage() {
  return <MentionsLegalesPageContent />;
}
