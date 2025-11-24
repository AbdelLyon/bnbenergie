import { generateMetadata } from '@/app/_config/metadata';
import RealisationsPageContent from './RealisationsPageContent';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = generateMetadata({
  title: 'Réalisations Panneaux Solaires Ain (01)',
  description:
    "Découvrez nos installations de panneaux solaires dans l'Ain : Bourg-en-Bresse, Oyonnax, Bellegarde. Projets 3 à 9 kWc. ✓ Entreprise RGE QualiPV certifiée.",
  path: '/realisations',
  keywords: [
    'réalisations panneaux solaires Ain',
    'installations photovoltaïques Bourg-en-Bresse',
    'projets solaires Oyonnax',
    'panneaux solaires réalisés Ain',
    'photos installation solaire',
    'entreprise RGE réalisations',
    'portfolio panneaux solaires',
    'installations photovoltaïques Ain 01',
  ],
});

export default function RealisationsPage() {
  return <RealisationsPageContent />;
}
