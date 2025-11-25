/**
 * Helper pour créer un hook de revalidation Payload CMS
 * Déclenche la revalidation Next.js après chaque modification
 */

export const createRevalidateHook = (collectionSlug: string) => {
  return async ({ doc }: any) => {
    try {
      const revalidationUrl = `${process.env['NEXT_PUBLIC_SERVER_URL']}/api/revalidate?secret=${process.env['REVALIDATION_SECRET']}`;

      const response = await fetch(revalidationUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: collectionSlug }),
      });

      if (response.ok) {
        console.log(`✅ Revalidated after ${collectionSlug} change`);
      } else {
        console.error(
          `❌ Failed to revalidate ${collectionSlug}:`,
          await response.text()
        );
      }
    } catch (error) {
      console.error(`❌ Revalidation error for ${collectionSlug}:`, error);
    }

    return doc;
  };
};
