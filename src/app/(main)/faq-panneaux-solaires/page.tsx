import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { Metadata } from 'next';
import FAQPageContent from './FAQPageContent';
import {
  getFaqs,
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';

// ISR - Incremental Static Regeneration
export const revalidate = 60; // MEDIUM_FREQUENCY

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'FAQ Panneaux Solaires Ain - Questions Fréquentes',
    description:
      "Réponses à vos questions sur les panneaux solaires : prix, rentabilité, aides, installation. FAQ complète photovoltaïque. Conseils d'expert Ain.",
    path: '/faq-panneaux-solaires',
    keywords: [
      'faq panneaux solaires',
      'questions fréquentes photovoltaïque',
      'prix panneaux solaires',
      'rentabilité installation solaire',
      'questions aides panneaux solaires',
      'conseils installation photovoltaïque',
      'FAQ solaire Ain',
    ],
  });
}

export default async function FAQPage() {
  const [faqs, header, siteSettings] = await Promise.all([
    getFaqs(),
    getPageHeader('faq'),
    getSiteSettings(),
  ]);

  return (
    <FAQPageContent faqs={faqs} header={header} siteSettings={siteSettings} />
  );
}
