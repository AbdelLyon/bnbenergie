/**
 * Fonctions utilitaires pour récupérer les données depuis Payload CMS
 * Version optimisée avec support des options de requête et monitoring
 */

import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import config from '@/payload.config';
import { DEFAULT_QUERY_LIMIT } from '@/config/database';
import { CACHE_TAGS, REVALIDATION_INTERVALS } from '@/config/cache';
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

import type { Where } from 'payload';

/**
 * Options communes pour les requêtes Payload
 */
export interface QueryOptions {
  /** Limite de résultats */
  limit?: number;
  /** Clause where personnalisée */
  where?: Where;
  /** Tri personnalisé */
  sort?: string;
  /** Pagination - page */
  page?: number;
}

// ===== PAGE HEADERS =====
const getPageHeaderUncached = async (
  pageSlug: string
): Promise<PageHeader | null> => {
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
};

export const getPageHeader = (pageSlug: string) =>
  unstable_cache(
    async () => getPageHeaderUncached(pageSlug),
    [`page-header-${pageSlug}`],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY, // 1 minute
      tags: [CACHE_TAGS.PAGE_HEADERS, `page-header-${pageSlug}`],
    }
  )();

// ===== SERVICES =====
const getServicesUncached = async (
  options?: QueryOptions
): Promise<Service[]> => {
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
};

export const getServices = (options?: QueryOptions) =>
  unstable_cache(
    async () => getServicesUncached(options),
    ['services', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY,
      tags: [CACHE_TAGS.SERVICES],
    }
  )();

// ===== WARRANTIES =====
const getWarrantiesUncached = async (
  category?: 'certification' | 'product' | 'commitment' | 'process',
  options?: QueryOptions
): Promise<Warranty[]> => {
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
};

export const getWarranties = (
  category?: 'certification' | 'product' | 'commitment' | 'process',
  options?: QueryOptions
) =>
  unstable_cache(
    async () => getWarrantiesUncached(category, options),
    ['warranties', category || 'all', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.LOW_FREQUENCY,
      tags: [CACHE_TAGS.WARRANTIES, category ? `warranties-${category}` : 'warranties-all'],
    }
  )();

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
const getFinancialAidsUncached = async (
  category?: 'main' | 'local' | 'financing' | 'roi',
  options?: QueryOptions
): Promise<FinancialAid[]> => {
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
};

export const getFinancialAids = (
  category?: 'main' | 'local' | 'financing' | 'roi',
  options?: QueryOptions
) =>
  unstable_cache(
    async () => getFinancialAidsUncached(category, options),
    ['financial-aids', category || 'all', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY,
      tags: [CACHE_TAGS.FINANCIAL_AIDS, category ? `financial-aids-${category}` : 'financial-aids-all'],
    }
  )();

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
const getInterventionZonesUncached = async (
  options?: QueryOptions
): Promise<InterventionZone[]> => {
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
};

export const getInterventionZones = (options?: QueryOptions) =>
  unstable_cache(
    async () => getInterventionZonesUncached(options),
    ['intervention-zones', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY,
      tags: [CACHE_TAGS.INTERVENTION_ZONES],
    }
  )();

// ===== SITE SETTINGS (Global) =====
const getSiteSettingsUncached = async (): Promise<SiteSetting> => {
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
};

export const getSiteSettings = unstable_cache(
  getSiteSettingsUncached,
  ['site-settings'],
  {
    revalidate: REVALIDATION_INTERVALS.LOW_FREQUENCY, // 5 minutes
    tags: [CACHE_TAGS.SITE_SETTINGS],
  }
);

// ===== NAVIGATION (Global) =====
const getNavigationUncached = async (): Promise<Navigation> => {
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
};

export const getNavigation = unstable_cache(
  getNavigationUncached,
  ['navigation'],
  {
    revalidate: REVALIDATION_INTERVALS.LOW_FREQUENCY, // 5 minutes
    tags: [CACHE_TAGS.NAVIGATION],
  }
);

// ===== PRICING PACKS =====
const getPricingPacksUncached = async (
  options?: QueryOptions
): Promise<PricingPack[]> => {
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
};

export const getPricingPacks = (options?: QueryOptions) =>
  unstable_cache(
    async () => getPricingPacksUncached(options),
    ['pricing-packs', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.HIGH_FREQUENCY,
      tags: [CACHE_TAGS.PRICING],
    }
  )();

// ===== PROJECTS =====
const getProjectsUncached = async (
  options?: QueryOptions
): Promise<Project[]> => {
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
};

export const getProjects = (options?: QueryOptions) =>
  unstable_cache(
    async () => getProjectsUncached(options),
    ['projects', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY,
      tags: [CACHE_TAGS.PROJECTS],
    }
  )();

// ===== STATS =====
const getStatsUncached = async (options?: QueryOptions): Promise<Stat[]> => {
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
};

export const getStats = (options?: QueryOptions) =>
  unstable_cache(
    async () => getStatsUncached(options),
    ['stats', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY,
      tags: [CACHE_TAGS.STATS],
    }
  )();

// ===== ABOUT CARDS =====
const getAboutCardsUncached = async (
  options?: QueryOptions
): Promise<AboutCard[]> => {
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
};

export const getAboutCards = (options?: QueryOptions) =>
  unstable_cache(
    async () => getAboutCardsUncached(options),
    ['about-cards', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY,
      tags: [CACHE_TAGS.ABOUT_CARDS],
    }
  )();

// ===== BENEFITS =====
const getBenefitsUncached = async (
  options?: QueryOptions
): Promise<Benefit[]> => {
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
};

export const getBenefits = (options?: QueryOptions) =>
  unstable_cache(
    async () => getBenefitsUncached(options),
    ['benefits', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.MEDIUM_FREQUENCY,
      tags: [CACHE_TAGS.BENEFITS],
    }
  )();

// ===== FAQS =====
const getFaqsUncached = async (
  category?: string,
  options?: QueryOptions
): Promise<Faq[]> => {
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
};

export const getFaqs = (category?: string, options?: QueryOptions) =>
  unstable_cache(
    async () => getFaqsUncached(category, options),
    ['faqs', category || 'all', JSON.stringify(options)],
    {
      revalidate: REVALIDATION_INTERVALS.LOW_FREQUENCY,
      tags: [CACHE_TAGS.FAQS, category ? `faqs-${category}` : 'faqs-all'],
    }
  )();

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
