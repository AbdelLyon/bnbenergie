import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import {
  FAQStructuredData,
  BreadcrumbStructuredData,
} from '@/components/shared/SEO/StructuredData';
import { Metadata } from 'next';
import FAQPageContent from './FAQPageContent';
import { getFaqs, getPageHeader, getSiteSettings } from '@/lib/payload-queries';

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'FAQ Panneaux Solaires Bourg-en-Bresse',

    description:
      "Réponses à vos questions sur les panneaux solaires à Bourg-en-Bresse : prix, rentabilité, aides, installation. FAQ par votre installateur RGE QualiPV dans l'Ain.",

    path: '/faq-panneaux-solaires',
    keywords: [
      'FAQ panneaux solaires Bourg-en-Bresse',
      'questions panneaux photovoltaïques Ain',
      'prix rentabilité panneaux solaires',
      'aides installation solaire Bourg-en-Bresse',
      'conseils installateur photovoltaïque Ain',
      'questions installateur RGE QualiPV Bourg-en-Bresse',
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
    <>
      <FAQPageContent faqs={faqs} header={header} siteSettings={siteSettings} />
      <FAQStructuredData
        faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'FAQ Panneaux Solaires', path: '/faq-panneaux-solaires' },
        ]}
      />
    </>
  );
}
