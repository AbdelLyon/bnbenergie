import type { CollectionConfig } from 'payload'

export const PageHeaders: CollectionConfig = {
  slug: 'page-headers',
  admin: {
    useAsTitle: 'pageSlug',
    description: 'En-têtes et métadonnées pour chaque page du site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageSlug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Identifiant unique de la page (ex: home, services, contact)',
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
        description: 'Nom de l\'icône Lucide (ex: Sun, Zap, Shield)',
      },
    },
  ],
}
