import type { GlobalConfig } from 'payload';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    description: 'Configuration de la navigation du site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Navigation Principale',
          fields: [
            {
              name: 'mainNav',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: "Nom de l'icône Lucide (optionnel)",
                  },
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                },
              ],
              admin: {
                description: 'Liens de navigation principaux',
              },
            },
          ],
        },
        {
          label: 'Mega Menu',
          fields: [
            {
              name: 'megaMenu',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
                {
                  name: 'icon',
                  type: 'text',
                },
                {
                  name: 'sections',
                  type: 'array',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        {
                          name: 'label',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'href',
                          type: 'text',
                          required: true,
                        },
                        {
                          name: 'description',
                          type: 'text',
                        },
                        {
                          name: 'icon',
                          type: 'text',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                },
              ],
              admin: {
                description: 'Configuration du mega menu',
              },
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerNav',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Titre de la colonne',
                  },
                },
                {
                  name: 'links',
                  type: 'array',
                  required: true,
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'href',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'icon',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'order',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                },
              ],
              admin: {
                description: 'Navigation du footer',
              },
            },
          ],
        },
      ],
    },
  ],
};
