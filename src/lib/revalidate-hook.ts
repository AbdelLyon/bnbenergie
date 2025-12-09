/**
 * Helper pour créer un hook de revalidation Payload CMS
 * Déclenche la revalidation Next.js après chaque modification
 * La revalidation se fait en arrière-plan pour ne pas bloquer l'UI
 */

import { env } from './env';
import { REVALIDATION_TIMEOUT } from '@/config/cache';
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload';

/**
 * Fonction commune de revalidation
 */
const triggerRevalidation = async (slug: string, doc: unknown) => {
  // Utiliser SERVER_URL (privé) au lieu de NEXT_PUBLIC_SERVER_URL
  // Car ce hook s'exécute uniquement côté serveur
  const serverUrl = env.SERVER_URL || env.NEXT_PUBLIC_SERVER_URL;
  const secret = env.REVALIDATION_SECRET;

  // Si les variables d'environnement ne sont pas définies, skip silencieusement
  if (!serverUrl || !secret) {
    console.warn(
      `⚠️ Revalidation skipped for ${slug}: SERVER_URL or REVALIDATION_SECRET not set`
    );
    return doc;
  }

  // Lancer la revalidation en arrière-plan avec Promise.resolve() pour ne pas bloquer
  Promise.resolve().then(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REVALIDATION_TIMEOUT);

      const revalidationUrl = `${serverUrl}/api/revalidate?secret=${secret}`;

      const response = await fetch(revalidationUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: slug }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log(`✅ Revalidated after ${slug} change`);
      } else {
        console.error(
          `❌ Failed to revalidate ${slug}:`,
          await response.text()
        );
      }
    } catch (error) {
      // Ne pas logger les erreurs de timeout/abort
      if (
        error instanceof Error &&
        error.name !== 'AbortError' &&
        error.name !== 'TimeoutError'
      ) {
        console.error(`❌ Revalidation error for ${slug}:`, error);
      }
    }
  });

  // Retourner immédiatement le doc pour ne pas bloquer l'UI Payload
  return doc;
};

/**
 * Hook de revalidation pour les collections
 */
export const createRevalidateHook = (collectionSlug: string): CollectionAfterChangeHook => {
  return async ({ doc }) => {
    return triggerRevalidation(collectionSlug, doc);
  };
};

/**
 * Hook de revalidation pour les globals
 */
export const createGlobalRevalidateHook = (globalSlug: string): GlobalAfterChangeHook => {
  return async ({ doc }) => {
    return triggerRevalidation(globalSlug, doc);
  };
};
