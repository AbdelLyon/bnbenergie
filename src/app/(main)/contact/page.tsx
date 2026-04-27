import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import ContactPageContent from './ContactPageContent';
import { Metadata } from 'next';
import { getPageHeader, getSiteSettings } from '@/lib/payload-queries';

// ISR - Incremental Static Regeneration
export const revalidate = 60; // MEDIUM_FREQUENCY

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Devis Gratuit Panneaux Solaires Bourg-en-Bresse | Réponse 48h',
    description:
      'Demandez votre devis panneaux solaires gratuit à Bourg-en-Bresse. Réponse en 48h. Installateur RGE QualiPV certifié dans l\'Ain. Tél : 07 81 25 11 25.',
    path: '/contact',
    keywords: [
      'devis panneaux solaires Bourg-en-Bresse gratuit',
      'devis gratuit installation photovoltaïque Ain',
      'contact installateur RGE Bourg-en-Bresse',
      'demander devis panneaux solaires Ain',
      'estimation prix panneaux solaires Bourg-en-Bresse',
      'rendez-vous installation solaire Ain',
    ],
  });
}

export default async function ContactPage() {
  const [header, siteSettings] = await Promise.all([
    getPageHeader('contact'),
    getSiteSettings(),
  ]);

  return <ContactPageContent header={header} siteSettings={siteSettings} />;
}
