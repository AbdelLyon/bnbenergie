import { generateMetadata as generateMetadataHelper } from '@/config/metadata';
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
    title: 'Aides Panneaux Solaires 2025 Ain | MaPrimeRénov & CEE',
    description:
      "Toutes les aides pour vos panneaux solaires 2025 dans l'Ain : prime autoconsommation, MaPrimeRénov, CEE, TVA 10%, éco-PTZ. Accompagnement démarches offert à Bourg-en-Bresse.",
    path: '/aides-financement',
    keywords: [
      'aides panneaux solaires 2025 Bourg-en-Bresse',
      'aides panneaux solaires 2025 Ain',
      'prime autoconsommation photovoltaïque',
      'MaPrimeRénov panneaux solaires Ain',
      'CEE certificats économies énergie photovoltaïque',
      'TVA réduite panneaux solaires 10%',
      'éco-prêt taux zéro solaire',
      'financement panneaux solaires Bourg-en-Bresse',
      'subventions photovoltaïque 2025',
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
    <AidesPageContent aids={aids} header={header} siteSettings={siteSettings} />
  );
}
