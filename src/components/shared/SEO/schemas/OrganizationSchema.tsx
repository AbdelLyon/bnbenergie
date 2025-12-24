import { getSiteSettings } from '@/lib/payload-queries';

/**
 * Schéma Organization pour SEO structuré
 * Informations sur l'organisation et les points de contact
 */
export async function OrganizationStructuredData() {
  const siteConfig = await getSiteSettings();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.domain}/#organization`,
    name: siteConfig.siteName,
    url: siteConfig.domain,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.domain}/logo.svg`,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contactPhone,
      contactType: 'customer service',
      email: siteConfig.contactEmail,
      areaServed: 'FR',
      availableLanguage: 'French',
    },
    sameAs: [siteConfig.socialFacebook, siteConfig.socialInstagram].filter(
      Boolean
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
