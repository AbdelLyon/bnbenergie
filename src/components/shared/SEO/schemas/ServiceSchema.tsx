import { getSiteSettings } from '@/lib/payload-queries';

export async function ServiceStructuredData() {
  const siteConfig = await getSiteSettings();

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
        latitude: siteConfig.geoLatitude,
        longitude: siteConfig.geoLongitude,
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
