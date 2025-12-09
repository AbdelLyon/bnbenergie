import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { PageHeaders } from './collections/PageHeaders';
import { createRevalidateHook } from './lib/revalidate-hook';
import { Services } from './collections/Services';
import { Warranties } from './collections/Warranties';
import { FinancialAids } from './collections/FinancialAids';
import { InterventionZones } from './collections/InterventionZones';
import { SiteSettings } from './globals/SiteSettings';
import { Navigation } from './globals/Navigation';
import { env, isDevelopment } from './lib/env';
import { DATABASE_POOL_CONFIG } from './config/database';
import { managedContentAccess } from './lib/access-control';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

import { fr } from '@payloadcms/translations/languages/fr';
import { en } from '@payloadcms/translations/languages/en';

export default buildConfig({
  i18n: {
    supportedLanguages: { fr, en },
    fallbackLanguage: 'fr', // Défaut en français
  },
  admin: {
    user: Users.slug,
    theme: 'dark', // Force le mode sombre par défaut
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: './app/(payload)/admin/Graphics#Logo',
        Icon: './app/(payload)/admin/Graphics#Icon',
      },
      beforeLogin: ['./app/(payload)/admin/LoginParticles'],
    },
    meta: {
      titleSuffix: '- BNB ÉNERGIE Admin',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: '/favicon.svg',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          url: '/favicon.ico',
        },
      ],
      openGraph: {
        images: [
          {
            url: '/opengraph-image.png',
          },
        ],
      },
    },
  },
  collections: [
    Users,
    Media,
    PageHeaders,
    Services,
    Warranties,
    FinancialAids,
    InterventionZones,
    {
      slug: 'pricing-packs',
      labels: {
        singular: 'Pack Tarifaire',
        plural: 'Packs Tarifaires',
      },
      admin: {
        useAsTitle: 'name',
        group: 'Contenu',
      },
      access: managedContentAccess,
      hooks: {
        afterChange: [createRevalidateHook('pricing-packs')],
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'panels',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'originalPrice',
          type: 'text',
        },
        {
          name: 'popular',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'features',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'cta',
          type: 'text',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // Projects / Réalisations
    {
      slug: 'projects',
      labels: {
        singular: 'Réalisation',
        plural: 'Réalisations',
      },
      admin: {
        useAsTitle: 'title',
        group: 'Contenu',
      },
      access: managedContentAccess,
      hooks: {
        afterChange: [createRevalidateHook('projects')],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'power',
          type: 'text',
          required: true,
        },
        {
          name: 'panels',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // Stats
    {
      slug: 'stats',
      labels: {
        singular: 'Statistique',
        plural: 'Statistiques',
      },
      admin: {
        useAsTitle: 'label',
        group: 'Contenu',
      },
      access: managedContentAccess,
      hooks: {
        afterChange: [createRevalidateHook('stats')],
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'color',
          type: 'text',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // About Cards
    {
      slug: 'about-cards',
      labels: {
        singular: 'Carte À Propos',
        plural: 'Cartes À Propos',
      },
      admin: {
        useAsTitle: 'title',
        group: 'Contenu',
      },
      access: managedContentAccess,
      hooks: {
        afterChange: [createRevalidateHook('about-cards')],
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'stat',
          type: 'text',
          required: true,
        },
        {
          name: 'statLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'gradient',
          type: 'text',
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // Benefits
    {
      slug: 'benefits',
      labels: {
        singular: 'Avantage',
        plural: 'Avantages',
      },
      admin: {
        useAsTitle: 'text',
        group: 'Contenu',
      },
      access: managedContentAccess,
      hooks: {
        afterChange: [createRevalidateHook('benefits')],
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
    // FAQs
    {
      slug: 'faqs',
      labels: {
        singular: 'FAQ',
        plural: 'FAQ',
      },
      admin: {
        useAsTitle: 'question',
        group: 'Contenu',
      },
      access: managedContentAccess,
      hooks: {
        afterChange: [createRevalidateHook('faqs')],
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
    },
  ],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
      max: DATABASE_POOL_CONFIG.max,
      idleTimeoutMillis: DATABASE_POOL_CONFIG.idleTimeoutMillis,
      connectionTimeoutMillis: DATABASE_POOL_CONFIG.connectionTimeoutMillis,
    },
    // Logging des requêtes en développement
    logger: isDevelopment,
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
