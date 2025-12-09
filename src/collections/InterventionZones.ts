import type { CollectionConfig } from 'payload';
import { createRevalidateHook } from '../lib/revalidate-hook';
import { managedContentAccess } from '@/lib/access-control';

export const InterventionZones: CollectionConfig = {
  slug: 'intervention-zones',
  admin: {
    useAsTitle: 'zone',
    description: "Zones géographiques d'intervention",
    defaultColumns: ['zone', 'order'],
    group: 'Contenu',
  },
  labels: {
    singular: "Zone d'Intervention",
    plural: "Zones d'Intervention",
  },
  access: managedContentAccess,
  hooks: {
    afterChange: [createRevalidateHook('intervention-zones')],
  },
  fields: [
    {
      name: 'zone',
      type: 'text',
      required: true,
      admin: {
        description: 'Nom de la zone (ex: Bourg-en-Bresse et Agglomération)',
      },
    },
    {
      name: 'communes',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Liste des communes de cette zone',
      },
    },
    {
      name: 'gradient',
      type: 'text',
      admin: {
        description: 'Classes Tailwind pour le gradient',
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
