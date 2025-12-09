import { getPricingPacks } from '@/lib/payload-queries';
import { PricingClient } from './PricingClient';

export async function Pricing() {
  const packsList = await getPricingPacks();

  const packs = packsList.map((pack: any) => ({
    name: pack.name,
    panels: pack.panels,
    price: pack.price,
    originalPrice: pack.originalPrice,
    features: pack.features.map((f: any) => f.feature),
    popular: pack.popular,
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
