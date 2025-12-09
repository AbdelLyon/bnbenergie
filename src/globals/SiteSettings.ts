import type { GlobalConfig } from 'payload';
import { createGlobalRevalidateHook } from '../lib/revalidate-hook';
import { updateAdminOnly } from '@/lib/access-control';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Paramètres du Site',
  admin: {
    description: 'Configuration globale du site',
    group: 'Configuration',
  },
  access: {
    read: () => true,
    update: updateAdminOnly,
  },
  hooks: {
    afterChange: [createGlobalRevalidateHook('site-settings')],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Informations Générales',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              required: true,
              admin: {
                description: 'Nom complet du site',
              },
            },
            {
              name: 'businessName',
              type: 'text',
              required: true,
              admin: {
                description: "Nom de l'entreprise",
              },
            },
            {
              name: 'domain',
              type: 'text',
              required: true,
              admin: {
                description: 'URL du domaine (sans www)',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contactPhone',
              type: 'text',
              required: true,
              admin: {
                description: 'Numéro de téléphone affiché',
              },
            },
            {
              name: 'contactPhoneHref',
              type: 'text',
              required: true,
              admin: {
                description: 'Lien tel: (ex: tel:0781251125)',
              },
            },
            {
              name: 'contactEmail',
              type: 'email',
              required: true,
              admin: {
                description: 'Email de contact',
              },
            },
            {
              name: 'contactEmailHref',
              type: 'text',
              required: true,
              admin: {
                description: 'Lien mailto:',
              },
            },
          ],
        },
        {
          label: 'Adresse',
          fields: [
            {
              name: 'addressStreet',
              type: 'text',
              required: true,
            },
            {
              name: 'addressCity',
              type: 'text',
              required: true,
            },
            {
              name: 'addressLocality',
              type: 'text',
            },
            {
              name: 'addressRegion',
              type: 'text',
              required: true,
            },
            {
              name: 'addressZip',
              type: 'text',
              required: true,
            },
            {
              name: 'addressCountry',
              type: 'text',
              required: true,
              defaultValue: 'FR',
            },
            {
              name: 'geoLatitude',
              type: 'text',
              required: true,
              admin: {
                description: 'Latitude GPS',
              },
            },
            {
              name: 'geoLongitude',
              type: 'text',
              required: true,
              admin: {
                description: 'Longitude GPS',
              },
            },
          ],
        },
        {
          label: 'Réseaux Sociaux',
          fields: [
            {
              name: 'socialFacebook',
              type: 'text',
              admin: {
                description: 'URL Facebook',
              },
            },
            {
              name: 'socialInstagram',
              type: 'text',
              admin: {
                description: 'URL Instagram',
              },
            },
            {
              name: 'socialLinkedin',
              type: 'text',
              admin: {
                description: 'URL LinkedIn',
              },
            },
            {
              name: 'socialTwitter',
              type: 'text',
              admin: {
                description: 'URL Twitter',
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              type: 'text',
              required: true,
              admin: {
                description: 'Titre SEO par défaut',
              },
            },
            {
              name: 'seoTitleTemplate',
              type: 'text',
              admin: {
                description:
                  'Template pour les titres de page (ex: %s | Nom du site)',
              },
            },
            {
              name: 'seoDescription',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Description SEO par défaut',
              },
            },
            {
              name: 'seoKeywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  required: true,
                },
              ],
              admin: {
                description: 'Mots-clés SEO',
              },
            },
          ],
        },
      ],
    },
  ],
};
