import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import ServicesPageContent from './ServicesPageContent';
import { ServiceStructuredData } from '@/components/shared/SEO/StructuredData';
import {
  getServices,
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';
import { Metadata } from 'next';

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Installation Panneaux Solaires Clé en Main Bourg-en-Bresse',
    description:
      'Installateur panneaux photovoltaïques certifié RGE à Bourg-en-Bresse : étude gratuite, pose, démarches Enedis & Consuel. Garantie décennale. Devis 48h.',
    path: '/services',
    keywords: [
      'installateur panneaux solaires Bourg-en-Bresse',
      'installation panneaux photovoltaïques clé en main Bourg-en-Bresse',
      'étude gratuite panneaux solaires Ain',
      'installation RGE QualiPV Bourg-en-Bresse',
      'raccordement Enedis panneaux solaires Ain',
      'Consuel photovoltaïque Ain',
      'démarches administratives panneaux solaires',
      'garantie décennale installation solaire Ain',
      'service clé en main photovoltaïque Bourg-en-Bresse',
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
