import { getSiteSettings } from '@/lib/payload-queries';
import { GOOGLE_REVIEWS, REVIEWS_STATS } from '@/data/google-reviews-data';

export async function LocalBusinessStructuredData() {
  const siteConfig = await getSiteSettings();
  const rating = REVIEWS_STATS.average;
  const reviewCount = REVIEWS_STATS.total;

  const domain = siteConfig.domain.replace(/\/$/, '');

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

    '@type': [
      'LocalBusiness',
      'HomeAndConstructionBusiness',
      'ElectricalContractor',
    ],
    '@id': `${domain}/#localbusiness`,
    name: siteConfig.siteName,
    alternateName: siteConfig.businessName,
    description:
      "Installateur de panneaux solaires photovoltaïques à Bourg-en-Bresse et dans l'Ain (01). Entreprise RGE QualiPV certifiée. Devis gratuit 48h, installation clé en main.",
    url: `${domain}/`,
    telephone: siteConfig.contactPhone,
    email: siteConfig.contactEmail,
    image: [`${domain}/opengraph-image`],
    logo: {
      '@type': 'ImageObject',
      url: `${domain}/logo.svg`,
    },

    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',

    hasMap: 'https://maps.google.com/?q=BNB+%C3%89NERGIE+Bourg-en-Bresse',

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
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '12:00',
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
        '@type': 'City',
        name: 'Oyonnax',
        containedIn: { '@type': 'AdministrativeArea', name: 'Ain' },
      },
      {
        '@type': 'City',
        name: 'Bellegarde-sur-Valserine',
        containedIn: { '@type': 'AdministrativeArea', name: 'Ain' },
      },
      {
        '@type': 'City',
        name: 'Ambérieu-en-Bugey',
        containedIn: { '@type': 'AdministrativeArea', name: 'Ain' },
      },
      {
        '@type': 'City',
        name: 'Gex',
        containedIn: { '@type': 'AdministrativeArea', name: 'Ain' },
      },
      {
        '@type': 'City',
        name: 'Ferney-Voltaire',
        containedIn: { '@type': 'AdministrativeArea', name: 'Ain' },
      },
      {
        '@type': 'City',
        name: 'Trévoux',
        containedIn: { '@type': 'AdministrativeArea', name: 'Ain' },
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Ain',
        sameAs: 'https://www.wikidata.org/wiki/Q12779',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geoLatitude,
          longitude: siteConfig.geoLongitude,
        },
        geoRadius: '50000',
        description: "Bourg-en-Bresse et agglomération, rayon 50 km dans l'Ain",
      },
    ],

    serviceType: [
      'Installation Panneaux Solaires Bourg-en-Bresse',
      'Installation Photovoltaïque Bourg-en-Bresse',
      'Installation Panneaux Solaires Ain',
      'Maintenance Panneaux Solaires Ain',
      'Dépannage Panneaux Solaires Bourg-en-Bresse',
      'Raccordement Enedis Photovoltaïque',
      'Autoconsommation Solaire Ain',
    ],

    sameAs: [siteConfig.socialFacebook, siteConfig.socialInstagram].filter(
      Boolean
    ),

    parentOrganization: {
      '@id': `${domain}/#organization`,
    },

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },

    ...(reviews.length > 0 && { review: reviews }),

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Installation Panneaux Solaires',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Panneaux Solaires 3 kWc',
            description:
              'Installation complète de panneaux solaires 3 kWc pour particuliers, certifiée RGE QualiPV',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Panneaux Solaires 6 kWc',
            description:
              'Installation complète de panneaux solaires 6 kWc pour maisons familiales, certifiée RGE QualiPV',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Panneaux Solaires 9 kWc',
            description:
              'Installation complète de panneaux solaires 9 kWc pour grandes maisons et professionnels, certifiée RGE QualiPV',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Étude de Faisabilité Gratuite',
            description:
              'Analyse technique gratuite de votre toiture et simulation de production photovoltaïque personnalisée',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Démarches Administratives Complètes',
            description:
              'Gestion intégrale des démarches : déclaration mairie, Enedis, Consuel, contrat injection EDF OA',
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
