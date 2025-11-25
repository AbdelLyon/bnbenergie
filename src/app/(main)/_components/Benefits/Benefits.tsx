import { getBenefits } from '@/lib/payload-queries';
import { BenefitsClient } from './BenefitsClient';

export async function Benefits() {
  const benefitsList = await getBenefits();

  const data = {
    benefits: {
      title: 'Pourquoi nous choisir ?',
      list: benefitsList.map((b) => b.text),
    },
    cta: {
      title: 'Prêt à passer au solaire ?',
      description:
        'Demandez votre devis gratuit et personnalisé. Réponse sous 48h.',
      button1: 'Demander un devis',
      button2: 'Nous contacter',
    },
  };

  return <BenefitsClient data={data} />;
}
