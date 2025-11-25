import { generateMetadata as generateMetadataHelper } from '@/app/_config/metadata';
import ServicesPageContent from './ServicesPageContent';
import { ServiceStructuredData } from '../../_components/features/SEO/StructuredData';
import {
  getServices,
  getPageHeader,
  getSiteSettings,
} from '@/app/_lib/payload-queries';
import { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = 60; // Revalide toutes les 60 secondes

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Services Installation Solaire Clé en Main Ain (01)',
    description:
      "Installation de panneaux solaires en 5 étapes dans l'Ain : étude gratuite, démarches administratives, pose RGE, Consuel et Enedis. ✓ Garantie décennale. Devis sous 48h.",
    path: '/services',
    keywords: [
      'installation panneaux solaires',
      'processus installation solaire',
      'étude gratuite panneaux solaires',
      'installation RGE QualiPV',
      'raccordement Enedis',
      'Consuel photovoltaïque',
      'démarches administratives panneaux solaires',
      'installation solaire Bourg-en-Bresse',
      'entreprise RGE Ain',
      'service clé en main photovoltaïque',
    ],
  });
}

export default async function ServicesPage() {
  const [services, header, siteSettings] = await Promise.all([
    getServices(),
    getPageHeader('services'),
    getSiteSettings(),
  ]);

  return (
    <>
      <ServicesPageContent
        services={services}
        header={header}
        siteSettings={siteSettings}
      />
      <ServiceStructuredData />
    </>
  );
}
