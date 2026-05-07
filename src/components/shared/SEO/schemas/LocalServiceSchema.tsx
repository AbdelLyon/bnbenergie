import { SITE_CONFIG } from '@/config/site';

interface LocalServiceSchemaProps {
  cityName: string;
  citySlug: string;
}

export function LocalServiceStructuredData({
  cityName,
  citySlug,
}: LocalServiceSchemaProps) {
  const base = SITE_CONFIG.url.replace(/\/$/, '');
  const cityUrl = `${base}/zones-intervention/${citySlug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${cityUrl}#service`,
    name: `Installation Panneaux Solaires ${cityName}`,
    description: `Installation de panneaux solaires photovoltaïques à ${cityName} (Ain 01). Installateur RGE QualiPV local, devis gratuit 48h, garantie décennale.`,
    url: cityUrl,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${base}/#localbusiness`,
      name: SITE_CONFIG.name,
      telephone: SITE_CONFIG.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.locality,
        postalCode: SITE_CONFIG.address.postalCode,
        addressCountry: SITE_CONFIG.address.country,
      },
    },
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedIn: {
        '@type': 'AdministrativeArea',
        name: 'Ain',
        sameAs: 'https://www.wikidata.org/wiki/Q12779',
      },
    },
    serviceType: `Installation Panneaux Solaires ${cityName}`,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '5990',
      highPrice: '13990',
      offerCount: '3',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
