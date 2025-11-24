import { generateMetadata } from '@/app/_config/metadata';
import AidesPageContent from './AidesPageContent';
import {
  getFinancialAidsByCategory,
  getPageHeader,
  getSiteSettings,
} from '@/app/_lib/payload-queries';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = generateMetadata({
  title: 'Aides & Financement Panneaux Solaires 2025 Ain',
  description:
    'Prime autoconsommation, MaPrimeRénov, CEE, TVA réduite 10%, éco-PTZ. ✓ Aides panneaux solaires 2025. ✓ Accompagnement démarches. Financement Ain (01).',
  path: '/aides-financement',
  keywords: [
    'aides panneaux solaires 2025',
    'prime autoconsommation',
    'MaPrimeRénov panneaux solaires',
    'CEE certificats économies énergie',
    'TVA réduite panneaux solaires',
    'éco-prêt taux zéro solaire',
    'financement panneaux solaires Ain',
    'subventions photovoltaïque 2025',
  ],
});

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
