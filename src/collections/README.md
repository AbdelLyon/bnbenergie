# Collections Payload CMS

Ce dossier contient toutes les collections Payload CMS pour le site BNB Énergie.

## 📁 Structure

### Collections de Contenu

#### `PageHeaders.ts`

En-têtes et métadonnées pour chaque page du site.

- **Champs** : pageSlug, title, subtitle, description, badge, icon
- **Usage** : Affichage des headers de pages

#### `Services.ts`

Étapes du processus d'installation de panneaux solaires.

- **Champs** : number, icon, title, subtitle, description, highlights, duration, gradient, order
- **Usage** : Page Services

#### `Warranties.ts`

Garanties, certifications et engagements qualité.

- **Champs** : icon, badge, title, subtitle, description, highlights, features, warrantyDetails, gradient, category, order
- **Catégories** : certification, product, commitment, process
- **Usage** : Page Garanties

#### `FinancialAids.ts`

Aides financières et solutions de financement.

- **Champs** : icon, badge, title, subtitle, description, gradient, conditions, amounts, features, payment, savings, link, category, order
- **Catégories** : main, local, financing, roi
- **Usage** : Page Aides & Financement

#### `InterventionZones.ts`

Zones géographiques d'intervention.

- **Champs** : zone, communes, gradient, order
- **Usage** : Page Zones d'Intervention

### Collections Existantes

#### `Users.ts`

Utilisateurs du CMS (authentification).

#### `Media.ts`

Gestion des médias (images, fichiers).

## 🌐 Globals

Les globals sont dans le dossier `src/globals/` :

- **SiteSettings** : Configuration globale du site
- **Navigation** : Navigation et menus

## 🔧 Utilisation

### Importer une collection

```typescript
import { Services } from './collections/Services';
```

### Ajouter à la config

```typescript
// src/payload.config.ts
import { Services } from './collections/Services';

export default buildConfig({
  collections: [
    Services,
    // ...
  ],
});
```

## 📝 Conventions

1. **Nommage** : PascalCase pour les fichiers et exports
2. **Slug** : kebab-case pour les slugs de collections
3. **Order** : Toutes les collections ont un champ `order` pour le tri
4. **Icons** : Utilisation des noms d'icônes Lucide
5. **Gradients** : Classes Tailwind CSS

## 🎨 Champs Communs

La plupart des collections partagent ces champs :

- `icon` : Nom de l'icône Lucide
- `title` : Titre principal
- `description` : Description détaillée
- `gradient` : Classes Tailwind pour le gradient
- `order` : Ordre d'affichage (number)

## 🔄 Régénérer les Types

Après modification d'une collection :

```bash
pnpm payload generate:types
```

Les types seront générés dans `src/payload-types.ts`.
