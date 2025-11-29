/**
 * Fonctions utilitaires pour récupérer les données depuis Payload CMS
 * Version optimisée avec support des options de requête et monitoring
 */

import { getPayload } from 'payload';
import config from '@/payload.config';
import { DEFAULT_QUERY_LIMIT } from '@/config/database';
import { withPerformanceTracking } from './monitoring';
import type {
  PageHeader,
  Service,
  Warranty,
  FinancialAid,
  InterventionZone,
  SiteSetting,
  Navigation,
  PricingPack,
  Project,
  Stat,
  AboutCard,
  Benefit,
  Faq,
} from '@/payload-types';

// Cache Payload instance
let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadInstance() {
  if (!cachedPayload) {
    cachedPayload = await getPayload({ config });
  }
  return cachedPayload;
}

/**
 * Options communes pour les requêtes Payload
 */
export interface QueryOptions {
  /** Limite de résultats */
  limit?: number;
  /** Clause where personnalisée */
  where?: any;
  /** Tri personnalisé */
  sort?: string;
  /** Pagination - page */
  page?: number;
}

// ===== PAGE HEADERS =====
export async function getPageHeader(
  pageSlug: string
): Promise<PageHeader | null> {
  return withPerformanceTracking(
    `getPageHeader(${pageSlug})`,
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'page-headers',
        where: {
          pageSlug: {
            equals: pageSlug,
          },
        },
        limit: 1,
      });
      return result.docs[0] || null;
    }
  );
}

// ===== SERVICES =====
export async function getServices(options?: QueryOptions): Promise<Service[]> {
  return withPerformanceTracking(
    'getServices',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'services',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== WARRANTIES =====
export async function getWarranties(
  category?: 'certification' | 'product' | 'commitment' | 'process',
  options?: QueryOptions
): Promise<Warranty[]> {
  return withPerformanceTracking(
    `getWarranties(${category || 'all'})`,
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'warranties',
        where: category
          ? {
              category: {
                equals: category,
              },
            }
          : options?.where,
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

export async function getWarrantiesByCategory() {
  // Utilise Promise.all pour paralléliser les requêtes
  const [certifications, products, commitments, process] = await Promise.all([
    getWarranties('certification'),
    getWarranties('product'),
    getWarranties('commitment'),
    getWarranties('process'),
  ]);

  return {
    certifications,
    products,
    commitments,
    process,
  };
}

// ===== FINANCIAL AIDS =====
export async function getFinancialAids(
  category?: 'main' | 'local' | 'financing' | 'roi',
  options?: QueryOptions
): Promise<FinancialAid[]> {
  return withPerformanceTracking(
    `getFinancialAids(${category || 'all'})`,
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'financial-aids',
        where: category
          ? {
              category: {
                equals: category,
              },
            }
          : options?.where,
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

export async function getFinancialAidsByCategory() {
  // Utilise Promise.all pour paralléliser les requêtes
  const [main, local, financing, roi] = await Promise.all([
    getFinancialAids('main'),
    getFinancialAids('local'),
    getFinancialAids('financing'),
    getFinancialAids('roi'),
  ]);

  return {
    main,
    local,
    financing,
    roi,
  };
}

// ===== INTERVENTION ZONES =====
export async function getInterventionZones(
  options?: QueryOptions
): Promise<InterventionZone[]> {
  return withPerformanceTracking(
    'getInterventionZones',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'intervention-zones',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== SITE SETTINGS (Global) =====
export async function getSiteSettings(): Promise<SiteSetting> {
  return withPerformanceTracking(
    'getSiteSettings',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.findGlobal({
        slug: 'site-settings',
      });
      return result;
    }
  );
}

// ===== NAVIGATION (Global) =====
export async function getNavigation(): Promise<Navigation> {
  return withPerformanceTracking(
    'getNavigation',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.findGlobal({
        slug: 'navigation',
      });
      return result;
    }
  );
}

// ===== PRICING PACKS =====
export async function getPricingPacks(
  options?: QueryOptions
): Promise<PricingPack[]> {
  return withPerformanceTracking(
    'getPricingPacks',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'pricing-packs',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== PROJECTS =====
export async function getProjects(options?: QueryOptions): Promise<Project[]> {
  return withPerformanceTracking(
    'getProjects',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'projects',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== STATS =====
export async function getStats(options?: QueryOptions): Promise<Stat[]> {
  return withPerformanceTracking(
    'getStats',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'stats',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== ABOUT CARDS =====
export async function getAboutCards(
  options?: QueryOptions
): Promise<AboutCard[]> {
  return withPerformanceTracking(
    'getAboutCards',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'about-cards',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== BENEFITS =====
export async function getBenefits(options?: QueryOptions): Promise<Benefit[]> {
  return withPerformanceTracking(
    'getBenefits',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'benefits',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== FAQS =====
export async function getFaqs(
  category?: string,
  options?: QueryOptions
): Promise<Faq[]> {
  return withPerformanceTracking(
    `getFaqs(${category || 'all'})`,
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'faqs',
        where: category
          ? {
              category: {
                equals: category,
              },
            }
          : options?.where,
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        page: options?.page,
      });
      return result.docs;
    }
  );
}

// ===== HELPER: Get all data for a specific page =====
export async function getPageData(pageSlug: string) {
  // Paralléliser les requêtes pour de meilleures performances
  const [header, siteSettings, navigation] = await Promise.all([
    getPageHeader(pageSlug),
    getSiteSettings(),
    getNavigation(),
  ]);

  return {
    header,
    siteSettings,
    navigation,
  };
}
