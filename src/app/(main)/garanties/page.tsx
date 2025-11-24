import { generateMetadata } from '@/app/_config/metadata';
import GarantiesPageContent from './GarantiesPageContent';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = generateMetadata({
  title: 'Garanties RGE QualiPV & Certifications Ain',
  description:
    'Garantie décennale, assurance RC, certification RGE QualiPV. ✓ Garanties constructeur 25 ans. ✓ SAV réactif. Installateur certifié panneaux solaires Ain.',
  path: '/garanties',
  keywords: [
    'garantie décennale panneaux solaires',
    'assurance installation photovoltaïque',
    'certification RGE QualiPV',
    'garantie constructeur panneaux solaires',
    'SAV panneaux solaires Ain',
    'garanties installation solaire',
    'entreprise certifiée RGE Ain',
  ],
});

export default function GarantiesPage() {
  return <GarantiesPageContent />;
}
