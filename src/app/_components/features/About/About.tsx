import {
  getAboutCards,
  getStats,
  getBenefits,
} from '@/app/_lib/payload-queries';
import { AboutClient } from './AboutClient';

export async function About() {
  const [cards, stats, benefits] = await Promise.all([
    getAboutCards(),
    getStats(),
    getBenefits(),
  ]);

  const data = {
    header: {
      badge: 'QUI SOMMES-NOUS',
      title: 'Votre Partenaire Solaire de Confiance',
      subtitle: "Une expertise locale reconnue dans tout l'Ain",
      description:
        'BNB ÉNERGIE est votre expert local en solutions photovoltaïques. Basés à Bourg-en-Bresse, nous accompagnons les particuliers et professionnels dans leur transition énergétique avec des installations sur-mesure, performantes et durables.',
      image:
        'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2070&auto=format&fit=crop',
    },
    stats: stats.map((stat) => ({
      value: stat.number,
      label: stat.label,
      icon: stat.icon,
    })),
    cards: cards.map((card) => ({
      title: card.title,
      description: card.content,
      icon: card.icon,
      stat: card.stat || '',
      statLabel: card.statLabel || '',
      gradient: card.gradient || '',
    })),
    benefits: {
      title: 'Nos Avantages',
      list: benefits.map((b) => b.text),
    },
    cta: {
      title: 'Prêt à passer au solaire ?',
      description: 'Demandez votre étude personnalisée gratuite',
      button1: 'Demandez votre devis',
      button2: 'En savoir plus',
    },
    seoContent: cards.map((card) => ({
      title: card.title,
      content: card.content,
      icon: card.icon,
      stat: card.stat || '',
      statLabel: card.statLabel || '',
      gradient: card.gradient || '',
    })),
  };

  return <AboutClient data={data} />;
}
