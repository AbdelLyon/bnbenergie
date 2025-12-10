export const FALLBACK_SITE_SETTINGS = {
  id: 'fallback',
  // Informations business
  siteName: 'BNB Énergie 01 - Panneaux Solaires Photovoltaïques Ain',
  businessName: 'BNB Énergie 01',
  domain: 'https://www.bnbenergie01.com',

  // Contact
  contactPhone: '07 81 25 11 25',
  contactPhoneHref: 'tel:+33781251125',
  contactEmail: 'contact@bnbenergie01.com',
  contactEmailHref: 'mailto:contact@bnbenergie01.com',

  // Adresse
  addressStreet: '16 Av. Pablo Picasso',
  addressCity: 'Bourg-en-Bresse',
  addressLocality: 'Bourg-en-Bresse',
  addressRegion: 'Auvergne-Rhône-Alpes',
  addressZip: '01000',
  addressCountry: 'FR',
  geoLatitude: '46.2058',
  geoLongitude: '5.2258',
  socialFacebook: 'https://www.facebook.com/bnbenergie01',
  socialInstagram: 'https://www.instagram.com/bnbenergie01',
  socialLinkedin: '',
  socialTwitter: '',

  seoTitle:
    'Installateur Panneaux Solaires Bourg-en-Bresse | Expert RGE QualiPV Ain',
  seoTitleTemplate:
    '%s | BNB Énergie - Installateur Panneaux Solaires Bourg-en-Bresse',
  seoDescription:
    "N°1 installateur panneaux solaires à Bourg-en-Bresse (01). Entreprise RGE QualiPV certifiée. Devis gratuit 48h, installation 3-9kWc, MaPrimeRénov'. Expert photovoltaïque Ain.",

  seoKeywords: [],
};

export type SiteSettings = {
  siteName?: string | null;
  businessName?: string | null;
  domain?: string | null;
  contactPhone?: string | null;
  contactPhoneHref?: string | null;
  contactEmail?: string | null;
  contactEmailHref?: string | null;
  addressStreet?: string | null;
  addressCity?: string | null;
  addressLocality?: string | null;
  addressRegion?: string | null;
  addressZip?: string | null;
  addressCountry?: string | null;
  geoLatitude?: string | null;
  geoLongitude?: string | null;
  socialFacebook?: string | null;
  socialInstagram?: string | null;
  socialLinkedin?: string | null;
  socialTwitter?: string | null;
  seoTitle?: string | null;
  seoTitleTemplate?: string | null;
  seoDescription?: string | null;
  seoKeywords?: Array<{ keyword?: string | null }> | null;
};

export function mergeSiteSettings(payloadSettings: SiteSettings | null) {
  if (!payloadSettings) {
    return FALLBACK_SITE_SETTINGS;
  }

  return {
    id: (payloadSettings as any).id || FALLBACK_SITE_SETTINGS.id,
    siteName: payloadSettings.siteName || FALLBACK_SITE_SETTINGS.siteName,
    businessName:
      payloadSettings.businessName || FALLBACK_SITE_SETTINGS.businessName,
    domain: payloadSettings.domain || FALLBACK_SITE_SETTINGS.domain,
    contactPhone:
      payloadSettings.contactPhone || FALLBACK_SITE_SETTINGS.contactPhone,
    contactPhoneHref:
      payloadSettings.contactPhoneHref ||
      FALLBACK_SITE_SETTINGS.contactPhoneHref,
    contactEmail:
      payloadSettings.contactEmail || FALLBACK_SITE_SETTINGS.contactEmail,
    contactEmailHref:
      payloadSettings.contactEmailHref ||
      FALLBACK_SITE_SETTINGS.contactEmailHref,
    addressStreet:
      payloadSettings.addressStreet || FALLBACK_SITE_SETTINGS.addressStreet,
    addressCity:
      payloadSettings.addressCity || FALLBACK_SITE_SETTINGS.addressCity,
    addressLocality:
      payloadSettings.addressLocality || FALLBACK_SITE_SETTINGS.addressLocality,
    addressRegion:
      payloadSettings.addressRegion || FALLBACK_SITE_SETTINGS.addressRegion,
    addressZip: payloadSettings.addressZip || FALLBACK_SITE_SETTINGS.addressZip,
    addressCountry:
      payloadSettings.addressCountry || FALLBACK_SITE_SETTINGS.addressCountry,
    geoLatitude:
      payloadSettings.geoLatitude || FALLBACK_SITE_SETTINGS.geoLatitude,
    geoLongitude:
      payloadSettings.geoLongitude || FALLBACK_SITE_SETTINGS.geoLongitude,
    socialFacebook:
      payloadSettings.socialFacebook || FALLBACK_SITE_SETTINGS.socialFacebook,
    socialInstagram:
      payloadSettings.socialInstagram || FALLBACK_SITE_SETTINGS.socialInstagram,
    socialLinkedin:
      payloadSettings.socialLinkedin || FALLBACK_SITE_SETTINGS.socialLinkedin,
    socialTwitter:
      payloadSettings.socialTwitter || FALLBACK_SITE_SETTINGS.socialTwitter,
    seoTitle: payloadSettings.seoTitle || FALLBACK_SITE_SETTINGS.seoTitle,
    seoTitleTemplate:
      payloadSettings.seoTitleTemplate ||
      FALLBACK_SITE_SETTINGS.seoTitleTemplate,
    seoDescription:
      payloadSettings.seoDescription || FALLBACK_SITE_SETTINGS.seoDescription,
    seoKeywords: [],
  };
}
