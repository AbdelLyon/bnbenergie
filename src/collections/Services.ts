import type { CollectionConfig } from 'payload';
import { createRevalidateHook } from '../lib/revalidate-hook';
import { managedContentAccess } from '@/lib/access-control';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    description: "Étapes du processus d'installation de panneaux solaires",
    defaultColumns: ['number', 'title', 'duration', 'order'],
    group: 'Contenu',
  },
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  access: managedContentAccess,
  hooks: {
    afterChange: [createRevalidateHook('services')],
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      admin: {
        description: "Numéro de l'étape (ex: 01, 02, 03)",
      },
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: "Nom de l'icône Lucide (ex: Search, FileText, Hammer)",
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: "Titre de l'étape",
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      admin: {
        description: "Sous-titre de l'étape",
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: "Description détaillée de l'étape",
      },
    },
    {
      name: 'highlights',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: "Points clés de l'étape",
      },
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      admin: {
        description: "Durée estimée de l'étape (ex: 1-2 jours)",
      },
    },
    {
      name: 'gradient',
      type: 'text',
      required: true,
      admin: {
        description:
          'Classes Tailwind pour le gradient (ex: from-blue-500 to-cyan-500)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: "Ordre d'affichage",
      },
    },
  ],
};
