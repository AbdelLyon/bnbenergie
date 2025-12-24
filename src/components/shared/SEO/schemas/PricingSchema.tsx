import { getSiteSettings } from '@/lib/payload-queries';

/**
 * Schéma de tarification des packs panneaux solaires pour SEO
 * Inclut les 3 packs avec avis, prix et détails de livraison
 */
export async function PricingStructuredData() {
  const siteConfig = await getSiteSettings();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Offres Installation Panneaux Solaires',
    itemListElement: [
      // Pack 3 kWc
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '42',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: 'Marie D.',
            },
            reviewBody:
              'Installation 3kWc parfaite. Équipe professionnelle RGE, délais respectés. Production conforme aux prévisions. Je recommande vivement!',
            datePublished: '2024-10-15',
          },
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: 'Jean-Pierre L.',
            },
            reviewBody:
              'Très satisfait de mon installation 3kWc. Devis clair, installation rapide, SAV réactif. Excellent rapport qualité-prix.',
            datePublished: '2025-09-28',
          },
        ],
        offers: {
          '@type': 'Offer',
          price: '5990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2025-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'EUR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'FR',
              addressRegion: 'FR-01',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 14,
                maxValue: 28,
                unitCode: 'd',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'd',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'FR',
            returnPolicyCategory:
              'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
      },
      // Pack 6 kWc
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '38',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: 'Thomas B.',
            },
            reviewBody:
              'Installation 6kWc impeccable. Production optimale dès le premier mois. Service RGE QualiPV de qualité. Très bon investissement!',
            datePublished: '2025-10-22',
          },
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: 'Sophie M.',
            },
            reviewBody:
              "Pack 6kWc parfait pour notre maison. Installation soignée, équipe à l'écoute. Autoconsommation maximale atteinte.",
            datePublished: '2025-09-12',
          },
        ],
        offers: {
          '@type': 'Offer',
          price: '9990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2025-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'EUR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'FR',
              addressRegion: 'FR-01',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 14,
                maxValue: 28,
                unitCode: 'd',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'd',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'FR',
            returnPolicyCategory:
              'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
      },
      // Pack 9 kWc
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '47',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: 'Philippe R.',
            },
            reviewBody:
              'Installation 9kWc exceptionnelle. Grande maison totalement autonome. Entreprise RGE sérieuse, garantie décennale rassurante.',
            datePublished: '2025-11-05',
          },
          {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            author: {
              '@type': 'Person',
              name: 'Catherine V.',
            },
            reviewBody:
              'Pack 9kWc au top! Production excellente même en hiver. Installation pro, suivi parfait. Amortissement rapide garanti.',
            datePublished: '2025-10-18',
          },
        ],
        offers: {
          '@type': 'Offer',
          price: '13990',
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2025-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: siteConfig.siteName,
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'EUR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'FR',
              addressRegion: 'FR-01',
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 14,
                maxValue: 28,
                unitCode: 'd',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'd',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'FR',
            returnPolicyCategory:
              'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
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
