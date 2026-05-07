import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { BreadcrumbStructuredData } from '@/components/shared/SEO/StructuredData';
import ContactPageContent from './ContactPageContent';
import { Metadata } from 'next';
import { getPageHeader, getSiteSettings } from '@/lib/payload-queries';

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Devis Gratuit Panneaux Solaires Bourg-en-Bresse',

    description:
      "Demandez votre devis panneaux solaires gratuit à Bourg-en-Bresse dans l'Ain (01). Réponse en 48h. Installateur RGE QualiPV certifié. Tél : 07 81 25 11 25.",

    path: '/contact',
    keywords: [
      'devis panneaux solaires Bourg-en-Bresse gratuit',
      'devis gratuit installation photovoltaïque Ain',
      'contact installateur RGE Bourg-en-Bresse',
      'demander devis panneaux solaires Ain',
      'estimation prix panneaux solaires Bourg-en-Bresse',
      'rendez-vous installation solaire Ain',
      'etude personnalisée panneaux solaires gratuite Ain',
    ],
  });
}

export default async function ContactPage() {
  const [header, siteSettings] = await Promise.all([
    getPageHeader('contact'),
    getSiteSettings(),
  ]);

  return (
    <>
      <ContactPageContent header={header} siteSettings={siteSettings} />
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Devis Gratuit', path: '/contact' },
        ]}
      />
    </>
  );
}
