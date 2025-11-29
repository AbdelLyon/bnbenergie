/**
 * Système de feature flags
 * Permet d'activer/désactiver des fonctionnalités de manière dynamique
 *
 * Pour une solution plus avancée avec A/B testing, utiliser @vercel/flags
 */

import { isDevelopment, isProduction } from './env';

/**
 * Type des feature flags disponibles
 */
export interface FeatureFlags {
  /** Nouvelle UI de pricing */
  NEW_PRICING_UI: boolean;

  /** Afficher le chat support */
  SHOW_SUPPORT_CHAT: boolean;

  /** Analytics avancées */
  ADVANCED_ANALYTICS: boolean;

  /** Mode maintenance */
  MAINTENANCE_MODE: boolean;

  /** Nouvelles animations */
  NEW_ANIMATIONS: boolean;

  /** Mode debug (affiche les métriques de performance) */
  DEBUG_MODE: boolean;
}

/**
 * Configuration par défaut des feature flags
 */
const defaultFlags: FeatureFlags = {
  NEW_PRICING_UI: false,
  SHOW_SUPPORT_CHAT: false,
  ADVANCED_ANALYTICS: isProduction,
  MAINTENANCE_MODE: false,
  NEW_ANIMATIONS: true,
  DEBUG_MODE: isDevelopment,
};

/**
 * Récupère les feature flags depuis les variables d'environnement
 * Format: NEXT_PUBLIC_FEATURE_FLAG_NAME=true/false
 */
function loadFlagsFromEnv(): Partial<FeatureFlags> {
  const flags: Partial<FeatureFlags> = {};

  // Tenter de charger chaque flag depuis les variables d'environnement
  const flagKeys = Object.keys(defaultFlags) as (keyof FeatureFlags)[];

  for (const key of flagKeys) {
    const envKey = `NEXT_PUBLIC_FEATURE_${key}`;
    const envValue = process.env[envKey];

    if (envValue !== undefined) {
      flags[key] = envValue === 'true';
    }
  }

  return flags;
}

/**
 * Feature flags actifs (combinaison des defaults et des env vars)
 */
const activeFlags: FeatureFlags = {
  ...defaultFlags,
  ...loadFlagsFromEnv(),
};

/**
 * Vérifie si une feature est activée
 *
 * @example
 * if (isFeatureEnabled('NEW_PRICING_UI')) {
 *   return <NewPricingUI />;
 * }
 * return <PricingUI />;
 */
export function isFeatureEnabled(flag: keyof FeatureFlags): boolean {
  return activeFlags[flag];
}

/**
 * Récupère tous les feature flags actifs
 */
export function getAllFlags(): Readonly<FeatureFlags> {
  return Object.freeze({ ...activeFlags });
}

/**
 * Active/désactive un feature flag (pour les tests uniquement)
 * NE PAS utiliser en production
 */
export function setFeatureFlag(
  flag: keyof FeatureFlags,
  value: boolean
): void {
  if (isProduction) {
    console.warn(
      'Tentative de modification de feature flag en production - ignoré'
    );
    return;
  }

  activeFlags[flag] = value;
}

/**
 * Réinitialise tous les flags aux valeurs par défaut
 * Pour les tests uniquement
 */
export function resetAllFlags(): void {
  if (isProduction) {
    console.warn(
      'Tentative de réinitialisation des feature flags en production - ignoré'
    );
    return;
  }

  Object.assign(activeFlags, defaultFlags);
}

/**
 * Hook React pour utiliser les feature flags
 * À utiliser côté client uniquement
 *
 * @example
 * 'use client';
 * import { useFeatureFlag } from '@/lib/feature-flags';
 *
 * function MyComponent() {
 *   const isNewUI = useFeatureFlag('NEW_PRICING_UI');
 *   return isNewUI ? <NewUI /> : <OldUI />;
 * }
 */
export function useFeatureFlag(flag: keyof FeatureFlags): boolean {
  // Note: Dans une implémentation plus avancée, on utiliserait useState/useEffect
  // pour permettre le hot-reloading des flags
  return isFeatureEnabled(flag);
}

/**
 * Composant wrapper pour afficher du contenu conditionnel basé sur un feature flag
 *
 * @example
 * <FeatureGate flag="NEW_PRICING_UI" fallback={<OldPricing />}>
 *   <NewPricing />
 * </FeatureGate>
 */
export function FeatureGate({
  flag,
  children,
  fallback = null,
}: {
  flag: keyof FeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}): React.ReactNode {
  return isFeatureEnabled(flag) ? children : fallback;
}

/**
 * Log l'état des feature flags (pour debugging)
 */
export function logFeatureFlags(): void {
  if (isDevelopment) {
    console.table(activeFlags);
  }
}

// Log au démarrage en développement
if (isDevelopment) {
  console.log('🚩 Feature Flags actifs:');
  logFeatureFlags();
}
