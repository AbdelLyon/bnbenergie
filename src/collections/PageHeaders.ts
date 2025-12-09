import type { CollectionConfig } from 'payload';
import { createRevalidateHook } from '../lib/revalidate-hook';
import { managedContentAccess } from '@/lib/access-control';

export const PageHeaders: CollectionConfig = {
  slug: 'page-headers',
  admin: {
    useAsTitle: 'pageSlug',
    description: 'En-têtes et métadonnées pour chaque page du site',
    group: 'Contenu',
  },
  labels: {
    singular: 'En-tête de Page',
    plural: 'En-têtes de Page',
  },
  access: managedContentAccess,
  hooks: {
    afterChange: [createRevalidateHook('page-headers')],
  },
  fields: [
    {
      name: 'pageSlug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Identifiant unique de la page (ex: home, services, contact)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Titre principal de la page',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Sous-titre optionnel',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description de la page',
      },
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Badge optionnel affiché au-dessus du titre',
      },
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: "Nom de l'icône Lucide (ex: Sun, Zap, Shield)",
      },
    },
    {
      name: 'heroImages',
      type: 'array',
      admin: {
        description: 'Images de carousel pour le header (si applicable)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
          admin: {
            description: "Texte alternatif pour l'accessibilité et le SEO",
          },
        },
      ],
    },
    {
      name: 'singleImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image unique pour le header (alternative au carousel)',
      },
    },
  ],
};
