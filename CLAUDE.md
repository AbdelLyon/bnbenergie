# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commandes

```bash
pnpm dev              # Serveur de développement
pnpm devsafe          # Nettoyer .next et relancer (en cas de problème de cache)
pnpm build            # Build production
pnpm lint             # Linter le code
pnpm generate:types   # Régénérer payload-types.ts après modification du schéma Payload
pnpm generate:importmap  # Régénérer l'import map Payload

# Base de données (Docker)
pnpm db:start         # Démarrer PostgreSQL
pnpm db:stop          # Arrêter PostgreSQL
pnpm db:logs          # Voir les logs PostgreSQL
```

**Important** : après toute modification des collections ou globals Payload, toujours relancer `pnpm generate:types` pour mettre à jour `src/payload-types.ts`.

## Architecture

### Route groups Next.js App Router

- `src/app/(main)/` — site public (Navbar + Footer, layout principal)
- `src/app/(payload)/` — interface d'administration Payload CMS (`/admin`)

### Pattern Server Component / Client Component

Chaque section suit ce découpage :

1. **Server Component** (ex. `HomeHeader.tsx`) — appelle `payload-queries.ts` pour fetcher les données, passe la data en props
2. **Client Component** (`HomeHeaderClient.tsx`) — reçoit la data typée, gère l'interactivité et les animations

Les composants `*Client.tsx` portent la directive `'use client'` et ne font jamais de requêtes Payload directement.

### Couche données : `src/lib/payload-queries.ts`

Toutes les requêtes Payload passent par ce fichier. Chaque fonction est enveloppée dans `unstable_cache` de Next.js avec des tags définis dans `src/config/cache.ts`. Les intervalles de revalidation sont :
- `HIGH_FREQUENCY` (30s) — prix
- `MEDIUM_FREQUENCY` (60s) — contenus courants
- `LOW_FREQUENCY` (300s) — FAQ, garanties, navigation

### Revalidation ISR

Quand une collection est modifiée dans Payload, le hook `afterChange` (`src/lib/revalidate-hook.ts`) appelle `POST /api/revalidate` avec un secret. Ce endpoint (`src/app/api/revalidate/route.ts`) appelle `revalidatePath` sur les routes concernées.

Variables requises : `SERVER_URL` (ou `NEXT_PUBLIC_SERVER_URL`) et `REVALIDATION_SECRET`.

### Payload CMS

Collections définies dans `src/payload.config.ts` :
- **Fichiers séparés** dans `src/collections/` : Users, Media, PageHeaders, Services, Warranties, FinancialAids, InterventionZones
- **Inline** dans `payload.config.ts` : pricing-packs, projects, stats, about-cards, benefits, faqs
- **Globals** dans `src/globals/` : SiteSettings, Navigation

Tous les contenus administrables ont un champ `order` (tri) et utilisent `managedContentAccess` (`src/lib/access-control.ts`).

### SEO

**Les metadata SEO sont entièrement hardcodées** — ne jamais les connecter à Payload.

- `src/config/site.ts` — `SITE_CONFIG` : coordonnées, URLs, réseaux sociaux
- `src/config/metadata.ts` — `generateMetadata()` helper et `defaultMetadata`
- `src/config/seo-keywords.ts` — liste centralisée des mots-clés
- `src/components/shared/SEO/schemas/` — composants JSON-LD (LocalBusiness, Organization, WebSite, Service, Pricing)

Chaque page appelle `generateMetadata()` depuis `src/config/metadata.ts` pour construire ses métadonnées.

### Zones d'intervention dynamiques

`src/app/(main)/zones-intervention/[city]/page.tsx` génère statiquement une page par commune via `generateStaticParams()`, qui lit les zones depuis Payload. Le slug est généré avec `src/utils/slugify.ts`.

### Variables d'environnement

Validées au démarrage via Zod dans `src/lib/env.ts`. Utiliser `env.X` (importé de `@/lib/env`) plutôt que `process.env.X` directement.

Variables requises : `DATABASE_URL`, `PAYLOAD_SECRET` (≥32 chars), `REVALIDATION_SECRET` (≥16 chars), `BLOB_READ_WRITE_TOKEN`.
Variables optionnelles : `SMTP_HOST/PORT/USER/PASS`, `CONTACT_EMAIL`, `SERVER_URL`, `NEXT_PUBLIC_GOOGLE_VERIFICATION`.

### Formulaire de contact

Server Action dans `src/actions/contact.ts` — validation Zod + envoi via nodemailer. Si la config SMTP est absente, retourne un succès simulé (utile en dev).

### Animations

`src/components/shared/animations/` — composants réutilisables basés sur framer-motion :
- `AnimationOrchestrator` — anime une liste d'enfants en séquence
- `AnimatedCard` — carte avec animation d'entrée
- `OrchestratedSection` — section avec animation orchestrée

Utiliser `LazyComponents.tsx` pour les imports framer-motion afin d'éviter le chargement au démarrage.

### Images

`next/image` via `src/components/OptimizedImage.tsx`. Les médias sont stockés sur Vercel Blob. Formats AVIF et WebP activés. Les images distantes autorisées sont configurées dans `next.config.ts`.
