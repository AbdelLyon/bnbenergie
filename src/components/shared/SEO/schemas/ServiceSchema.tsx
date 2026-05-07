import { getSiteSettings } from '@/lib/payload-queries';

export async function ServiceStructuredData() {
  const siteConfig = await getSiteSettings();

  const domain = siteConfig.domain.replace(/\/$/, '');

  const mainServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${domain}/#service-installation`,
    name: 'Installation de Panneaux Solaires Photovoltaïques',
    alternateName: 'Pose panneaux solaires photovoltaïques',
    description:
      "Service complet d'installation de panneaux solaires photovoltaïques dans l'Ain (01) : étude gratuite de faisabilité, démarches Enedis, Consuel, mise en service et SAV.",
    url: `${domain}/services`,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${domain}/#localbusiness`,
      name: siteConfig.siteName,
      url: domain,
    },
    category: 'Installation photovoltaïque',
    serviceType: 'Installation Panneaux Solaires',
    brand: {
      '@type': 'Brand',
      name: siteConfig.siteName,
    },

    serviceArea: [
      {
        '@type': 'City',
        name: 'Bourg-en-Bresse',
        containedIn: {
          '@type': 'AdministrativeArea',
          name: 'Ain',
        },
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Ain',
      },
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geoLatitude,
          longitude: siteConfig.geoLongitude,
        },
        geoRadius: '50000',
      },
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geoLatitude,
        longitude: siteConfig.geoLongitude,
      },
      geoRadius: '50000',
    },

    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '5990',
      highPrice: '13990',
      offerCount: '3',
      availability: 'https://schema.org/InStock',
    },

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Étapes Installation Panneaux Solaires',
      itemListElement: [
        {
          '@type': 'Offer',
          '@id': `${domain}/#service-etude`,
          itemOffered: {
            '@type': 'Service',
            name: 'Étude de Faisabilité Gratuite',
            description:
              'Analyse technique gratuite de votre projet photovoltaïque : toiture, orientation, ombrage, consommation. Simulation personnalisée.',
          },
        },
        {
          '@type': 'Offer',
          '@id': `${domain}/#service-devis`,
          itemOffered: {
            '@type': 'Service',
            name: 'Devis & Accompagnement Aides',
            description:
              "Devis détaillé avec toutes les aides applicables : MaPrimeRénov, prime à l'autoconsommation, CEE, TVA 5,5%, éco-PTZ.",
          },
        },
        {
          '@type': 'Offer',
          '@id': `${domain}/#service-admin`,
          itemOffered: {
            '@type': 'Service',
            name: 'Démarches Administratives',
            description:
              "Gestion complète des démarches : déclaration préalable en mairie, demande de raccordement Enedis, Consuel, contrat d'injection EDF OA.",
          },
        },
        {
          '@type': 'Offer',
          '@id': `${domain}/#service-installation-rge`,
          itemOffered: {
            '@type': 'Service',
            name: 'Installation RGE QualiPV',
            description:
              "Pose par nos techniciens certifiés RGE QualiPV. Garantie décennale sur l'installation. Matériaux de première qualité.",
          },
        },
        {
          '@type': 'Offer',
          '@id': `${domain}/#service-raccordement`,
          itemOffered: {
            '@type': 'Service',
            name: 'Raccordement Enedis & Mise en Service',
            description:
              'Raccordement réseau Enedis, passage du Consuel, mise en service et test de la production. Monitoring en temps réel inclus.',
          },
        },
        {
          '@type': 'Offer',
          '@id': `${domain}/#service-sav`,
          itemOffered: {
            '@type': 'Service',
            name: 'Maintenance & SAV',
            description:
              'Service après-vente réactif, maintenance préventive et corrective des panneaux solaires. Interlocuteur unique dédié.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(mainServiceSchema) }}
    />
  );
}
