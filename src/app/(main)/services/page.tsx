import { generateMetadata } from '@/app/_config/metadata';
import ServicesPageContent from './ServicesPageContent';
import { ServiceStructuredData } from '../../_components/features/SEO/StructuredData';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata = generateMetadata({
  title: 'Services Installation Solaire Clé en Main Ain (01)',
  description:
    "Installation de panneaux solaires en 5 étapes dans l'Ain : étude gratuite, démarches administratives, pose RGE, Consuel et Enedis. ✓ Garantie décennale. Devis sous 48h.",
  path: '/services',
  keywords: [
    'installation panneaux solaires',
    'processus installation solaire',
    'étude gratuite panneaux solaires',
    'installation RGE QualiPV',
    'raccordement Enedis',
    'Consuel photovoltaïque',
    'démarches administratives panneaux solaires',
    'installation solaire Bourg-en-Bresse',
    'entreprise RGE Ain',
    'service clé en main photovoltaïque',
  ],
});

export default function ServicesPage() {
  return (
    <>
      <ServicesPageContent />
      <ServiceStructuredData />
    </>
  );
}
