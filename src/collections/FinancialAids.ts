import type { CollectionConfig } from 'payload';
import { createRevalidateHook } from '../lib/revalidate-hook';
import { managedContentAccess } from '@/lib/access-control';

export const FinancialAids: CollectionConfig = {
  slug: 'financial-aids',
  admin: {
    useAsTitle: 'title',
    description: 'Aides financières et solutions de financement',
    defaultColumns: ['title', 'category', 'order'],
    group: 'Contenu',
  },
  labels: {
    singular: 'Aide Financière',
    plural: 'Aides Financières',
  },
  access: managedContentAccess,
  hooks: {
    afterChange: [createRevalidateHook('financial-aids')],
  },
  fields: [
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: "Nom de l'icône Lucide (ex: Coins, Repeat, Home)",
      },
    },
    {
      name: 'badge',
      type: 'text',
      admin: {
        description: 'Badge optionnel (ex: AIDE PRINCIPALE, TVA RÉDUITE)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: "Titre de l'aide",
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: "Sous-titre de l'aide",
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: "Description détaillée de l'aide",
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
      name: 'conditions',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: "Conditions d'éligibilité",
      },
    },
    {
      name: 'amounts',
      type: 'array',
      fields: [
        {
          name: 'power',
          type: 'text',
          required: true,
          admin: {
            description: 'Puissance concernée (ex: ≤ 3 kWc)',
          },
        },
        {
          name: 'amount',
          type: 'text',
          required: true,
          admin: {
            description: "Montant de l'aide (ex: 300 €/kWc)",
          },
        },
        {
          name: 'example',
          type: 'text',
          admin: {
            description: 'Exemple concret (ex: 900€ pour 3 kWc)',
          },
        },
        {
          name: 'bestFor',
          type: 'text',
          admin: {
            description: "Pour qui c'est adapté (ex: Maison 2-3 personnes)",
          },
        },
      ],
      admin: {
        description: 'Montants selon la puissance',
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
        description: "Caractéristiques de l'aide (pour les financements)",
      },
    },
    {
      name: 'payment',
      type: 'text',
      admin: {
        description: 'Modalités de paiement',
      },
    },
    {
      name: 'savings',
      type: 'text',
      admin: {
        description: 'Économies réalisées',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: "Lien vers plus d'informations",
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Aide Principale',
          value: 'main',
        },
        {
          label: 'Aide Locale',
          value: 'local',
        },
        {
          label: 'Financement',
          value: 'financing',
        },
        {
          label: 'ROI / Rentabilité',
          value: 'roi',
        },
      ],
      admin: {
        description: "Catégorie de l'aide",
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
