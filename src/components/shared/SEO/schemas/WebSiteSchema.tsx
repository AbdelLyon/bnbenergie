import { getSiteSettings } from '@/lib/payload-queries';

export async function WebSiteStructuredData() {
  const siteConfig = await getSiteSettings();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    url: siteConfig.domain,
    name: siteConfig.siteName,
    // Description hardcodée — ne pas utiliser siteConfig.seoDescription (géré en dur pour le SEO)
    description:
      "Installateur panneaux solaires photovoltaïques à Bourg-en-Bresse et dans l'Ain (01). Entreprise RGE QualiPV certifiée. Devis gratuit 48h.",
    inLanguage: 'fr-FR',
    publisher: {
      '@id': `${siteConfig.domain}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
