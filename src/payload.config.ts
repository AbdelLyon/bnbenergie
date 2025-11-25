import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

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
      admin: {
        useAsTitle: 'name',
      },
      access: {
        read: () => true,
      },
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
      admin: {
        useAsTitle: 'title',
      },
      access: {
        read: () => true,
      },
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
      admin: {
        useAsTitle: 'label',
      },
      access: {
        read: () => true,
      },
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
      admin: {
        useAsTitle: 'title',
      },
      access: {
        read: () => true,
      },
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
      admin: {
        useAsTitle: 'text',
      },
      access: {
        read: () => true,
      },
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
      admin: {
        useAsTitle: 'question',
      },
      access: {
        read: () => true,
      },
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
  secret: process.env['PAYLOAD_SECRET'] || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env['DATABASE_URL'] || '',
    },
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
});
