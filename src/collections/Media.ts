import type { CollectionConfig } from 'payload'
import { mediaAccess } from '@/lib/access-control'

export const Media: CollectionConfig = {
  slug: 'media',
  access: mediaAccess,
  admin: {
    group: 'Médias',
  },
  labels: {
    singular: 'Média',
    plural: 'Médias',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Texte alternatif',
    },
  ],
  upload: true,
}

