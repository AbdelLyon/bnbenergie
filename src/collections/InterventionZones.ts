import type { CollectionConfig } from 'payload';

export const InterventionZones: CollectionConfig = {
  slug: 'intervention-zones',
  admin: {
    useAsTitle: 'zone',
    description: "Zones géographiques d'intervention",
    defaultColumns: ['zone', 'order'],
  },
  access: {
    read: () => true,
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
