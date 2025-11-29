/**
 * Système de rate limiting en mémoire
 * Pour une solution production plus robuste, utiliser Upstash Redis
 *
 * @example
 * import { rateLimit } from '@/lib/rate-limit';
 *
 * const identifier = request.ip || 'anonymous';
 * const { success, remaining, reset } = await rateLimit.check(identifier, 'api');
 *
 * if (!success) {
 *   return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
 * }
 */

export interface RateLimitConfig {
  /** Nombre maximum de requêtes */
  limit: number;
  /** Fenêtre de temps en millisecondes */
  window: number;
}

export interface RateLimitResult {
  /** Si la requête est autorisée */
  success: boolean;
  /** Nombre de requêtes restantes */
  remaining: number;
  /** Timestamp de réinitialisation */
  reset: number;
}

interface RateLimitEntry {
  count: number;
  reset: number;
}

/**
 * Configuration des limites par type d'endpoint
 */
export const RATE_LIMITS = {
  /** Routes API standard */
  api: {
    limit: 60,
    window: 60 * 1000, // 60 requêtes par minute
  },
  /** Route de revalidation */
  revalidation: {
    limit: 10,
    window: 60 * 1000, // 10 requêtes par minute
  },
  /** Formulaire de contact */
  contact: {
    limit: 5,
    window: 60 * 1000, // 5 requêtes par minute
  },
  /** Recherche */
  search: {
    limit: 30,
    window: 60 * 1000, // 30 requêtes par minute
  },
} as const;

export type RateLimitType = keyof typeof RATE_LIMITS;

/**
 * Classe de gestion du rate limiting en mémoire
 * NOTE: Cette implémentation est basique et fonctionne en mémoire.
 * Pour une application distribuée, utiliser Redis/Upstash.
 */
class RateLimiter {
  private store: Map<string, RateLimitEntry> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Nettoyage automatique toutes les 5 minutes
    this.startCleanup();
  }

  /**
   * Lance le nettoyage périodique des entrées expirées
   */
  private startCleanup() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, entry] of this.store.entries()) {
        if (entry.reset < now) {
          this.store.delete(key);
        }
      }
    }, 5 * 60 * 1000); // 5 minutes
  }

  /**
   * Génère une clé unique pour le rate limit
   */
  private getKey(identifier: string, type: RateLimitType): string {
    return `${type}:${identifier}`;
  }

  /**
   * Vérifie si une requête est autorisée
   *
   * @param identifier Identifiant unique (IP, user ID, etc.)
   * @param type Type de rate limit à appliquer
   * @returns Résultat du rate limiting
   */
  async check(
    identifier: string,
    type: RateLimitType = 'api'
  ): Promise<RateLimitResult> {
    const config = RATE_LIMITS[type];
    const key = this.getKey(identifier, type);
    const now = Date.now();

    const entry = this.store.get(key);

    // Première requête ou fenêtre expirée
    if (!entry || entry.reset < now) {
      const newEntry: RateLimitEntry = {
        count: 1,
        reset: now + config.window,
      };
      this.store.set(key, newEntry);

      return {
        success: true,
        remaining: config.limit - 1,
        reset: newEntry.reset,
      };
    }

    // Fenêtre active
    if (entry.count < config.limit) {
      entry.count++;
      return {
        success: true,
        remaining: config.limit - entry.count,
        reset: entry.reset,
      };
    }

    // Limite dépassée
    return {
      success: false,
      remaining: 0,
      reset: entry.reset,
    };
  }

  /**
   * Réinitialise le compteur pour un identifiant
   */
  reset(identifier: string, type: RateLimitType = 'api'): void {
    const key = this.getKey(identifier, type);
    this.store.delete(key);
  }

  /**
   * Nettoie tous les compteurs
   */
  clear(): void {
    this.store.clear();
  }

  /**
   * Arrête le nettoyage automatique
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.clear();
  }
}

/**
 * Instance singleton du rate limiter
 */
export const rateLimit = new RateLimiter();

/**
 * Helper pour obtenir l'identifiant d'une requête
 * Utilise l'IP si disponible, sinon retourne 'anonymous'
 */
export function getRequestIdentifier(request: Request): string {
  // Essayer d'obtenir l'IP depuis les headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    // x-forwarded-for peut contenir plusieurs IPs
    return forwarded.split(',')[0]?.trim() || 'anonymous';
  }

  if (realIp) {
    return realIp;
  }

  // Fallback
  return 'anonymous';
}

/**
 * Middleware helper pour appliquer le rate limiting
 *
 * @example
 * export async function POST(request: Request) {
 *   const rateLimitResult = await applyRateLimit(request, 'contact');
 *   if (!rateLimitResult.success) {
 *     return new Response('Too Many Requests', { status: 429 });
 *   }
 *   // ... rest of handler
 * }
 */
export async function applyRateLimit(
  request: Request,
  type: RateLimitType = 'api'
): Promise<RateLimitResult> {
  const identifier = getRequestIdentifier(request);
  return rateLimit.check(identifier, type);
}
