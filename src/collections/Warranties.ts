import type { CollectionConfig } from 'payload';

export const Warranties: CollectionConfig = {
  slug: 'warranties',
  admin: {
    useAsTitle: 'title',
    description: 'Garanties, certifications et engagements qualité',
    defaultColumns: ['title', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: "Nom de l'icône Lucide (ex: Award, Shield, CheckCircle2)",
      },
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Badge optionnel (ex: CERTIFICATION, ASSURANCE)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Titre de la garantie',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Sous-titre de la garantie',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Description détaillée',
      },
    },
    {
      name: 'highlights',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Points clés de la garantie',
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Caractéristiques techniques (pour les garanties produit)',
      },
    },
    {
      name: 'warrantyDetails',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
      admin: {
        description: 'Détails des garanties (durée, type)',
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Certification',
          value: 'certification',
        },
        {
          label: 'Garantie Produit',
          value: 'product',
        },
        {
          label: 'Engagement',
          value: 'commitment',
        },
        {
          label: 'Processus',
          value: 'process',
        },
      ],
      admin: {
        description: 'Catégorie de la garantie',
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
