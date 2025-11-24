/**
 * Fonctions utilitaires pour récupérer les données depuis Payload CMS
 */

import { getPayload } from 'payload';
import config from '@/payload.config';
import type {
  PageHeader,
  Service,
  Warranty,
  FinancialAid,
  InterventionZone,
  SiteSettings as SiteSettingsType,
  Navigation as NavigationType,
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

// ===== PAGE HEADERS =====
export async function getPageHeader(
  pageSlug: string
): Promise<PageHeader | null> {
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

// ===== SERVICES =====
export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

// ===== WARRANTIES =====
export async function getWarranties(
  category?: 'certification' | 'product' | 'commitment' | 'process'
): Promise<Warranty[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'warranties',
    where: category
      ? {
          category: {
            equals: category,
          },
        }
      : undefined,
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

export async function getWarrantiesByCategory() {
  const certifications = await getWarranties('certification');
  const products = await getWarranties('product');
  const commitments = await getWarranties('commitment');
  const process = await getWarranties('process');

  return {
    certifications,
    products,
    commitments,
    process,
  };
}

// ===== FINANCIAL AIDS =====
export async function getFinancialAids(
  category?: 'main' | 'local' | 'financing' | 'roi'
): Promise<FinancialAid[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'financial-aids',
    where: category
      ? {
          category: {
            equals: category,
          },
        }
      : undefined,
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

export async function getFinancialAidsByCategory() {
  const main = await getFinancialAids('main');
  const local = await getFinancialAids('local');
  const financing = await getFinancialAids('financing');
  const roi = await getFinancialAids('roi');

  return {
    main,
    local,
    financing,
    roi,
  };
}

// ===== INTERVENTION ZONES =====
export async function getInterventionZones(): Promise<InterventionZone[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'intervention-zones',
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

// ===== SITE SETTINGS (Global) =====
export async function getSiteSettings(): Promise<SiteSettingsType> {
  const payload = await getPayloadInstance();
  const result = await payload.findGlobal({
    slug: 'site-settings',
  });
  return result;
}

// ===== NAVIGATION (Global) =====
export async function getNavigation(): Promise<NavigationType> {
  const payload = await getPayloadInstance();
  const result = await payload.findGlobal({
    slug: 'navigation',
  });
  return result;
}

// ===== PRICING PACKS =====
export async function getPricingPacks(): Promise<PricingPack[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'pricing-packs',
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

// ===== PROJECTS =====
export async function getProjects(limit = 100): Promise<Project[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit,
  });
  return result.docs;
}

// ===== STATS =====
export async function getStats(): Promise<Stat[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'stats',
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

// ===== ABOUT CARDS =====
export async function getAboutCards(): Promise<AboutCard[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'about-cards',
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

// ===== BENEFITS =====
export async function getBenefits(): Promise<Benefit[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'benefits',
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

// ===== FAQS =====
export async function getFaqs(category?: string): Promise<Faq[]> {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: 'faqs',
    where: category
      ? {
          category: {
            equals: category,
          },
        }
      : undefined,
    sort: 'order',
    limit: 100,
  });
  return result.docs;
}

// ===== HELPER: Get all data for a specific page =====
export async function getPageData(pageSlug: string) {
  const header = await getPageHeader(pageSlug);
  const siteSettings = await getSiteSettings();
  const navigation = await getNavigation();

  return {
    header,
    siteSettings,
    navigation,
  };
}
