import { generateMetadata as generateMetadataHelper } from '@/app/_config/metadata';
import { Metadata } from 'next';
import FAQPageContent from './FAQPageContent';
import {
  getFaqs,
  getPageHeader,
  getSiteSettings,
} from '@/app/_lib/payload-queries';

export const dynamic = 'force-static';
export const revalidate = 60; // Revalide toutes les 60 secondes

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'FAQ Panneaux Solaires Ain - Questions Fréquentes',
    description:
      "Réponses à vos questions sur les panneaux solaires : prix, rentabilité, aides, installation. ✓ FAQ complète panneaux photovoltaïques. ✓ Conseils d'expert Ain.",
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
