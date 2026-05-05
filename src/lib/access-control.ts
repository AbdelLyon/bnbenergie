import type { Access } from 'payload'
import { isAdmin, hasRole } from '@/collections/Users'

// ===== READ ACCESS =====

export const readPublic: Access = () => true

// ===== CREATE ACCESS =====

export const createContent: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor', 'contributor'])
}

export const createAdminEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

// ===== UPDATE ACCESS =====

export const updateAdminEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

export const updateAdminOnly: Access = ({ req: { user } }) => {
  return isAdmin(user)
}

// ===== DELETE ACCESS =====

export const deleteAdminEditor: Access = ({ req: { user } }) => {
  return hasRole(user, ['admin', 'editor'])
}

// ===== PRESETS DE COLLECTIONS =====

export const managedContentAccess = {
  read: readPublic,
  create: createAdminEditor,
  update: updateAdminEditor,
  delete: deleteAdminEditor,
}

export const mediaAccess = {
  read: readPublic,
  create: createContent,
  update: updateAdminEditor,
  delete: updateAdminEditor,
}
