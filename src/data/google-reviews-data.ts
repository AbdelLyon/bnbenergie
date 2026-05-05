export interface Review {
  id: string;
  author: string;
  location?: string;
  rating: 5 | 4 | 3 | 2 | 1;
  date: string;
  text: string;
  project?: string;
  verified?: boolean;
}

export const GOOGLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Wissem Landoulsi',
    rating: 5,
    date: '2025-10-15',
    text: `Je suis très satisfait(e) du service proposé par BNB ÉNERGIE.
L’équipe a été professionnelle du début à la fin : explications claires, accompagnement dans les démarches administratives et installation rapide et soignée.

Les techniciens ont pris le temps de tout vérifier et de répondre à mes questions. Depuis la mise en service, mes panneaux fonctionnent parfaitement et je constate déjà une belle réduction sur ma facture d’électricité.

Je recommande vivement BNB ÉNERGIE à toute personne souhaitant passer à l’énergie solaire en toute sérénité.`,
    verified: true,
  },
  {
    id: '2',
    author: 'hafid atafi',
    rating: 5,
    date: '2026-01-10',
    text: `Excellente expérience ! Un service très professionnel, une équipe à l’écoute et un travail de grande qualité. Je recommande sans hésiter. Merci encore !`,
    verified: true,
  },
  {
    id: '3',
    author: 'M2F',
    rating: 5,
    date: '2025-10-05',
    text: `Entreprise au top qui vous accompagne tout au long de votre projet avec un très grand professionnalisme.
Un grand merci à Nabil pour sa disponibilité et sa gentillesse. Merci également au poseur.`,
    verified: true,
  },
  {
    id: '4',
    author: 'Ibrahim Bolat',
    rating: 5,
    date: '2025-05-20',
    text: `Merci à BNB ÉNERGIE pour son professionnalisme et la sympathie de leur technicien, qui sont à l’écoute.
Rien à dire au niveau des prix, je conseille les yeux fermés.`,
    verified: true,
  },
  {
    id: '5',
    author: 'Maximus titus',
    rating: 5,
    date: '2025-10-12',
    text: `Merci les gars pour votre boulot très soigné, très propre, impeccable. Tout est fonctionnel.
Vous êtes de vraies personnes comme on en voit plus… à l’écoute du client et ça c’est rare.
Merci beaucoup, ma femme est très contente.`,
    verified: true,
  },
  {
    id: '6',
    author: 'Marius Peyrot',
    rating: 5,
    date: '2025-08-10',
    text: `Merci à Nabil et à son équipe ! Je suis très satisfait du service proposé car au-delà de l’installation qui fonctionne parfaitement, j’ai bénéficié d’un véritable accompagnement tout au long du projet. Je recommande !`,
    verified: true,
  },
  {
    id: '7',
    author: 'yahya bensmara',
    rating: 5,
    date: '2025-10-08',
    text: `Compétent, efficace, équipe avec un bon relationnel et un bon accompagnement.
Installation bien réalisée, très satisfaite du résultat.
Je recommande BNB ÉNERGIE ⚡️`,
    verified: true,
  },
  {
    id: '8',
    author: 'Rachid El ghaffouli',
    rating: 5,
    date: '2026-01-05',
    text: `Super expérience, technicien très professionnel et à l’écoute. Je recommande.`,
    verified: true,
  },
  {
    id: '9',
    author: 'Zenio Oublie',
    rating: 5,
    date: '2025-10-06',
    text: `Franchement très satisfait du travail professionnel fourni par l’équipe et du résultat sur ma consommation. Un grand merci.`,
    verified: true,
  },
  {
    id: '10',
    author: 'dib faiçal',
    rating: 5,
    date: '2026-01-08',
    text: `Magnifique. Très professionnel, je recommande fortement.`,
    verified: true,
  },
  {
    id: '11',
    author: 'Omayma Majdoub',
    rating: 5,
    date: '2025-04-15',
    text: `Équipe chaleureuse, bon relationnel et bon accompagnement.
Pose de panneaux 6 kWc bien installée, très satisfaite du résultat.`,
    project: '6 kWc',
    verified: true,
  },
  {
    id: '12',
    author: 'Fadoua Laroubi',
    rating: 5,
    date: '2025-10-01',
    text: `Très bonne expérience avec BNB ÉNERGIE. Installation réalisée en octobre, équipe professionnelle et sérieuse.`,
    verified: true,
  },
];

export const REVIEWS_STATS = {
  average: 5.0,
  total: GOOGLE_REVIEWS.length,
  distribution: {
    5: GOOGLE_REVIEWS.filter((r) => r.rating === 5).length,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
};

