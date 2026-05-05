/**
 * Validation et typage des variables d'environnement
 * Utilise Zod pour garantir que toutes les variables requises sont présentes au runtime
 */

import { z } from 'zod';

const envSchema = z.object({
  // Base de données
  DATABASE_URL: z.string().min(1, 'DATABASE_URL est requis'),

  // Payload CMS
  PAYLOAD_SECRET: z
    .string()
    .min(32, 'PAYLOAD_SECRET doit contenir au moins 32 caractères'),

  // SMTP (optionnel)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  CONTACT_EMAIL: z.string().email().optional(),

  // Revalidation
  REVALIDATION_SECRET: z
    .string()
    .min(16, 'REVALIDATION_SECRET doit contenir au moins 16 caractères'),

  // Storage
  BLOB_READ_WRITE_TOKEN: z.string().min(1, 'BLOB_READ_WRITE_TOKEN est requis'),

  // URLs
  SERVER_URL: z.string().optional(),
  NEXT_PUBLIC_SERVER_URL: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().optional(),

  // Environnement
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Vérifications SEO (optionnel)
  NEXT_PUBLIC_GOOGLE_VERIFICATION: z.string().optional(),
});

// Type inféré depuis le schéma
export type Env = z.infer<typeof envSchema>;

/**
 * Parse et valide les variables d'environnement
 * Lance une erreur si la validation échoue
 */
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map((err) => {
        return `  - ${err.path.join('.')}: ${err.message}`;
      });

      console.error('❌ Variables d\'environnement invalides ou manquantes:\n');
      console.error(missingVars.join('\n'));
      console.error('\n📝 Vérifiez votre fichier .env.local\n');

      throw new Error('Configuration d\'environnement invalide');
    }
    throw error;
  }
}

/**
 * Variables d'environnement validées et typées
 * Utilisez cette constante au lieu de process.env directement
 *
 * @example
 * import { env } from '@/lib/env';
 * const dbUrl = env.DATABASE_URL; // Type-safe et validé
 */
export const env = validateEnv();

/**
 * Vérifie si nous sommes en environnement de production
 */
export const isProduction = env.NODE_ENV === 'production';

/**
 * Vérifie si nous sommes en environnement de développement
 */
export const isDevelopment = env.NODE_ENV === 'development';

/**
 * Vérifie si la configuration SMTP est complète
 */
export const hasSmtpConfig = Boolean(
  env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS
);
