# Guide de Migration - Utilisation des Nouvelles Fonctionnalités

Ce guide explique comment utiliser toutes les nouvelles fonctionnalités implémentées.

## 1. Variables d'Environnement

### Avant
```typescript
const dbUrl = process.env['DATABASE_URL'];
const secret = process.env['PAYLOAD_SECRET'];
```

### Après
```typescript
import { env, hasSmtpConfig } from '@/lib/env';

const dbUrl = env.DATABASE_URL; // Validé et typé ✅
const secret = env.PAYLOAD_SECRET;

// Vérifier si la config SMTP est complète
if (hasSmtpConfig) {
  // Envoyer l'email
}
```

## 2. Constantes de Configuration

### Avant
```typescript
export const revalidate = 60; // Magic number
```

### Après
```typescript
import { REVALIDATION_INTERVALS } from '@/config/cache';

export const revalidate = REVALIDATION_INTERVALS.MEDIUM_FREQUENCY; // 60s
```

**Autres constantes disponibles**:
```typescript
import { CACHE_TAGS, CACHE_CONTROL } from '@/config/cache';
import { DATABASE_POOL_CONFIG, QUERY_LIMITS } from '@/config/database';
```

## 3. Requêtes Payload Optimisées

### Avant
```typescript
const services = await getServices(); // Récupère tout
```

### Après
```typescript
// Avec options
const services = await getServices({
  limit: 20,                    // Limiter les résultats
  select: ['title', 'icon'],    // Sélectionner les champs
  where: { active: true },      // Filtrer
  sort: '-createdAt',           // Trier
  page: 1                       // Pagination
});

// Performance tracking automatique ✅
```

## 4. Service Layer

### Avant
```typescript
try {
  const data = await getServices();
  // Utiliser data
} catch (error) {
  // Gérer l'erreur manuellement
}
```

### Après
```typescript
import { contentService } from '@/services/content.service';

const result = await contentService.getServices();

if (result.success) {
  // Utiliser result.data
} else {
  // Erreur déjà loggée et trackée ✅
  console.error(result.error);
}
```

## 5. Monitoring & Performance

### Wrapper Automatique

```typescript
import { withPerformanceTracking } from '@/lib/monitoring';

const data = await withPerformanceTracking(
  'ma-operation',
  'db_query',
  async () => {
    return await fetchData();
  }
);

// Logs automatiques en dev:
// [METRIC] 🔍 ma-operation: 245ms
```

### Tracking Manuel

```typescript
import { trackPerformance, trackError } from '@/lib/monitoring';

// Track une métrique
trackPerformance('operationName', 'api_call', 432);

// Track une erreur
try {
  await riskyOperation();
} catch (error) {
  trackError(error, { context: 'riskyOperation' });
  throw error;
}
```

## 6. Error Boundaries

### Utilisation Simple

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

function MyPage() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### Pour les Sections

```typescript
import { SectionErrorBoundary } from '@/components/ErrorBoundary';

function MyPage() {
  return (
    <div>
      <SectionErrorBoundary>
        <RiskySection />
      </SectionErrorBoundary>

      <SectionErrorBoundary>
        <AnotherSection />
      </SectionErrorBoundary>
    </div>
  );
}
```

## 7. Rate Limiting

### Dans une Route API

```typescript
import { applyRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  // Appliquer rate limiting
  const rateLimitResult = await applyRateLimit(request, 'contact');

  if (!rateLimitResult.success) {
    return new Response('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil((rateLimitResult.reset - Date.now()) / 1000))
      }
    });
  }

  // Continuer le traitement
}
```

### Types de Rate Limit Disponibles

```typescript
'api'          // 60 req/min - Routes API standard
'revalidation' // 10 req/min - Revalidation
'contact'      // 5 req/min - Formulaire de contact
'search'       // 30 req/min - Recherche
```

## 8. Composants UI Abstraits

### Avant
```typescript
import { Button } from '@heroui/button';
import { Card } from '@heroui/card';
```

### Après
```typescript
// Import centralisé
import { Button, Card, Accordion } from '@/components/ui';

// Même API, mais abstrait ✅
function MyComponent() {
  return (
    <Card>
      <Button>Cliquez</Button>
    </Card>
  );
}
```

## 9. Feature Flags

### Vérification Simple

```typescript
import { isFeatureEnabled } from '@/lib/feature-flags';

function MyComponent() {
  if (isFeatureEnabled('NEW_PRICING_UI')) {
    return <NewPricingUI />;
  }
  return <PricingUI />;
}
```

### Avec Hook (Client Component)

```typescript
'use client';

import { useFeatureFlag } from '@/lib/feature-flags';

function MyComponent() {
  const showNewUI = useFeatureFlag('NEW_PRICING_UI');

  return showNewUI ? <NewUI /> : <OldUI />;
}
```

### Avec Composant FeatureGate

```typescript
import { FeatureGate } from '@/lib/feature-flags';

function MyPage() {
  return (
    <FeatureGate
      flag="NEW_PRICING_UI"
      fallback={<OldPricingUI />}
    >
      <NewPricingUI />
    </FeatureGate>
  );
}
```

### Activer un Feature Flag

```bash
# Dans .env.local
NEXT_PUBLIC_FEATURE_NEW_PRICING_UI=true
```

## 10. React Query (Cache Client)

### Configuration Automatique

React Query est déjà configuré dans `src/app/providers.tsx`.

### Utilisation

```typescript
'use client';

import { useQuery } from '@tanstack/react-query';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await fetch('/api/services');
      return res.json();
    },
    // Configuration héritée du provider
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Utiliser data */}</div>;
}
```

## 11. Création d'une Nouvelle Page

### Template Recommandé

```typescript
// src/app/(main)/ma-page/page.tsx

import { Metadata } from 'next';
import { generateMetadata as generateMeta } from '@/config/metadata';
import { REVALIDATION_INTERVALS } from '@/config/cache';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Metadata SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    title: 'Titre de Ma Page',
    description: 'Description SEO',
    path: '/ma-page',
  });
}

// ISR
export const revalidate = REVALIDATION_INTERVALS.MEDIUM_FREQUENCY;

// Composant Server
export default async function MaPage() {
  // Récupérer les données
  const data = await getData();

  return (
    <ErrorBoundary>
      <MaPageContent data={data} />
    </ErrorBoundary>
  );
}
```

## 12. Création d'une Nouvelle Collection Payload

```typescript
// src/collections/MaCollection.ts

import type { CollectionConfig } from 'payload';
import { createRevalidateHook } from '../lib/revalidate-hook';

export const MaCollection: CollectionConfig = {
  slug: 'ma-collection',
  labels: {
    singular: 'Item',
    plural: 'Items',
  },
  access: {
    read: () => true, // Public
    create: ({ req }) => !!req.user, // Admin seulement
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [createRevalidateHook('ma-collection')],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
};
```

Puis ajouter à `payload.config.ts`:

```typescript
import { MaCollection } from './collections/MaCollection';

export default buildConfig({
  collections: [..., MaCollection],
});
```

## 13. Ajout d'une Fonction de Requête

```typescript
// Dans src/lib/payload-queries.ts

export async function getMaCollection(
  options?: QueryOptions
): Promise<MaCollection[]> {
  return withPerformanceTracking(
    'getMaCollection',
    'db_query',
    async () => {
      const payload = await getPayloadInstance();
      const result = await payload.find({
        collection: 'ma-collection',
        sort: options?.sort || 'order',
        limit: options?.limit ?? DEFAULT_QUERY_LIMIT,
        where: options?.where,
        select: options?.select,
        page: options?.page,
      });
      return result.docs;
    }
  );
}
```

## 14. Checklist Nouvelle Feature

Avant de déployer une nouvelle feature :

- [ ] Variables d'env validées dans `src/lib/env.ts` si nécessaire
- [ ] Constantes ajoutées dans `src/config/*` au lieu de valeurs hardcodées
- [ ] Performance tracking ajouté pour les opérations coûteuses
- [ ] Error boundaries autour des composants à risque
- [ ] Rate limiting sur les nouveaux endpoints sensibles
- [ ] Feature flag créé pour activation progressive
- [ ] Types TypeScript stricts (pas de `any`)
- [ ] Documentation mise à jour si nécessaire

## 15. Debugging & Logs

### En Développement

Les logs sont automatiques :

```bash
# Performance
[METRIC] 🔍 getServices: 245ms

# Erreurs
[ERROR] Database connection failed {...context}

# Feature Flags (au démarrage)
🚩 Feature Flags actifs:
NEW_PRICING_UI: false
SHOW_SUPPORT_CHAT: false
...
```

### Obtenir les Stats

```typescript
import { getPerformanceStats } from '@/lib/monitoring';

const stats = getPerformanceStats();
console.log(stats);
// {
//   dbQueryAvg: 245,
//   apiCallAvg: 156,
//   totalMetrics: 42,
//   totalErrors: 0
// }
```

## 🎯 Résumé

Toutes ces améliorations sont **déjà actives** et **prêtes à l'emploi**.

Il suffit d'importer les nouveaux modules et de suivre les patterns décrits dans ce guide.

Pour toute question, référez-vous à:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture complète
- [README.md](./README.md) - Guide de démarrage
- [IMPROVEMENTS.md](./IMPROVEMENTS.md) - Liste des améliorations
