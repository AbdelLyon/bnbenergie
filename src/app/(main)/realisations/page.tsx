import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { BreadcrumbStructuredData } from '@/components/shared/SEO/StructuredData';
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
    title: "Réalisations Panneaux Solaires dans l'Ain",

    description:
      "Découvrez nos installations panneaux solaires dans l'Ain : Bourg-en-Bresse, Oyonnax, Bellegarde. Projets 3-9 kWc par BNB Énergie, installateur RGE QualiPV.",

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
    <>
      <RealisationsPageContent
        projects={projects}
        header={header}
        siteSettings={siteSettings}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', path: '/' },
          { name: 'Nos Réalisations', path: '/realisations' },
        ]}
      />
    </>
  );
}
