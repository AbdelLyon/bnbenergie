# Architecture BNB ÉNERGIE

## Vue d'ensemble

BNB ÉNERGIE est une application Next.js 15 moderne avec Payload CMS 3.x, conçue pour une entreprise d'installation de panneaux solaires.

## Stack Technologique

### Frontend
- **Framework**: Next.js 15.4.7 (App Router)
- **UI**: React 19.0.0
- **Bibliothèque UI**: HeroUI
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **Icônes**: Lucide React

### Backend
- **CMS**: Payload CMS 3.64.0 (Headless)
- **Base de données**: PostgreSQL
- **ORM**: Drizzle (via Payload)
- **Storage**: Vercel Blob Storage

### Developer Experience
- **Langage**: TypeScript 5.7.3 (mode strict)
- **Linting**: ESLint avec TypeScript
- **Package Manager**: pnpm

## Structure du Projet

```
src/
├── app/
│   ├── (main)/              # Routes publiques
│   │   ├── layout.tsx       # Layout principal (Navbar, Footer)
│   │   ├── page.tsx         # Page d'accueil
│   │   └── _components/     # Composants spécifiques aux routes
│   └── (payload)/           # Routes Admin & API
│       ├── admin/           # Interface d'administration Payload
│       └── api/             # Routes API et GraphQL
│
├── collections/             # Collections Payload CMS
│   ├── Users.ts
│   ├── Media.ts
│   ├── Services.ts
│   └── ...
│
├── globals/                 # Configurations globales Payload
│   ├── SiteSettings.ts
│   └── Navigation.ts
│
├── components/
│   ├── ui/                  # Composants UI abstraits
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   └── shared/              # Composants partagés
│       ├── ui/              # Composants de présentation
│       ├── layout/          # Composants de layout
│       ├── effects/         # Effets visuels
│       ├── Navigation/      # Navigation
│       └── SEO/             # SEO et données structurées
│
├── lib/                     # Utilitaires core
│   ├── env.ts               # Validation des variables d'environnement
│   ├── monitoring.ts        # Système de monitoring
│   ├── rate-limit.ts        # Rate limiting
│   ├── feature-flags.ts     # Feature flags
│   ├── payload-queries.ts   # Requêtes Payload optimisées
│   └── revalidate-hook.ts   # Hook de revalidation ISR
│
├── services/                # Couche d'abstraction service
│   └── content.service.ts   # Service de gestion du contenu
│
├── config/                  # Configuration centralisée
│   ├── cache.ts             # Configuration du cache et ISR
│   ├── database.ts          # Configuration de la base de données
│   ├── constants.ts         # Constantes de l'app
│   ├── metadata.ts          # Configuration SEO
│   └── hero.ts              # Configuration hero
│
├── actions/                 # Server Actions Next.js
│   └── contact.ts           # Action de contact
│
├── hooks/                   # Custom hooks React
│   ├── useScrollPosition.ts
│   ├── useImageCarousel.ts
│   └── index.ts
│
├── utils/                   # Fonctions utilitaires
│   ├── animations.ts
│   ├── cn.ts
│   ├── slugify.ts
│   └── getLucideIcon.tsx
│
└── types/                   # Types TypeScript
    └── index.ts
```

## Patterns Architecturaux

### 1. Server-Client Component Pattern

Séparation claire entre les composants serveur (data fetching) et client (interactivité).

**Exemple:**
```typescript
// Server Component
export async function About() {
  const data = await getAboutCards();
  return <AboutClient data={data} />;
}

// Client Component
'use client';
export function AboutClient({ data }) {
  // Logique client
}
```

### 2. Repository Pattern

Centralisation des requêtes de données dans `src/lib/payload-queries.ts`.

```typescript
export async function getServices(options?: QueryOptions) {
  return withPerformanceTracking('getServices', 'db_query', async () => {
    const payload = await getPayloadInstance();
    return payload.find({ collection: 'services', ...options });
  });
}
```

### 3. Service Layer

Abstraction de la logique métier dans `src/services/`.

```typescript
export class ContentService {
  async getServices() {
    try {
      const data = await getServices();
      return { success: true, data };
    } catch (error) {
      trackError(error);
      return { success: false, error };
    }
  }
}
```

### 4. ISR (Incremental Static Regeneration)

Utilisation d'ISR avec revalidation configurée centralement.

```typescript
import { REVALIDATION_INTERVALS } from '@/config/cache';

export const revalidate = REVALIDATION_INTERVALS.HIGH_FREQUENCY; // 30s
```

## Flux de Données

```
Requête Utilisateur
    ↓
Next.js Route (Server Component)
    ↓
Service Layer (optionnel)
    ↓
Payload Query Functions (lib/payload-queries.ts)
    ↓
Payload CMS Instance (avec cache)
    ↓
PostgreSQL Database
    ↓
Transformation des Données
    ↓
Props vers Client Component
    ↓
Rendu UI
```

## Performance & Optimisation

### Caching

- **ISR**: Revalidation configurée par page
- **React Query**: Cache côté client pour les mutations
- **Payload Instance**: Instance singleton en cache
- **Headers HTTP**: Cache agressif pour assets statiques

### Monitoring

Système de tracking de performance intégré:

```typescript
import { withPerformanceTracking } from '@/lib/monitoring';

const result = await withPerformanceTracking(
  'operationName',
  'db_query',
  async () => {
    // Opération à mesurer
  }
);
```

### Database

Pool de connexions optimisé:

```typescript
db: postgresAdapter({
  pool: {
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
});
```

## Sécurité

### Variables d'Environnement

Validation runtime avec Zod:

```typescript
import { env } from '@/lib/env';
// env.DATABASE_URL est validé et typé
```

### Headers de Sécurité

- HSTS
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy
- Permissions-Policy

### Rate Limiting

Protection des endpoints sensibles:

```typescript
const rateLimitResult = await applyRateLimit(request, 'revalidation');
if (!rateLimitResult.success) {
  return new Response('Too Many Requests', { status: 429 });
}
```

### CSRF

Server Actions avec tokens automatiques (Next.js)

## Feature Flags

Système de feature flags pour déploiements progressifs:

```typescript
import { isFeatureEnabled } from '@/lib/feature-flags';

if (isFeatureEnabled('NEW_PRICING_UI')) {
  return <NewPricingUI />;
}
```

## Error Handling

### Error Boundaries

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Service Layer

Gestion centralisée des erreurs:

```typescript
const result = await contentService.getServices();
if (!result.success) {
  // Gérer l'erreur
}
```

## Best Practices

### 1. Types

- Utiliser les types générés par Payload (`payload-types.ts`)
- Strict mode TypeScript activé
- Pas de `any` sauf si absolument nécessaire

### 2. Imports

```typescript
// Utiliser les alias
import { Button } from '@/components/ui';
import { env } from '@/lib/env';
import { CACHE_TAGS } from '@/config/cache';
```

### 3. Composants

- Préférer Server Components par défaut
- Utiliser `'use client'` uniquement quand nécessaire
- Abstraire les bibliothèques UI externes

### 4. Performance

- Paralléliser les requêtes avec `Promise.all()`
- Utiliser ISR pour le contenu semi-statique
- Optimiser les images avec Next.js Image

### 5. Sécurité

- Valider toutes les entrées utilisateur avec Zod
- Utiliser `env` au lieu de `process.env` directement
- Appliquer rate limiting sur endpoints sensibles

## Déploiement

### Variables d'Environnement Requises

```bash
# Base de données
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=...

# Revalidation
REVALIDATION_SECRET=...
SERVER_URL=https://...

# Storage
BLOB_READ_WRITE_TOKEN=...

# SMTP (optionnel)
SMTP_HOST=...
SMTP_USER=...
SMTP_PASS=...
```

### Build

```bash
pnpm build
```

### Production

L'application est optimisée pour Vercel avec:
- Edge Functions pour certaines routes
- Automatic Image Optimization
- ISR pour les pages dynamiques

## Maintenance

### Logs

Les métriques de performance sont automatiquement loggées en développement:

```bash
[METRIC] 🔍 getServices: 245ms
```

### Monitoring

En production (après configuration de Sentry):
- Tracking automatique des erreurs
- Métriques de performance
- Stack traces détaillées

## Migration Future

Grâce à l'architecture en couches:

1. **Migrer le CMS**: Remplacer uniquement `src/lib/payload-queries.ts`
2. **Migrer la UI**: Remplacer uniquement `src/components/ui/*`
3. **Migrer la DB**: Modifier uniquement `payload.config.ts`

## Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [React Server Components](https://react.dev/reference/react/use-server)
