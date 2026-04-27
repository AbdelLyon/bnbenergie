import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import RealisationsPageContent from './RealisationsPageContent';
import {
  getProjects,
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';
import { Metadata } from 'next';

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    title: 'Réalisations Panneaux Solaires Ain | Photos Installations',
    description:
      "Découvrez nos installations panneaux solaires dans l'Ain : Bourg-en-Bresse, Oyonnax, Bellegarde. Projets 3-9 kWc. Installateur RGE QualiPV certifié.",
    path: '/realisations',
    keywords: [
      'réalisations panneaux solaires Bourg-en-Bresse',
      'installations photovoltaïques Ain 01',
      'projets solaires Oyonnax Ain',
      'photos installation solaire Bourg-en-Bresse',
      'portfolio installateur RGE QualiPV Ain',
      'références panneaux solaires installés Ain',
      'installateur panneaux solaires Bourg-en-Bresse',
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
