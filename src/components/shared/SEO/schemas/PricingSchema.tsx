import { getSiteSettings } from '@/lib/payload-queries';

export async function PricingStructuredData() {
  const siteConfig = await getSiteSettings();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Offres Installation Panneaux Solaires',
    itemListElement: [
      {
        '@type': 'Product',
        position: 1,
        name: 'Pack Installation Panneaux Solaires 3 kWc',
        description:
          'Installation complète 3 kWc : 8 panneaux + onduleur + pose',
        image: `${siteConfig.domain}/opengraph-image`,
        brand: {
          '@type': 'Brand',
          name: siteConfig.businessName,
        },
        offers: {
          '@type': 'Offer',
          price: '5990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
        },
      },
      {
        '@type': 'Product',
        position: 2,
        name: 'Pack Installation Panneaux Solaires 6 kWc',
        description:
          'Installation complète 6 kWc : 16 panneaux + onduleur + pose',
        image: `${siteConfig.domain}/opengraph-image`,
        brand: {
          '@type': 'Brand',
          name: siteConfig.businessName,
        },
        offers: {
          '@type': 'Offer',
          price: '9990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
        },
      },
      {
        '@type': 'Product',
        position: 3,
        name: 'Pack Installation Panneaux Solaires 9 kWc',
        description:
          'Installation complète 9 kWc : 24 panneaux + onduleur + pose',
        image: `${siteConfig.domain}/opengraph-image`,
        brand: {
          '@type': 'Brand',
          name: siteConfig.businessName,
        },
        offers: {
          '@type': 'Offer',
          price: '13990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
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
