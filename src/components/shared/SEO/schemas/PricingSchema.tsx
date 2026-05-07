import { getSiteSettings } from '@/lib/payload-queries';

export async function PricingStructuredData() {
  const siteConfig = await getSiteSettings();
  const domain = siteConfig.domain.replace(/\/$/, '');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${domain}/#pricing-list`,
    name: 'Offres Installation Panneaux Solaires Bourg-en-Bresse',
    description: "Tarifs installation panneaux photovoltaïques dans l'Ain, packs 3, 6 et 9 kWc",
    url: `${domain}/nos-packs`,
    numberOfItems: 3,
    itemListElement: [
      {
        '@type': 'Product',
        '@id': `${domain}/#pack-3kwc`,
        position: 1,
        name: 'Pack Installation Panneaux Solaires 3 kWc',
        description:
          'Installation complète 3 kWc : 8 panneaux + micro-onduleur + pose + démarches Enedis + Consuel. Certifiée RGE QualiPV.',
        image: `${domain}/opengraph-image`,
        sku: 'SOLAR-3KWC',
        brand: {
          '@type': 'Brand',
          name: siteConfig.businessName,
        },
        manufacturer: {
          '@type': 'Organization',
          '@id': `${domain}/#organization`,
        },
        offers: {
          '@type': 'Offer',
          url: `${domain}/nos-packs`,
          price: '5990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
        },
      },
      {
        '@type': 'Product',
        '@id': `${domain}/#pack-6kwc`,
        position: 2,
        name: 'Pack Installation Panneaux Solaires 6 kWc',
        description:
          'Installation complète 6 kWc : 16 panneaux + micro-onduleur + pose + démarches Enedis + Consuel. Certifiée RGE QualiPV.',
        image: `${domain}/opengraph-image`,
        sku: 'SOLAR-6KWC',
        brand: {
          '@type': 'Brand',
          name: siteConfig.businessName,
        },
        manufacturer: {
          '@type': 'Organization',
          '@id': `${domain}/#organization`,
        },
        offers: {
          '@type': 'Offer',
          url: `${domain}/nos-packs`,
          price: '9990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
        },
      },
      {
        '@type': 'Product',
        '@id': `${domain}/#pack-9kwc`,
        position: 3,
        name: 'Pack Installation Panneaux Solaires 9 kWc',
        description:
          'Installation complète 9 kWc : 24 panneaux + micro-onduleur + pose + démarches Enedis + Consuel. Certifiée RGE QualiPV.',
        image: `${domain}/opengraph-image`,
        sku: 'SOLAR-9KWC',
        brand: {
          '@type': 'Brand',
          name: siteConfig.businessName,
        },
        manufacturer: {
          '@type': 'Organization',
          '@id': `${domain}/#organization`,
        },
        offers: {
          '@type': 'Offer',
          url: `${domain}/nos-packs`,
          price: '13990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2027-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
