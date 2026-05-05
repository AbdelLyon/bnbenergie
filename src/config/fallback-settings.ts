import type { SiteSetting } from '@/payload-types';

export const FALLBACK_SITE_SETTINGS = {
  id: 0,
  // Informations business
  siteName: 'BNB Énergie 01 - Panneaux Solaires Photovoltaïques Ain',
  businessName: 'BNB Énergie 01',
  domain: 'https://bnbenergie01.com/',

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
    'Installation Panneaux Solaires Bourg-en-Bresse | RGE QualiPV',
  seoTitleTemplate:
    '%s | BNB Énergie Bourg-en-Bresse',
  seoDescription:
    "Installateur panneaux solaires à Bourg-en-Bresse (01000). Entreprise RGE QualiPV certifiée dans l'Ain. Devis gratuit 48h, installation 3-9kWc, MaPrimeRénov'. Expert photovoltaïque local.",

  seoKeywords: [],
};

export function mergeSiteSettings(payloadSettings: Partial<SiteSetting> | null) {
  if (!payloadSettings) {
    return FALLBACK_SITE_SETTINGS;
  }

  return {
    id: payloadSettings.id || FALLBACK_SITE_SETTINGS.id,
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
