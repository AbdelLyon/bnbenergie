import { getSiteSettings } from '@/lib/payload-queries';
import { GOOGLE_REVIEWS, REVIEWS_STATS } from '@/data/google-reviews-data';

/**
 * Schéma LocalBusiness pour SEO structuré
 * Inclut les avis Google, les horaires d'ouverture, et les services
 */
export async function LocalBusinessStructuredData() {
  const siteConfig = await getSiteSettings();

  // Utiliser les vraies données Google depuis notre fichier de données
  const rating = REVIEWS_STATS.average;
  const reviewCount = REVIEWS_STATS.total;

  // Formater les 5 meilleurs avis pour Schema.org
  const reviews = GOOGLE_REVIEWS.slice(0, 5).map((review) => ({
    '@type': 'Review' as const,
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: review.rating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person' as const,
      name: review.author,
    },
    reviewBody: review.text,
    datePublished: review.date,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteConfig.domain,
    name: siteConfig.siteName,
    alternateName: siteConfig.businessName,
    description: siteConfig.seoDescription,
    url: siteConfig.domain,
    telephone: siteConfig.contactPhone,
    email: siteConfig.contactEmail,
    image: [`${siteConfig.domain}/opengraph-image`],
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.domain}/logo.svg`,
    },

    priceRange: '€€€',

    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.addressStreet,
      addressLocality: siteConfig.addressLocality || siteConfig.addressCity,
      addressRegion: siteConfig.addressRegion,
      postalCode: siteConfig.addressZip,
      addressCountry: siteConfig.addressCountry,
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geoLatitude,
      longitude: siteConfig.geoLongitude,
    },

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],

    areaServed: [
      {
        '@type': 'City',
        name: 'Bourg-en-Bresse',
        containedIn: {
          '@type': 'AdministrativeArea',
          name: 'Ain',
        },
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geoLatitude,
          longitude: siteConfig.geoLongitude,
        },
        geoRadius: '50000',
        description: 'Bourg-en-Bresse et agglomération, rayon 50km dans l\'Ain',
      },
    ],

    serviceType: [
      'Installation Panneaux Solaires Bourg-en-Bresse',
      'Installation Photovoltaïque Bourg-en-Bresse',
      'Maintenance Panneaux Solaires Ain',
      'Dépannage Panneaux Solaires Bourg-en-Bresse',
    ],

    sameAs: [siteConfig.socialFacebook, siteConfig.socialInstagram].filter(
      Boolean
    ),

    // Données réelles des avis Google pour le SEO
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },

    // Ajouter les avis individuels pour les rich snippets
    ...(reviews.length > 0 && { review: reviews }),

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
