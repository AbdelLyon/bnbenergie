import { generateMetadata } from '@/app/_config/metadata';
import ZonesPageContent from './ZonesPageContent';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = generateMetadata({
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

export default function ZonesInterventionPage() {
  return <ZonesPageContent />;
}
