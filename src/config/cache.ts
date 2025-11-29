/**
 * Configuration centralisée du cache et de la revalidation
 * Utilisez ces constantes au lieu de valeurs hardcodées
 */

/**
 * Intervalles de revalidation ISR en secondes
 */
export const REVALIDATION_INTERVALS = {
  /** Pages à forte fréquence de mise à jour (homepage, pricing) */
  HIGH_FREQUENCY: 30,

  /** Pages standard avec mises à jour régulières */
  MEDIUM_FREQUENCY: 60,

  /** Pages statiques avec mises à jour occasionnelles (FAQ, garanties) */
  LOW_FREQUENCY: 300,

  /** Contenu rarement modifié */
  DAILY: 86400,

  /** Contenu très rarement modifié */
  WEEKLY: 604800,
} as const;

/**
 * Tags de cache pour la revalidation ciblée
 * Utilisez ces tags pour invalider sélectivement le cache
 */
export const CACHE_TAGS = {
  STATS: 'stats',
  PRICING: 'pricing-packs',
  PROJECTS: 'projects',
  BENEFITS: 'benefits',
  ABOUT_CARDS: 'about-cards',
  SERVICES: 'services',
  WARRANTIES: 'warranties',
  FINANCIAL_AIDS: 'financial-aids',
  INTERVENTION_ZONES: 'intervention-zones',
  FAQS: 'faqs',
  PAGE_HEADERS: 'page-headers',
  SITE_SETTINGS: 'site-settings',
  NAVIGATION: 'navigation',
} as const;

/**
 * Durées de cache pour les en-têtes HTTP
 */
export const CACHE_CONTROL = {
  /** Assets statiques (immuables) */
  STATIC_ASSETS: 'public, max-age=31536000, immutable',

  /** Images et médias */
  MEDIA: 'public, max-age=86400, stale-while-revalidate=604800',

  /** Pages HTML */
  HTML: 'public, max-age=0, must-revalidate',

  /** API endpoints avec cache court */
  API_SHORT: 'public, max-age=60, stale-while-revalidate=120',

  /** API endpoints avec cache moyen */
  API_MEDIUM: 'public, max-age=300, stale-while-revalidate=600',

  /** Pas de cache */
  NO_CACHE: 'no-store, no-cache, must-revalidate',
} as const;

/**
 * Configuration du timeout pour les opérations de revalidation
 */
export const REVALIDATION_TIMEOUT = 5000; // 5 secondes

/**
 * Limite de requêtes pour la pagination par défaut
 */
export const DEFAULT_QUERY_LIMIT = 100;

/**
 * Configuration React Query (client-side caching)
 */
export const REACT_QUERY_CONFIG = {
  /** Temps avant qu'une donnée soit considérée comme obsolète */
  STALE_TIME: 60 * 1000, // 1 minute

  /** Temps avant le garbage collection des données */
  GC_TIME: 5 * 60 * 1000, // 5 minutes

  /** Nombre de tentatives en cas d'échec */
  RETRY_COUNT: 3,

  /** Délai entre les tentatives (exponentiel) */
  RETRY_DELAY: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
} as const;

/**
 * Type helper pour les intervalles de revalidation
 */
export type RevalidationInterval =
  (typeof REVALIDATION_INTERVALS)[keyof typeof REVALIDATION_INTERVALS];

/**
 * Type helper pour les tags de cache
 */
export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];
