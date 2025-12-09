import type { Access, Where } from 'payload'
import { isAdmin, hasRole } from '@/collections/Users'


/**
 * Contrôles d'accès pour les collections de contenu
 * Basés sur les rôles : admin, editor, contributor, viewer
 */

// ===== READ ACCESS =====

/**
 * Tout le monde peut lire (public)
 * Utiliser pour les contenus affichés sur le site
 */
export const readPublic: Access = () => true

/**
 * Seuls les utilisateurs authentifiés peuvent lire
 */
export const readAuthenticated: Access = ({ req: { user } }) => {
  return !!user
}

/**
 * Admins et Éditeurs peuvent lire
 */
export const readAdminEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

/**
 * Seuls les admins peuvent lire
 */
export const readAdminOnly: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

// ===== CREATE ACCESS =====

/**
 * Admins, Éditeurs et Contributeurs peuvent créer
 */
export const createContent: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor', 'contributor'])
}

/**
 * Seuls Admins et Éditeurs peuvent créer
 */
export const createAdminEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

/**
 * Seuls les admins peuvent créer
 */
export const createAdminOnly: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

// ===== UPDATE ACCESS =====

/**
 * Admins et Éditeurs peuvent tout modifier
 * Contributeurs peuvent modifier uniquement ce qu'ils ont créé
 */
export const updateContent: Access = ({ req: { user } }) => {
  if (!user) return false

  if (hasRole(user, ['admin', 'editor'])) {
    return true
  }

  if (hasRole(user, 'contributor')) {
    // Les contributeurs ne peuvent modifier que leurs propres contenus
    return {
      createdBy: { equals: user.id },
    } as Where
  }

  return false
}

/**
 * Seuls Admins et Éditeurs peuvent modifier
 */
export const updateAdminEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

/**
 * Seuls les admins peuvent modifier
 */
export const updateAdminOnly: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

// ===== DELETE ACCESS =====

/**
 * Admins et Éditeurs peuvent tout supprimer
 * Contributeurs peuvent supprimer uniquement ce qu'ils ont créé
 */
export const deleteContent: Access = ({ req: { user } }) => {
  if (!user) return false

  if (hasRole(user, ['admin', 'editor'])) {
    return true
  }

  if (hasRole(user, 'contributor')) {
    // Les contributeurs ne peuvent supprimer que leurs propres contenus
    return {
      createdBy: { equals: user.id },
    } as Where
  }

  return false
}

/**
 * Seuls Admins et Éditeurs peuvent supprimer
 */
export const deleteAdminEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

/**
 * Seuls les admins peuvent supprimer
 */
export const deleteAdminOnly: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

// ===== PRESETS DE COLLECTIONS =====

/**
 * Preset pour contenu standard (articles, pages, etc.)
 * - Public peut lire
 * - Admin/Editor/Contributor peuvent créer
 * - Admin/Editor peuvent tout modifier, Contributor leurs propres contenus
 * - Admin/Editor peuvent tout supprimer, Contributor leurs propres contenus
 */
export const standardContentAccess = {
  read: readPublic,
  create: createContent,
  update: updateContent,
  delete: deleteContent,
}

/**
 * Preset pour contenu géré uniquement par Admin/Editor
 * - Public peut lire
 * - Admin/Editor peuvent créer
 * - Admin/Editor peuvent modifier
 * - Admin/Editor peuvent supprimer
 */
export const managedContentAccess = {
  read: readPublic,
  create: createAdminEditor,
  update: updateAdminEditor,
  delete: deleteAdminEditor,
}

/**
 * Preset pour contenu sensible (paramètres, configuration)
 * - Utilisateurs authentifiés peuvent lire
 * - Seuls les admins peuvent créer/modifier/supprimer
 */
export const sensitiveContentAccess = {
  read: readAuthenticated,
  create: createAdminOnly,
  update: updateAdminOnly,
  delete: deleteAdminOnly,
}

/**
 * Preset pour médias
 * - Public peut lire
 * - Admin/Editor/Contributor peuvent uploader
 * - Admin/Editor peuvent tout modifier/supprimer
 */
export const mediaAccess = {
  read: readPublic,
  create: createContent,
  update: updateAdminEditor,
  delete: updateAdminEditor,
}
