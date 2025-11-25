import { generateMetadata as generateMetadataHelper } from '@/app/_config/metadata';
import ZonesPageContent from './ZonesPageContent';
import {
  getInterventionZones,
  getPageHeader,
  getSiteSettings,
} from '@/app/_lib/payload-queries';
import { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = 60; // Revalide toutes les 60 secondes

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
  title: "Zones d'Intervention Panneaux Solaires Ain",
  description:
    "Installation panneaux solaires dans tout l'Ain (01) : Bourg-en-Bresse, Oyonnax, Bellegarde, Ambérieu, Gex, Ferney-Voltaire. ✓ Déplacement gratuit. Rayon 50 km.",
  path: '/zones-intervention',
  keywords: [
    'zone intervention panneaux solaires Ain',
    'installation solaire Bourg-en-Bresse',
    'panneaux solaires Oyonnax',
    'installation photovoltaïque Bellegarde',
    'panneaux solaires Gex',
    'installation solaire Ferney-Voltaire',
    'couverture géographique Ain 01',
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
    <ZonesPageContent
      zones={zones}
      header={header}
      siteSettings={siteSettings}
    />
  );
}
