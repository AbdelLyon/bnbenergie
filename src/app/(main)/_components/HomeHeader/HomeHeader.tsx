import { getPageHeader, getStats } from '@/lib/payload-queries';
import { HomeHeaderClient } from './HomeHeaderClient';
import type { Media } from '@/payload-types';

// Images de fallback si Payload n'a pas d'images configurées
const fallbackHeroImages = [
  'https://images.unsplash.com/photo-1463173904305-ba479d2123b7?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1634412115855-46264464c6b0?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1491677533189-49af044391ed?q=80&w=2070&auto=format&fit=crop',
];

const fallbackHeroImageAlts = [
  'Installation panneaux solaires photovoltaïques toiture maison Bourg-en-Bresse Ain - Entreprise RGE QualiPV BNB ÉNERGIE',
  'Panneaux solaires modernes installation professionnelle - BNB ÉNERGIE expert photovoltaïque Ain 01',
  'Pose panneaux solaires résidentiels autoconsommation Ain 01 - Installateur certifié professionnel garantie décennale',
  'Panneaux photovoltaïques installation professionnelle Bourg-en-Bresse - Devis gratuit entreprise RGE 48h',
];

export async function HomeHeader() {
  const header = await getPageHeader('home');
  const stats = await getStats();

  // Utiliser les images de Payload si disponibles, sinon fallback
  let heroImages: string[] = fallbackHeroImages;
  let heroImageAlts: string[] = fallbackHeroImageAlts;

  if (header?.heroImages && header.heroImages.length > 0) {
    heroImages = header.heroImages
      .map((item) => {
        const media = item.image as Media;
        return media?.url || null;
      })
      .filter((url): url is string => url !== null);

    heroImageAlts = header.heroImages.map((item) => item.alt || '');

    // Si pas assez d'images dans Payload, utiliser les fallbacks
    if (heroImages.length === 0) {
      heroImages = fallbackHeroImages;
      heroImageAlts = fallbackHeroImageAlts;
    }
  }

  const data = {
    heroImages,
    heroImageAlts,
    chip: header?.badge || 'Certifié RGE QualiPV',
    title: header?.title ? header.title.split(' ') : ['BNB ', 'ÉNERGIE'],
    subtitle:
      header?.subtitle || "Expert Photovoltaïque dans l'Ain (01) - BNB ÉNERGIE",
    description:
      header?.description ||
      'Solutions solaires pour réduire vos factures, valoriser votre bien et contribuer à un avenir durable.',
    cta1: 'Devis Gratuit',
    cta2: 'Nous Appeler',
    cta2_href: 'tel:0781251125',
    stats: stats,
  };

  return <HomeHeaderClient data={data} />;
}
