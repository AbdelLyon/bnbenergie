import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
import { BreadcrumbStructuredData } from '@/components/shared/SEO/StructuredData';
import AidesPageContent from './AidesPageContent';
import {
  getFinancialAidsByCategory,
  getPageHeader,
  getSiteSettings,
} from '@/lib/payload-queries';
import { Metadata } from 'next';

export const revalidate = 60;

export function generateMetadata(): Metadata {
  return generateMetadataHelper({
    // Title: 56 chars (was 68 — too long)
    title: 'Aides Panneaux Solaires 2026 Ain | Prime & éco-PTZ',

    // Description: 159 chars (was 164 — too long)
    description:
      "Aides panneaux solaires 2026 dans l'Ain : prime autoconsommation (80€/kWc), TVA 5,5%, éco-PTZ, CEE. Installateur RGE QualiPV à Bourg-en-Bresse. Devis gratuit.",

    path: '/aides-financement',
    keywords: [
      'aides panneaux solaires 2026 Bourg-en-Bresse',
      'aides panneaux solaires 2026 Ain',
      'prime autoconsommation photovoltaïque 2026',
      'TVA 5,5% panneaux solaires 2026',
      'éco-prêt taux zéro solaire',
      'CEE certificats économies énergie photovoltaïque',
      'financement panneaux solaires Bourg-en-Bresse',
      'subventions photovoltaïque 2026',
      'tarif rachat surplus EDF OA 2026',
    ],
  });
}

export default async function AidesFinancementPage() {
  const [aids, header, siteSettings] = await Promise.all([
    getFinancialAidsByCategory(),
    getPageHeader('aides'),
    getSiteSettings(),
  ]);

  return (
    <>
      <AidesPageContent aids={aids} header={header} siteSettings={siteSettings} />
      <BreadcrumbStructuredData items={[
        { name: 'Accueil', path: '/' },
        { name: 'Aides & Financement', path: '/aides-financement' },
      ]} />
    </>
  );
}
