/**
 * Service d'abstraction pour l'accès au contenu
 * Centralise la logique métier et la gestion d'erreurs
 */

import {
  getPageHeader,
  getServices,
  getWarranties,
  getWarrantiesByCategory,
  getFinancialAids,
  getFinancialAidsByCategory,
  getInterventionZones,
  getSiteSettings,
  getNavigation,
  getPricingPacks,
  getProjects,
  getStats,
  getAboutCards,
  getBenefits,
  getFaqs,
  getPageData,
  type QueryOptions,
} from '@/lib/payload-queries';
import { trackError } from '@/lib/monitoring';
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

/**
 * Type de réponse générique pour les opérations de service
 */
export type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; details?: unknown };

/**
 * Service de gestion du contenu
 */
export class ContentService {
  /**
   * Récupère un header de page de manière sécurisée
   */
  async getPageHeader(
    pageSlug: string
  ): Promise<ServiceResponse<PageHeader | null>> {
    try {
      const data = await getPageHeader(pageSlug);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getPageHeader', pageSlug });
      return {
        success: false,
        error: `Impossible de récupérer le header de la page: ${pageSlug}`,
        details: error,
      };
    }
  }

  /**
   * Récupère les services
   */
  async getServices(
    options?: QueryOptions
  ): Promise<ServiceResponse<Service[]>> {
    try {
      const data = await getServices(options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getServices' });
      return {
        success: false,
        error: 'Impossible de récupérer les services',
        details: error,
      };
    }
  }

  /**
   * Récupère les garanties
   */
  async getWarranties(
    category?: 'certification' | 'product' | 'commitment' | 'process',
    options?: QueryOptions
  ): Promise<ServiceResponse<Warranty[]>> {
    try {
      const data = await getWarranties(category, options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getWarranties', category });
      return {
        success: false,
        error: 'Impossible de récupérer les garanties',
        details: error,
      };
    }
  }

  /**
   * Récupère toutes les garanties par catégorie
   */
  async getWarrantiesByCategory(): Promise<
    ServiceResponse<{
      certifications: Warranty[];
      products: Warranty[];
      commitments: Warranty[];
      process: Warranty[];
    }>
  > {
    try {
      const data = await getWarrantiesByCategory();
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getWarrantiesByCategory' });
      return {
        success: false,
        error: 'Impossible de récupérer les garanties par catégorie',
        details: error,
      };
    }
  }

  /**
   * Récupère les aides financières
   */
  async getFinancialAids(
    category?: 'main' | 'local' | 'financing' | 'roi',
    options?: QueryOptions
  ): Promise<ServiceResponse<FinancialAid[]>> {
    try {
      const data = await getFinancialAids(category, options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getFinancialAids', category });
      return {
        success: false,
        error: 'Impossible de récupérer les aides financières',
        details: error,
      };
    }
  }

  /**
   * Récupère toutes les aides financières par catégorie
   */
  async getFinancialAidsByCategory(): Promise<
    ServiceResponse<{
      main: FinancialAid[];
      local: FinancialAid[];
      financing: FinancialAid[];
      roi: FinancialAid[];
    }>
  > {
    try {
      const data = await getFinancialAidsByCategory();
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getFinancialAidsByCategory' });
      return {
        success: false,
        error: 'Impossible de récupérer les aides financières par catégorie',
        details: error,
      };
    }
  }

  /**
   * Récupère les zones d'intervention
   */
  async getInterventionZones(
    options?: QueryOptions
  ): Promise<ServiceResponse<InterventionZone[]>> {
    try {
      const data = await getInterventionZones(options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getInterventionZones' });
      return {
        success: false,
        error: 'Impossible de récupérer les zones d\'intervention',
        details: error,
      };
    }
  }

  /**
   * Récupère les paramètres du site
   */
  async getSiteSettings(): Promise<ServiceResponse<SiteSetting>> {
    try {
      const data = await getSiteSettings();
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getSiteSettings' });
      return {
        success: false,
        error: 'Impossible de récupérer les paramètres du site',
        details: error,
      };
    }
  }

  /**
   * Récupère la navigation
   */
  async getNavigation(): Promise<ServiceResponse<Navigation>> {
    try {
      const data = await getNavigation();
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getNavigation' });
      return {
        success: false,
        error: 'Impossible de récupérer la navigation',
        details: error,
      };
    }
  }

  /**
   * Récupère les packs tarifaires
   */
  async getPricingPacks(
    options?: QueryOptions
  ): Promise<ServiceResponse<PricingPack[]>> {
    try {
      const data = await getPricingPacks(options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getPricingPacks' });
      return {
        success: false,
        error: 'Impossible de récupérer les packs tarifaires',
        details: error,
      };
    }
  }

  /**
   * Récupère les projets/réalisations
   */
  async getProjects(
    options?: QueryOptions
  ): Promise<ServiceResponse<Project[]>> {
    try {
      const data = await getProjects(options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getProjects' });
      return {
        success: false,
        error: 'Impossible de récupérer les projets',
        details: error,
      };
    }
  }

  /**
   * Récupère les statistiques
   */
  async getStats(options?: QueryOptions): Promise<ServiceResponse<Stat[]>> {
    try {
      const data = await getStats(options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getStats' });
      return {
        success: false,
        error: 'Impossible de récupérer les statistiques',
        details: error,
      };
    }
  }

  /**
   * Récupère les cartes "À propos"
   */
  async getAboutCards(
    options?: QueryOptions
  ): Promise<ServiceResponse<AboutCard[]>> {
    try {
      const data = await getAboutCards(options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getAboutCards' });
      return {
        success: false,
        error: 'Impossible de récupérer les cartes "À propos"',
        details: error,
      };
    }
  }

  /**
   * Récupère les avantages
   */
  async getBenefits(
    options?: QueryOptions
  ): Promise<ServiceResponse<Benefit[]>> {
    try {
      const data = await getBenefits(options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getBenefits' });
      return {
        success: false,
        error: 'Impossible de récupérer les avantages',
        details: error,
      };
    }
  }

  /**
   * Récupère les FAQs
   */
  async getFaqs(
    category?: string,
    options?: QueryOptions
  ): Promise<ServiceResponse<Faq[]>> {
    try {
      const data = await getFaqs(category, options);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getFaqs', category });
      return {
        success: false,
        error: 'Impossible de récupérer les FAQs',
        details: error,
      };
    }
  }

  /**
   * Récupère toutes les données d'une page
   */
  async getPageData(
    pageSlug: string
  ): Promise<
    ServiceResponse<{
      header: PageHeader | null;
      siteSettings: SiteSetting;
      navigation: Navigation;
    }>
  > {
    try {
      const data = await getPageData(pageSlug);
      return { success: true, data };
    } catch (error) {
      trackError(error as Error, { context: 'getPageData', pageSlug });
      return {
        success: false,
        error: `Impossible de récupérer les données de la page: ${pageSlug}`,
        details: error,
      };
    }
  }
}

/**
 * Instance singleton du service de contenu
 */
export const contentService = new ContentService();
