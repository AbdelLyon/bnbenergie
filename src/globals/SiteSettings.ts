import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    description: 'Configuration globale du site',
  },
  access: {
    read: () => true,
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
                description: 'URL du domaine',
              },
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'contact',
              type: 'group',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Numéro de téléphone affiché',
                  },
                },
                {
                  name: 'phone_href',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Lien tel: (ex: tel:0781251125)',
                  },
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  admin: {
                    description: 'Email de contact',
                  },
                },
                {
                  name: 'email_href',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Lien mailto:',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Adresse',
          fields: [
            {
              name: 'address',
              type: 'group',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'locality',
                  type: 'text',
                },
                {
                  name: 'region',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'zip',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'country',
                  type: 'text',
                  required: true,
                  defaultValue: 'FR',
                },
              ],
            },
            {
              name: 'geo',
              type: 'group',
              fields: [
                {
                  name: 'latitude',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'longitude',
                  type: 'number',
                  required: true,
                },
              ],
              admin: {
                description: 'Coordonnées GPS',
              },
            },
          ],
        },
        {
          label: 'Réseaux Sociaux',
          fields: [
            {
              name: 'social',
              type: 'group',
              fields: [
                {
                  name: 'facebook',
                  type: 'text',
                },
                {
                  name: 'instagram',
                  type: 'text',
                },
                {
                  name: 'linkedin',
                  type: 'text',
                },
                {
                  name: 'twitter',
                  type: 'text',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Titre SEO par défaut',
                  },
                },
                {
                  name: 'titleTemplate',
                  type: 'text',
                  admin: {
                    description:
                      'Template pour les titres de page (ex: %s | Nom du site)',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                  admin: {
                    description: 'Description SEO par défaut',
                  },
                },
                {
                  name: 'keywords',
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
        {
          label: 'Vérifications',
          fields: [
            {
              name: 'verification',
              type: 'group',
              fields: [
                {
                  name: 'google',
                  type: 'text',
                  admin: {
                    description: 'Code de vérification Google Search Console',
                  },
                },
                {
                  name: 'bing',
                  type: 'text',
                  admin: {
                    description: 'Code de vérification Bing Webmaster',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
