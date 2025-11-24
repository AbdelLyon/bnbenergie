import { generateMetadata } from '@/app/_config/metadata';
import AidesPageContent from './AidesPageContent';

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

export default function AidesFinancementPage() {
  return <AidesPageContent />;
}
