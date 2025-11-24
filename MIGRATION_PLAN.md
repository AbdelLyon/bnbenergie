# Plan de Migration vers Payload CMS

## 🎯 Objectif

Migrer toutes les données statiques JSON de `src/data/` vers Payload CMS pour une gestion dynamique via l'interface d'administration.

## 📊 État Actuel

### Collections Payload Existantes

- ✅ `pricing-packs` - Tarifs
- ✅ `projects` - Réalisations
- ✅ `stats` - Statistiques
- ✅ `about-cards` - Cartes À Propos
- ✅ `benefits` - Avantages
- ✅ `faqs` - FAQ

### Fichiers JSON à Migrer (23 fichiers)

1. **Pages de Contenu**
   - `servicesData.json` (5.3 KB) - Étapes de service
   - `garantiesData.json` (9.9 KB) - Garanties et certifications
   - `aidesData.json` (10.7 KB) - Aides financières
   - `zonesData.json` (7.0 KB) - Zones d'intervention

2. **Headers de Pages**
   - `aidesHeaderData.json`
   - `contactHeaderData.json`
   - `faqHeaderData.json`
   - `garantiesHeaderData.json`
   - `realisationsHeaderData.json`
   - `servicesHeaderData.json`
   - `zonesHeaderData.json`
   - `headerData.json` (page d'accueil)

3. **Composants Globaux**
   - `footerData.json` - Footer
   - `navData.json` - Navigation
   - `megaMenuData.ts` - Mega menu
   - `siteConfig.json` - Configuration du site

4. **Autres Données**
   - `aboutData.json` - Section À Propos
   - `contactData.json` - Informations de contact
   - `homeFaqData.json` - FAQ page d'accueil
   - `pricingData.json` - Données de tarification (déjà en Payload)
   - `realisationsData.json` - Réalisations (déjà en Payload)
   - `statsData.json` - Stats (déjà en Payload)

## 📋 Collections Payload à Créer

### 1. **Services** (servicesData.json)

```typescript
{
  slug: 'services',
  fields: [
    { name: 'number', type: 'text' },
    { name: 'icon', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'highlights', type: 'array', fields: [{ name: 'text', type: 'text' }] },
    { name: 'duration', type: 'text' },
    { name: 'gradient', type: 'text' },
    { name: 'order', type: 'number' }
  ]
}
```

### 2. **Warranties** (garantiesData.json)

```typescript
{
  slug: 'warranties',
  fields: [
    { name: 'icon', type: 'text' },
    { name: 'badge', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'highlights', type: 'array' },
    { name: 'gradient', type: 'text' },
    { name: 'category', type: 'select', options: ['certification', 'product', 'commitment'] },
    { name: 'order', type: 'number' }
  ]
}
```

### 3. **Financial Aids** (aidesData.json)

```typescript
{
  slug: 'financial-aids',
  fields: [
    { name: 'icon', type: 'text' },
    { name: 'badge', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'gradient', type: 'text' },
    { name: 'conditions', type: 'array' },
    { name: 'amounts', type: 'array' },
    { name: 'category', type: 'select', options: ['main', 'local', 'financing'] },
    { name: 'order', type: 'number' }
  ]
}
```

### 4. **Intervention Zones** (zonesData.json)

```typescript
{
  slug: 'intervention-zones',
  fields: [
    { name: 'zone', type: 'text' },
    { name: 'communes', type: 'array', fields: [{ name: 'name', type: 'text' }] },
    { name: 'gradient', type: 'text' },
    { name: 'order', type: 'number' }
  ]
}
```

### 5. **Page Headers** (Global)

```typescript
{
  slug: 'page-headers',
  fields: [
    { name: 'pageSlug', type: 'text', unique: true },
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'badge', type: 'text' },
    { name: 'icon', type: 'text' }
  ]
}
```

### 6. **Site Settings** (Global - Singleton)

```typescript
{
  slug: 'site-settings',
  global: true,
  fields: [
    { name: 'siteName', type: 'text' },
    { name: 'siteDescription', type: 'textarea' },
    { name: 'contactPhone', type: 'text' },
    { name: 'contactEmail', type: 'email' },
    { name: 'address', type: 'group' },
    { name: 'socialLinks', type: 'array' },
    { name: 'businessHours', type: 'array' }
  ]
}
```

### 7. **Navigation** (Global - Singleton)

```typescript
{
  slug: 'navigation',
  global: true,
  fields: [
    { name: 'mainNav', type: 'array' },
    { name: 'megaMenu', type: 'array' },
    { name: 'footerNav', type: 'array' }
  ]
}
```

## 🔄 Étapes de Migration

### Phase 1: Préparation (Branche actuelle: feature/migrate-to-payload)

- [x] Créer les branches Git
- [ ] Créer les nouvelles collections Payload
- [ ] Tester les collections avec des données de test

### Phase 2: Migration des Données

- [ ] Créer un script de migration `scripts/migrate-json-to-payload.ts`
- [ ] Migrer les données JSON vers Payload via l'API
- [ ] Vérifier l'intégrité des données migrées

### Phase 3: Mise à Jour du Code

- [ ] Créer des fonctions utilitaires pour récupérer les données Payload
- [ ] Mettre à jour les composants pour utiliser Payload au lieu des JSON
- [ ] Remplacer les imports de fichiers JSON

### Phase 4: Tests

- [ ] Tester toutes les pages
- [ ] Vérifier que les données s'affichent correctement
- [ ] Tester l'interface d'administration Payload

### Phase 5: Nettoyage

- [ ] Supprimer les fichiers JSON obsolètes de `src/data/`
- [ ] Mettre à jour la documentation
- [ ] Merger vers develop puis main

## 📝 Ordre de Migration Recommandé

1. **Stats** - ✅ Déjà fait
2. **About Cards** - ✅ Déjà fait
3. **Benefits** - ✅ Déjà fait
4. **FAQs** - ✅ Déjà fait
5. **Pricing Packs** - ✅ Déjà fait
6. **Projects** - ✅ Déjà fait
7. **Page Headers** - Simple, peu de dépendances
8. **Services** - Structure claire
9. **Warranties** - Structure similaire aux services
10. **Financial Aids** - Structure complexe
11. **Intervention Zones** - Structure simple
12. **Site Settings** - Global singleton
13. **Navigation** - Global singleton, à faire en dernier

## 🛠️ Outils et Scripts

### Script de Migration

Créer `scripts/migrate-json-to-payload.ts` pour automatiser la migration:

- Lire les fichiers JSON
- Transformer les données si nécessaire
- Créer les entrées via l'API Payload
- Logger les résultats

### Fonctions Utilitaires

Créer `src/lib/payload-queries.ts`:

- `getPageHeader(slug)`
- `getServices()`
- `getWarranties()`
- `getFinancialAids()`
- `getInterventionZones()`
- `getSiteSettings()`
- `getNavigation()`

## ⚠️ Points d'Attention

1. **Relations** - Certaines données ont des relations (ex: FAQ avec catégories)
2. **Images** - Les images doivent être uploadées dans la collection Media
3. **Types TypeScript** - Régénérer `payload-types.ts` après chaque modification
4. **Cache** - Considérer la mise en cache des données Payload
5. **Performance** - Optimiser les requêtes pour éviter les N+1

## 🎯 Résultat Attendu

- ✅ Toutes les données gérées via Payload CMS
- ✅ Interface d'administration pour modifier le contenu
- ✅ Pas de fichiers JSON statiques
- ✅ Types TypeScript générés automatiquement
- ✅ Meilleure maintenabilité et évolutivité
