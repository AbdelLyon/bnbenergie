import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { BreadcrumbStructuredData } from '@/components/shared/SEO/StructuredData';
import ZonesPageContent from './ZonesPageContent';
import {
  getInterventionZones,
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';
import { Metadata } from 'next';

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Zones Intervention Solaire Ain (01) | Rayon 50 km',

    description:
      "Installateur panneaux solaires dans l'Ain (01) : Bourg-en-Bresse, Oyonnax, Bellegarde, Gex, Ferney-Voltaire. Déplacement gratuit. Certifié RGE QualiPV.",

    path: '/zones-intervention',
    keywords: [
      'zone intervention installateur solaire Ain',
      'installateur panneaux solaires Oyonnax',
      'installation photovoltaïque Bellegarde Ain',
      'panneaux solaires Gex Ain',
      'installateur panneaux solaires Ain 01',
      'couverture géographique installateur Ain 01',
      'déplacement gratuit installation solaire Ain',
      'rayon intervention 50km Bourg-en-Bresse',
    ],
  });
}

export default async function ZonesInterventionPage() {
  const [zones, header, siteSettings] = await Promise.all([
    getInterventionZones(),
    getPageHeader('zones'),
    getSiteSettings(),
  ]);

  return (
    <>
      <ZonesPageContent
        zones={zones}
        header={header}
        siteSettings={siteSettings}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', path: '/' },
          { name: "Zones d'Intervention", path: '/zones-intervention' },
        ]}
      />
    </>
  );
}
