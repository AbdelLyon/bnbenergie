import { getSiteSettings } from '@/lib/payload-queries';

export async function OrganizationStructuredData() {
  const siteConfig = await getSiteSettings();
  const domain = siteConfig.domain.replace(/\/$/, '');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${domain}/#organization`,
    name: siteConfig.siteName,
    url: domain,
    logo: {
      '@type': 'ImageObject',
      '@id': `${domain}/#logo`,
      url: `${domain}/logo.svg`,
      width: '512',
      height: '512',
      caption: 'Logo BNB ÉNERGIE - Installateur Panneaux Solaires Ain',
    },
    image: {
      '@id': `${domain}/#logo`,
    },
    description:
      "Installation de panneaux solaires photovoltaïques à Bourg-en-Bresse et dans l'Ain (01). Entreprise RGE QualiPV certifiée. Devis gratuit 48h.",
    knowsAbout: [
      'Panneaux solaires photovoltaïques',
      'Installation photovoltaïque résidentielle',
      'Autoconsommation solaire',
      'Aides financières énergies renouvelables',
      'Certification RGE QualiPV',
      'Raccordement Enedis',
      'MaPrimeRénov',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'RGE QualiPV',
        description:
          "Certification Reconnu Garant de l'Environnement pour l'installation photovoltaïque",
      },
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.addressStreet,
      addressLocality: siteConfig.addressLocality || siteConfig.addressCity,
      addressRegion: siteConfig.addressRegion,
      postalCode: siteConfig.addressZip,
      addressCountry: siteConfig.addressCountry,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contactPhone,
        contactType: 'customer service',
        email: siteConfig.contactEmail,
        areaServed: 'FR-01',
        availableLanguage: 'French',
        hoursAvailable: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contactPhone,
        contactType: 'sales',
        areaServed: 'FR-01',
        availableLanguage: 'French',
      },
    ],
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Ain',
      sameAs: 'https://www.wikidata.org/wiki/Q12779',
    },
    sameAs: [siteConfig.socialFacebook, siteConfig.socialInstagram].filter(
      Boolean
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
