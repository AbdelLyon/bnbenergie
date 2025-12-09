import type { CollectionConfig } from 'payload'
import type { User } from '@/payload-types'

// Helper pour vérifier si un utilisateur a un rôle spécifique
export const hasRole = (user: User | null | undefined, roles: string | string[]): boolean => {
  if (!user) return false
  const userRole = user.role
  if (!userRole) return false

  const allowedRoles = Array.isArray(roles) ? roles : [roles]
  return allowedRoles.includes(userRole)
}

// Helper pour vérifier si c'est un admin
export const isAdmin = (user: User | null | undefined): boolean => {
  return hasRole(user, 'admin')
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'name'],
    group: 'Administration',
  },
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  auth: true,
  access: {
    // Seuls les admins peuvent créer des utilisateurs
    // Exception: si aucun utilisateur n'existe, permettre la création du premier admin
    create: ({ req: { user } }) => {
      if (!user) return true // Permet la création du premier utilisateur
      return isAdmin(user)
    },
    // Seuls les admins peuvent lire la liste de tous les utilisateurs
    // Les autres utilisateurs ne peuvent voir que leur propre profil
    read: ({ req: { user } }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      // Les utilisateurs non-admins ne peuvent voir que leur propre profil
      return {
        id: { equals: user.id },
      }
    },
    // Les admins peuvent tout modifier
    // Les autres utilisateurs peuvent modifier leur propre profil (sauf le rôle)
    update: ({ req: { user } }) => {
      if (!user) return false
      if (isAdmin(user)) return true
      // Les utilisateurs non-admins ne peuvent modifier que leur propre profil
      return {
        id: { equals: user.id },
      }
    },
    // Seuls les admins peuvent supprimer des utilisateurs
    delete: ({ req: { user } }) => isAdmin(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom complet',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      label: 'Rôle',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Éditeur',
          value: 'editor',
        },
        {
          label: 'Contributeur',
          value: 'contributor',
        },
        {
          label: 'Visualiseur',
          value: 'viewer',
        },
      ],
      // Seuls les admins peuvent modifier les rôles
      access: {
        create: ({ req: { user } }) => isAdmin(user),
        update: ({ req: { user } }) => isAdmin(user),
      },
      admin: {
        description: 'Admin: accès complet | Éditeur: gestion du contenu | Contributeur: création de contenu | Visualiseur: lecture seule',
      },
    },
    // Email ajouté automatiquement par auth: true
  ],
}
