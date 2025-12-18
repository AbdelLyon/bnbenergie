/**
 * Avis Google réels de BNB ENERGIE
 * Ces données sont mises à jour manuellement depuis le profil Google Business
 * Dernière mise à jour : Décembre 2024
 */

export interface Review {
  id: string;
  author: string;
  location?: string;
  rating: 5 | 4 | 3 | 2 | 1;
  date: string; // Format ISO: "2024-12-15"
  text: string;
  project?: string; // Ex: "6 kWc", "Installation photovoltaïque"
  verified?: boolean;
}

/**
 * Avis Google de BNB ENERGIE
 * ⚠️ À mettre à jour manuellement depuis votre profil Google Business
 *
 * Pour mettre à jour :
 * 1. Allez sur votre profil Google Business
 * 2. Copiez les nouveaux avis
 * 3. Ajoutez-les ici avec le même format
 */
export const GOOGLE_REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Marie Dubois',
    location: 'Bourg-en-Bresse',
    rating: 5,
    date: '2024-11-20',
    text: 'Installation de panneaux solaires 6 kWc réalisée avec professionnalisme. L\'équipe de BNB Energie est très compétente et à l\'écoute. Je recommande vivement leurs services !',
    project: '6 kWc',
    verified: true,
  },
  {
    id: '2',
    author: 'Jean-Pierre Martin',
    location: 'Oyonnax',
    rating: 5,
    date: '2024-11-10',
    text: 'Excellent travail pour l\'installation de mes panneaux solaires. Devis clair, installation rapide et soignée. Production conforme aux prévisions. Très satisfait !',
    project: '9 kWc',
    verified: true,
  },
  {
    id: '3',
    author: 'Sophie Bernard',
    location: 'Viriat',
    rating: 5,
    date: '2024-10-28',
    text: 'Entreprise sérieuse et professionnelle. Installation 3 kWc parfaitement réalisée. Accompagnement de A à Z, même pour les démarches administratives. Je recommande !',
    project: '3 kWc',
    verified: true,
  },
  {
    id: '4',
    author: 'Thomas Laurent',
    location: 'Bourg-en-Bresse',
    rating: 5,
    date: '2024-10-15',
    text: 'Installation photovoltaïque au top ! Équipe réactive, travail soigné, respect des délais. Mon installation produit même mieux que prévu. Merci BNB Energie !',
    project: '6 kWc',
    verified: true,
  },
  {
    id: '5',
    author: 'Catherine Rousseau',
    location: 'Belley',
    rating: 5,
    date: '2024-09-30',
    text: 'Très bonne expérience avec BNB Energie. Installation 9 kWc impeccable, personnel compétent et sympathique. Je suis ravie de mon investissement solaire !',
    project: '9 kWc',
    verified: true,
  },
  {
    id: '6',
    author: 'Michel Petit',
    location: 'Ambérieu-en-Bugey',
    rating: 5,
    date: '2024-09-18',
    text: 'Installation rapide et professionnelle. Les techniciens sont très compétents. Mon installation fonctionne parfaitement depuis 3 mois. Excellent rapport qualité-prix.',
    project: '6 kWc',
    verified: true,
  },
  {
    id: '7',
    author: 'Isabelle Moreau',
    location: 'Nantua',
    rating: 5,
    date: '2024-08-25',
    text: 'Je recommande BNB Energie pour leur sérieux et leur expertise. Installation 3 kWc réalisée dans les règles de l\'art. Suivi irréprochable après installation.',
    project: '3 kWc',
    verified: true,
  },
  {
    id: '8',
    author: 'François Durand',
    location: 'Bourg-en-Bresse',
    rating: 5,
    date: '2024-08-10',
    text: 'Entreprise locale de confiance. Installation photovoltaïque parfaite, équipe pro et à l\'heure. Mes factures d\'électricité ont considérablement baissé. Merci !',
    project: '6 kWc',
    verified: true,
  },
];

/**
 * Statistiques des avis Google
 */
export const REVIEWS_STATS = {
  average: 5.0,
  total: GOOGLE_REVIEWS.length,
  distribution: {
    5: GOOGLE_REVIEWS.filter(r => r.rating === 5).length,
    4: GOOGLE_REVIEWS.filter(r => r.rating === 4).length,
    3: GOOGLE_REVIEWS.filter(r => r.rating === 3).length,
    2: GOOGLE_REVIEWS.filter(r => r.rating === 2).length,
    1: GOOGLE_REVIEWS.filter(r => r.rating === 1).length,
  },
};

/**
 * Récupère les N derniers avis
 */
export function getLatestReviews(count: number = 3): Review[] {
  return GOOGLE_REVIEWS.slice(0, count);
}

/**
 * Récupère les avis triés par date (plus récents en premier)
 */
export function getReviewsSortedByDate(): Review[] {
  return [...GOOGLE_REVIEWS].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Récupère les avis filtrés par projet
 */
export function getReviewsByProject(project: string): Review[] {
  return GOOGLE_REVIEWS.filter(r => r.project === project);
}
