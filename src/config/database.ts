/**
 * Configuration de la base de données et du pool de connexions
 */

/**
 * Configuration du pool de connexions PostgreSQL
 */
export const DATABASE_POOL_CONFIG = {
  /** Nombre maximum de connexions dans le pool */
  max: 20,

  /** Temps d'inactivité avant fermeture d'une connexion (ms) */
  idleTimeoutMillis: 30000,

  /** Timeout pour l'acquisition d'une connexion (ms) */
  connectionTimeoutMillis: 10000,

  /** Temps avant tentative de reconnexion (ms) */
  reconnectIntervalMillis: 1000,

  /** Nombre maximum de tentatives de reconnexion */
  maxReconnectAttempts: 10,
} as const;

/**
 * Limites de requêtes pour éviter les surcharges
 */
export const QUERY_LIMITS = {
  /** Limite par défaut pour les collections */
  DEFAULT: 100,

  /** Limite pour les grandes collections */
  LARGE: 500,

  /** Limite pour les petites collections */
  SMALL: 50,

  /** Limite pour les requêtes paginées */
  PAGINATED: 20,
} as const;

/**
 * Configuration du logging des requêtes
 */
export const QUERY_LOGGING = {
  /** Activer le logging en développement */
  enableInDevelopment: true,

  /** Seuil de temps pour logger les requêtes lentes (ms) */
  slowQueryThreshold: 1000,

  /** Logger toutes les requêtes */
  logAllQueries: false,
} as const;

/**
 * Limite par défaut des requêtes
 * Export séparé pour compatibilité
 */
export const DEFAULT_QUERY_LIMIT = QUERY_LIMITS.DEFAULT;
