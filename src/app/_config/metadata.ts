import { Metadata } from 'next';
import siteConfig from '@/data/siteConfig.json';

const baseUrl = siteConfig.domain;

export function generateMetadata({
  title,
  description,
  path = '',
  keywords = [],
  images = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: Array<{ url: string; width: number; height: number; alt: string }>;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const defaultImage = {
    url: `${baseUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title,
    description,
    keywords:
      keywords.length > 0
        ? [...keywords, ...siteConfig.seo.keywords]
        : siteConfig.seo.keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url,
      title,
      description,
      siteName: siteConfig.siteName,
      images: images.length > 0 ? images : [defaultImage],
    },

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images:
        images.length > 0 ? images.map((img) => img.url) : [defaultImage.url],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.seo.title,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.siteName }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,

  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.domain,
    title: `${siteConfig.siteName} | Expert Photovoltaïque`,
    description: siteConfig.seo.description,
    siteName: siteConfig.siteName,
    images: [
      {
        url: `${siteConfig.domain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `Installation Panneaux Solaires à ${siteConfig.address.locality} (${siteConfig.address.zip}) - Expert Photovoltaïque ${siteConfig.address.region}`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.siteName} (${siteConfig.address.zip})`,
    description: siteConfig.seo.description,
    images: [`${siteConfig.domain}/opengraph-image`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: siteConfig.domain,
  },

  verification: {
    google: siteConfig.verification.google,
  },

  other: {
    'geo.region': 'FR-01',
    'geo.placename': siteConfig.address.locality,
    'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
};
