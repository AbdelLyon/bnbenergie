import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { BreadcrumbStructuredData } from '@/components/shared/SEO/StructuredData';
import GarantiesPageContent from './GarantiesPageContent';
import {
  getWarrantiesByCategory,
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';
import { Metadata } from 'next';

export const revalidate = 60

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    // Title: 57 chars — OK (unchanged)
    title: 'Garanties & Certifications RGE QualiPV | BNB ÉNERGIE Ain',

    // Description: 158 chars (was 165 — too long)
    description:
      "Garantie décennale, RC pro, certification RGE QualiPV et garantie constructeur 25 ans. SAV réactif. Installateur certifié panneaux solaires Bourg-en-Bresse, Ain.",

    path: '/garanties',
    keywords: [
      'garantie décennale panneaux solaires Bourg-en-Bresse',
      'certification RGE QualiPV installateur Ain',
      'assurance installation photovoltaïque Bourg-en-Bresse',
      'garantie constructeur panneaux 25 ans',
      'SAV panneaux solaires Bourg-en-Bresse',
      'entreprise certifiée RGE Ain',
      'installateur panneaux solaires certifié Bourg-en-Bresse',
    ],
  });
}

export default async function GarantiesPage() {
  const [warranties, header, siteSettings] = await Promise.all([
    getWarrantiesByCategory(),
    getPageHeader('garanties'),
    getSiteSettings(),
  ]);

  return (
    <>
      <GarantiesPageContent
        warranties={warranties}
        header={header}
        siteSettings={siteSettings}
      />
      <BreadcrumbStructuredData items={[
        { name: 'Accueil', path: '/' },
        { name: 'Garanties & Certifications', path: '/garanties' },
      ]} />
    </>
  );
}
