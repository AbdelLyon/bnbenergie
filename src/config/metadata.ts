import type { Metadata } from "next";
import { SITE_CONFIG } from "./site";
import { SEO_KEYWORDS } from "./seo-keywords";

const BASE_URL = SITE_CONFIG.url.replace(/\/$/, "");

export function generateMetadata({
  title,
  description,
  path = "",
  keywords = [],
  images = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: Array<{ url: string; width: number; height: number; alt: string }>;
}): Metadata {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;


  const url = cleanPath ? `${BASE_URL}/${cleanPath}` : `${BASE_URL}/`;

  // ✅ Image OG avec URL absolue complète
  const defaultImage = {
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: title,
  };

  const allKeywords =
    keywords.length > 0 ? [...keywords, ...SEO_KEYWORDS] : SEO_KEYWORDS;

  return {
    title,
    description,
    keywords: allKeywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      title,
      description,
      siteName: SITE_CONFIG.name,
      images: images.length > 0 ? images : [defaultImage],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images:
        images.length > 0
          ? images.map((img) => img.url)
          : [defaultImage.url],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export const defaultMetadata: Metadata = {
 
  title: {
    default: "Installateur Solaire Bourg-en-Bresse | BNB ÉNERGIE",
    template: "%s | BNB ÉNERGIE",
  },
  description:
    "Installateur panneaux solaires & photovoltaïques à Bourg-en-Bresse, certifié RGE QualiPV. Devis gratuit 48h, installation clé en main 3-9 kWc dans l'Ain (01).",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "BNB ÉNERGIE" }],
  creator: "BNB ÉNERGIE",
  publisher: "BNB ÉNERGIE",

  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },

  formatDetection: {
    email: false,
    address: false,
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "BNB ÉNERGIE - Installateur Panneaux Solaires Bourg-en-Bresse",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  other: {
    "geo.region": SITE_CONFIG.geo.region,
    "geo.placename": SITE_CONFIG.address.city,
    "geo.position": `${SITE_CONFIG.geo.latitude};${SITE_CONFIG.geo.longitude}`,
    ICBM: `${SITE_CONFIG.geo.latitude}, ${SITE_CONFIG.geo.longitude}`,
  },
};
