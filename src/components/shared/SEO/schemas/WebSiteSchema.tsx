import { getSiteSettings } from '@/lib/payload-queries';

export async function WebSiteStructuredData() {
  const siteConfig = await getSiteSettings();
  const domain = siteConfig.domain.replace(/\/$/, '');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${domain}/#website`,
    url: `${domain}/`,
    name: siteConfig.siteName,
    description:
      "Installateur panneaux solaires photovoltaïques à Bourg-en-Bresse et dans l'Ain (01). Entreprise RGE QualiPV certifiée. Devis gratuit 48h.",
    inLanguage: 'fr-FR',
    publisher: {
      '@id': `${domain}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
