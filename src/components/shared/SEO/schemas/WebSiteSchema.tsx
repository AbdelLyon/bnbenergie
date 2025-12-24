import { getSiteSettings } from '@/lib/payload-queries';

/**
 * Schéma WebSite pour SEO structuré
 * Inclut les informations de base du site et l'action de recherche
 */
export async function WebSiteStructuredData() {
  const siteConfig = await getSiteSettings();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    url: siteConfig.domain,
    name: siteConfig.siteName,
    description: siteConfig.seoDescription,
    inLanguage: 'fr-FR',
    publisher: {
      '@id': siteConfig.domain,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.domain}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
