import { generateMetadata } from '@/app/_config/metadata';
import { Metadata } from 'next';
import FAQPageContent from './FAQPageContent';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = generateMetadata({
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

export default function FAQPage() {
  return <FAQPageContent />;
}
