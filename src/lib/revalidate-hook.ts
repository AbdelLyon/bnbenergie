/**
 * Helper pour créer un hook de revalidation Payload CMS
 * Déclenche la revalidation Next.js après chaque modification
 * La revalidation se fait en arrière-plan pour ne pas bloquer l'UI
 */

export const createRevalidateHook = (collectionSlug: string) => {
  return async ({ doc }: any) => {
    // Utiliser SERVER_URL (privé) au lieu de NEXT_PUBLIC_SERVER_URL
    // Car ce hook s'exécute uniquement côté serveur
    const serverUrl = process.env['SERVER_URL'] || process.env['NEXT_PUBLIC_SERVER_URL'];
    const secret = process.env['REVALIDATION_SECRET'];

    // Si les variables d'environnement ne sont pas définies, skip silencieusement
    if (!serverUrl || !secret) {
      console.warn(
        `⚠️ Revalidation skipped for ${collectionSlug}: SERVER_URL or REVALIDATION_SECRET not set`
      );
      return doc;
    }

    // Lancer la revalidation en arrière-plan avec Promise.resolve() pour ne pas bloquer
    Promise.resolve().then(async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // Timeout de 5 secondes

        const revalidationUrl = `${serverUrl}/api/revalidate?secret=${secret}`;

        const response = await fetch(revalidationUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ collection: collectionSlug }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          console.log(`✅ Revalidated after ${collectionSlug} change`);
        } else {
          console.error(
            `❌ Failed to revalidate ${collectionSlug}:`,
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
          console.error(`❌ Revalidation error for ${collectionSlug}:`, error);
        }
      }
    });

    // Retourner immédiatement le doc pour ne pas bloquer l'UI Payload
    return doc;
  };
};
