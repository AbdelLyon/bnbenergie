import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import RealisationsPageContent from './RealisationsPageContent';
import {
  getProjects,
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';
import { Metadata } from 'next';

// ISR - Incremental Static Regeneration
export const revalidate = 60; // MEDIUM_FREQUENCY

export async function generateMetadata(): Promise<Metadata> {
  return generateMetadataHelper({
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
}

export default async function RealisationsPage() {
  const [projects, header, siteSettings] = await Promise.all([
    getProjects(),
    getPageHeader('realisations'),
    getSiteSettings(),
  ]);

  return (
    <RealisationsPageContent
      projects={projects}
      header={header}
      siteSettings={siteSettings}
    />
  );
}
