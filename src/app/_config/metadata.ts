import { Metadata } from 'next';
import { getSiteSettings } from '@/app/_lib/payload-queries';

export async function generateMetadata({
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
}): Promise<Metadata> {
  const siteConfig = await getSiteSettings();
  const baseUrl = siteConfig.domain;
  const url = `${baseUrl}${path}`;
  const defaultImage = {
    url: `${baseUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
  };

  const seoKeywords =
    siteConfig.seo?.keywords?.map((k: any) => k.keyword) || [];

  return {
    title,
    description,
    keywords: keywords.length > 0 ? [...keywords, ...seoKeywords] : seoKeywords,

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

// Default metadata with placeholder values
// Pages should override these with their own metadata
export const defaultMetadata: Metadata = {
  metadataBase: new URL(
    process.env['NEXT_PUBLIC_SITE_URL'] || 'https://bnbenergie.fr'
  ),
  title: {
    default: 'BNB ÉNERGIE | Installation Panneaux Solaires',
    template: '%s | BNB ÉNERGIE',
  },
  description:
    "Expert en installation de panneaux solaires photovoltaïques dans l'Ain (01). Devis gratuit, entreprise RGE QualiPV.",
  keywords: [
    'panneaux solaires',
    'installation photovoltaïque',
    'Ain',
    'RGE QualiPV',
  ],
  authors: [{ name: 'BNB ÉNERGIE' }],
  creator: 'BNB ÉNERGIE',
  publisher: 'BNB ÉNERGIE',

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
    siteName: 'BNB ÉNERGIE',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'BNB ÉNERGIE - Installation Panneaux Solaires',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
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

  verification: {
    google: process.env['NEXT_PUBLIC_GOOGLE_VERIFICATION'],
  },

  other: {
    'geo.region': 'FR-01',
  },
};
