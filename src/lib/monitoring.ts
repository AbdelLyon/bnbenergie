/**
 * Système de monitoring et tracking de performance
 * Collecte les métriques et les erreurs pour analyse
 */

import { isProduction, isDevelopment } from './env';

/**
 * Types de métriques trackées
 */
export type MetricType =
  | 'db_query'
  | 'api_call'
  | 'page_load'
  | 'component_render'
  | 'cache_hit'
  | 'cache_miss'
  | 'revalidation';

/**
 * Interface pour une métrique de performance
 */
interface PerformanceMetric {
  name: string;
  type: MetricType;
  duration: number;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

/**
 * Interface pour un événement d'erreur
 */
interface ErrorEvent {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
  timestamp: number;
}

/**
 * Classe de monitoring singleton
 */
class MonitoringService {
  private metrics: PerformanceMetric[] = [];
  private errors: ErrorEvent[] = [];
  private maxStoredMetrics = 1000;
  private maxStoredErrors = 100;

  /**
   * Track une métrique de performance
   */
  trackMetric(
    name: string,
    type: MetricType,
    duration: number,
    metadata?: Record<string, unknown>
  ): void {
    const metric: PerformanceMetric = {
      name,
      type,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    // Logger en développement
    if (isDevelopment) {
      const color = duration > 1000 ? '\x1b[31m' : duration > 500 ? '\x1b[33m' : '\x1b[32m';
      console.log(
        `${color}[METRIC]%s %s: %dms\x1b[0m`,
        type === 'db_query' ? ' 🔍' : type === 'api_call' ? ' 🌐' : ' ⚡',
        name,
        duration.toFixed(2)
      );
    }

    // Stocker en production pour analytics
    if (isProduction) {
      this.metrics.push(metric);

      // Limiter la taille du tableau
      if (this.metrics.length > this.maxStoredMetrics) {
        this.metrics = this.metrics.slice(-this.maxStoredMetrics);
      }

      // TODO: Envoyer à un service d'analytics (ex: Vercel Analytics)
      // this.sendToAnalytics(metric);
    }
  }

  /**
   * Track une erreur
   */
  trackError(
    error: Error,
    context?: Record<string, unknown>
  ): void {
    const errorEvent: ErrorEvent = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: Date.now(),
    };

    // Logger l'erreur
    console.error('[ERROR]', error.message, context);

    // Stocker
    this.errors.push(errorEvent);
    if (this.errors.length > this.maxStoredErrors) {
      this.errors = this.errors.slice(-this.maxStoredErrors);
    }

    // TODO: Envoyer à Sentry en production
    // if (isProduction && typeof Sentry !== 'undefined') {
    //   Sentry.captureException(error, { contexts: { custom: context } });
    // }
  }

  /**
   * Récupère les métriques collectées
   */
  getMetrics(type?: MetricType): PerformanceMetric[] {
    if (type) {
      return this.metrics.filter((m) => m.type === type);
    }
    return this.metrics;
  }

  /**
   * Récupère les erreurs collectées
   */
  getErrors(): ErrorEvent[] {
    return this.errors;
  }

  /**
   * Calcule la moyenne de durée pour un type de métrique
   */
  getAverageDuration(type: MetricType): number {
    const metrics = this.getMetrics(type);
    if (metrics.length === 0) return 0;

    const sum = metrics.reduce((acc, m) => acc + m.duration, 0);
    return sum / metrics.length;
  }

  /**
   * Clear les métriques (utile pour les tests)
   */
  clear(): void {
    this.metrics = [];
    this.errors = [];
  }
}

// Instance singleton
const monitoring = new MonitoringService();

/**
 * Track une métrique de performance
 *
 * @example
 * trackPerformance('payload.getServices', 'db_query', 245);
 */
export function trackPerformance(
  name: string,
  type: MetricType,
  duration: number,
  metadata?: Record<string, unknown>
): void {
  monitoring.trackMetric(name, type, duration, metadata);
}

/**
 * Track une erreur
 *
 * @example
 * trackError(new Error('Query failed'), { collection: 'services' });
 */
export function trackError(
  error: Error,
  context?: Record<string, unknown>
): void {
  monitoring.trackError(error, context);
}

/**
 * Wrapper pour mesurer automatiquement la durée d'exécution d'une fonction
 *
 * @example
 * const result = await withPerformanceTracking(
 *   'getServices',
 *   'db_query',
 *   async () => await payload.find({ collection: 'services' })
 * );
 */
export async function withPerformanceTracking<T>(
  name: string,
  type: MetricType,
  fn: () => Promise<T>,
  metadata?: Record<string, unknown>
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    const duration = Date.now() - start;
    trackPerformance(name, type, duration, metadata);
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    trackPerformance(name, type, duration, { ...metadata, error: true });

    if (error instanceof Error) {
      trackError(error, { name, type, ...metadata });
    }

    throw error;
  }
}

export { monitoring };
