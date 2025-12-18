import { getPricingPacks } from '@/lib/payload-queries';
import { PricingClient } from './PricingClient';
import type { PricingPack } from '@/payload-types';

export async function Pricing() {
  const packsList = await getPricingPacks();

  const packs = packsList.map((pack: PricingPack) => ({
    name: pack.name,
    panels: pack.panels,
    price: pack.price,
    originalPrice: pack.originalPrice ?? undefined,
    features: pack.features.map((f) => f.feature),
    popular: pack.popular ?? undefined,
    cta: pack.cta,
  }));

  const data = {
    header: {
      badge: 'NOS OFFRES',
      title: 'Des solutions adaptées à vos besoins',
      subtitle:
        'Choisissez le pack qui correspond le mieux à votre consommation et à votre budget.',
    },
    packs,
    footer: {
      note: '* Prix indicatifs TTC, sous réserve de visite technique.',
      tags: ['Garantie 25 ans', 'Installation incluse', 'Démarches incluses'],
    },
  };

  return <PricingClient data={data} />;
}
