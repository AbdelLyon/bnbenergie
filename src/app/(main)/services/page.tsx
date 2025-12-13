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

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
    title: 'Services Installation Solaire Clé en Main Ain (01)',
    description:
      'Installation panneaux solaires clé en main Ain : étude gratuite, pose RGE, démarches, Consuel et Enedis. Garantie décennale. Devis 48h.',
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
