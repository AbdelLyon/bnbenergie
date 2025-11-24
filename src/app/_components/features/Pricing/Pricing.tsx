import { getPricingPacks } from '@/app/_lib/payload';
import pricingData from '@/data/pricingData.json';
import { PricingClient } from './PricingClient';

export async function Pricing() {
  try {
    const response = await getPricingPacks();

    // Si Payload est vide, utiliser le fallback JSON
    if (!response.docs || response.docs.length === 0) {
      console.log('Payload is empty, using JSON fallback');
      return <PricingClient data={pricingData} />;
    }

    const packs = response.docs.map((pack: any) => ({
      name: pack.name,
      panels: pack.panels,
      price: pack.price,
      originalPrice: pack.originalPrice,
      features: pack.features.map((f: any) => f.feature),
      popular: pack.popular,
      cta: pack.cta,
    }));

    const data = {
      header: pricingData.header,
      packs,
      footer: pricingData.footer,
    };

    return <PricingClient data={data} />;
  } catch (error) {
    console.error('Payload error, using JSON fallback:', error);
    return <PricingClient data={pricingData} />;
  }
}
