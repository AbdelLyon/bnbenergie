import { getSiteSettings } from '@/lib/payload-queries';

export async function OrganizationStructuredData() {
  const siteConfig = await getSiteSettings();
  const domain = siteConfig.domain.replace(/\/$/, '');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${domain}/#organization`,
    name: siteConfig.siteName,
    url: domain,
    logo: {
      '@type': 'ImageObject',
      url: `${domain}/logo.svg`,
      width: '512',
      height: '512',
      caption: 'Logo BNB ÉNERGIE',
    },
    description:
      "Installation de panneaux solaires photovoltaïques à Bourg-en-Bresse et dans l'Ain (01). Entreprise RGE QualiPV certifiée.",
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
