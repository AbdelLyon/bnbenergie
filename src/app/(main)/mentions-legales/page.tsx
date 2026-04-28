import MentionsLegalesPageContent from './MentionsLegalesPageContent';
import { Metadata } from 'next';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return {
    title: 'Mentions Légales | BNB ÉNERGIE',
    description: 'Mentions légales de BNB ÉNERGIE.',
    robots: { index: false, follow: false },
  };
}

export default async function MentionsLegalesPage() {
  //TODO
  // const siteSettings = await getSiteSettings();

  return <MentionsLegalesPageContent />;
}
