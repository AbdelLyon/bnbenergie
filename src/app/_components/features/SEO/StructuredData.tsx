import siteConfig from '@/data/siteConfig.json';

export function LocalBusinessStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteConfig.domain,
    name: siteConfig.siteName,
    alternateName: siteConfig.businessName,
    description: siteConfig.seo.description,
    url: siteConfig.domain,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    image: [`${siteConfig.domain}/opengraph-image`],
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.domain}/logo.svg`,
    },

    priceRange: '€€€',

    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],

    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      geoRadius: '50000',
    },

    serviceType: [
      'Installation Panneaux Solaires',
      'Installation Photovoltaïque',
      'Maintenance Panneaux Solaires',
      'Dépannage Panneaux Solaires',
    ],

    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Panneaux Solaires',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Panneaux Solaires 3 kWc',
            description:
              'Installation complète de panneaux solaires 3 kWc pour particuliers',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Panneaux Solaires 6 kWc',
            description:
              'Installation complète de panneaux solaires 6 kWc pour maisons familiales',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Panneaux Solaires 9 kWc',
            description:
              'Installation complète de panneaux solaires 9 kWc pour grandes maisons et professionnels',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    url: siteConfig.domain,
    name: siteConfig.siteName,
    description: siteConfig.seo.description,
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

export function OrganizationStructuredData() {
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
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      areaServed: 'FR',
      availableLanguage: 'French',
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQStructuredData({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceStructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Installation de Panneaux Solaires Photovoltaïques',
    description:
      "Service complet d'installation de panneaux solaires photovoltaïques dans l'Ain (01)",
    provider: {
      '@type': 'LocalBusiness',
      name: siteConfig.siteName,
      url: siteConfig.domain,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
      geoRadius: '50000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Installation Panneaux Solaires',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Étude de Faisabilité Gratuite',
            description:
              'Analyse technique gratuite de votre projet photovoltaïque',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Démarches Administratives',
            description:
              'Gestion complète des démarches : Enedis, mairie, Consuel',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation RGE QualiPV',
            description: 'Installation certifiée par installateur RGE QualiPV',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Raccordement Enedis',
            description: 'Mise en service et raccordement réseau Enedis',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Maintenance et SAV',
            description: 'Service après-vente et maintenance panneaux solaires',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PricingStructuredData() {
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
            datePublished: '2025-10-15',
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
