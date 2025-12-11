import { Metadata } from 'next';
import { getSiteSettings } from '@/lib/payload-queries';
import { SEO_KEYWORDS } from './seo-keywords';

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
  const baseUrl = siteConfig.domain?.replace(/\/$/, '') + '/';
  // Remove leading slash from path if present to avoid double slash
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const url = `${baseUrl}${cleanPath}`;
  const defaultImage = {
    url: `${baseUrl}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
  };

  const seoKeywords = [...SEO_KEYWORDS];

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

import { env } from '@/lib/env';
export const defaultMetadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL || 'https://bnbenergie01.com'),
  title: {
    default: 'BNB ÉNERGIE | Installation Panneaux Solaires',
    template: '%s | BNB ÉNERGIE',
  },
  description:
    "Expert en installation de panneaux solaires photovoltaïques dans l'Ain (01). Devis gratuit, entreprise RGE QualiPV.",
  keywords: SEO_KEYWORDS,
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

  other: {
    'geo.region': 'FR-01',
  },
};
