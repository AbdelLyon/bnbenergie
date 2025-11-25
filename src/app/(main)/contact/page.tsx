import { generateMetadata as generateMetadataHelper } from '@/app/_config/metadata';
import ContactPageContent from './ContactPageContent';
import { Metadata } from 'next';
import { getPageHeader, getSiteSettings } from '@/app/_lib/payload-queries';

export const dynamic = 'force-static';
export const revalidate = 60; // Revalide toutes les 60 secondes

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
  title: 'Contact - Devis Gratuit Panneaux Solaires',
  description:
    'Contactez BNB ÉNERGIE pour un devis gratuit sous 48h. Installation panneaux solaires RGE QualiPV à Bourg-en-Bresse. Tél : 07 81 25 11 25. ✓ Réponse rapide garantie.',
  path: '/contact',
  keywords: [
    'devis panneaux solaires gratuit',
    'contact installation solaire',
    'devis gratuit photovoltaïque',
    'demande devis panneaux solaires',
    'contact BNB ÉNERGIE',
    'installateur panneaux solaires Ain',
    'devis installation solaire Bourg-en-Bresse',
    'estimation prix panneaux solaires',
    'rendez-vous installation solaire',
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
