import type { CollectionConfig } from 'payload';
import { createRevalidateHook } from '../lib/revalidate-hook';

export const PacksPage: CollectionConfig = {
  slug: 'packs-page',
  admin: {
    useAsTitle: 'title',
    group: 'Pages',
    description: 'Contenu de la page Nos Packs',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [createRevalidateHook('packs-page')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Titre de la section (ex: "Pourquoi Choisir Nos Packs")',
      },
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      options: [
        { label: 'Stats (3 cards qui remontent)', value: 'stats' },
        { label: 'Introduction', value: 'intro' },
        { label: 'Avantages', value: 'advantages' },
        { label: 'Processus', value: 'process' },
      ],
      admin: {
        description: 'Type de section',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description de la section',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Nom de l\'icône Lucide (ex: "Zap", "Shield", "TrendingUp")',
      },
    },
    {
      name: 'value',
      type: 'text',
      admin: {
        description: 'Valeur pour les stats (ex: "100%", "3 ans", "500+")',
        condition: (data) => data['section'] === 'stats',
      },
    },
    {
      name: 'gradient',
      type: 'text',
      defaultValue: 'from-blue-500 to-cyan-500',
      admin: {
        description: 'Gradient Tailwind CSS (ex: "from-blue-500 to-cyan-500")',
      },
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Liste de fonctionnalités/avantages',
        condition: (data) => data['section'] === 'advantages' || data['section'] === 'process',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          admin: {
            description: 'Icône Lucide',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'gradient',
          type: 'text',
          defaultValue: 'from-blue-500 to-cyan-500',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Ordre d\'affichage (0 = premier)',
      },
    },
  ],
};
