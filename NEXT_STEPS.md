# 🚀 Guide de Migration - Prochaines Étapes

## ✅ Ce qui a été fait

### 1. Collections Payload Créées

- ✅ **PageHeaders** - En-têtes de pages
- ✅ **Services** - Étapes du processus d'installation
- ✅ **Warranties** - Garanties et certifications
- ✅ **FinancialAids** - Aides financières
- ✅ **InterventionZones** - Zones d'intervention

### 2. Globals Payload Créés

- ✅ **SiteSettings** - Configuration du site (singleton)
- ✅ **Navigation** - Navigation et menus (singleton)

### 3. Outils Créés

- ✅ **Script de migration** (`scripts/migrate-json-to-payload.ts`)
- ✅ **Fonctions utilitaires** (`src/app/_lib/payload-queries.ts`)
- ✅ **Types TypeScript** générés automatiquement

### 4. Git

- ✅ Branche `feature/migrate-to-payload` créée
- ✅ Tous les changements committés et pushés

## 📋 Prochaines Étapes

### Étape 1: Démarrer la Base de Données (si nécessaire)

Si vous utilisez Docker pour PostgreSQL :

```bash
docker-compose up -d
```

Ou assurez-vous que votre base de données PostgreSQL est accessible via `DATABASE_URL` dans `.env.local`.

### Étape 2: Vérifier les Variables d'Environnement

Vérifiez que `.env.local` contient :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/bnbenergie
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Étape 3: Exécuter la Migration

```bash
# Avec pnpm (maintenant installé)
export PNPM_HOME="/home/majax/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

# Exécuter la migration
pnpm migrate
```

Cette commande va :

- ✅ Créer toutes les entrées dans Payload depuis les fichiers JSON
- ✅ Migrer les en-têtes de pages
- ✅ Migrer les services
- ✅ Migrer les garanties
- ✅ Migrer les aides financières
- ✅ Migrer les zones d'intervention
- ✅ Configurer les settings du site
- ✅ Configurer la navigation

### Étape 4: Accéder à l'Admin Payload

```bash
# Démarrer le serveur de développement
pnpm dev
```

Puis ouvrez : **http://localhost:3000/admin**

Vous devriez voir toutes vos collections remplies avec les données migrées !

### Étape 5: Mettre à Jour les Composants

Maintenant, il faut mettre à jour les composants pour utiliser Payload au lieu des fichiers JSON.

#### Exemple : Mettre à jour la page Services

**Avant** (avec JSON) :

```typescript
import servicesData from '@/data/servicesData.json';

export default function ServicesPage() {
  const { steps } = servicesData;
  // ...
}
```

**Après** (avec Payload) :

```typescript
import { getServices, getPageHeader } from '@/app/_lib/payload-queries';

export default async function ServicesPage() {
  const steps = await getServices();
  const header = await getPageHeader('services');
  // ...
}
```

#### Composants à Mettre à Jour

1. **Pages** :
   - `app/(main)/services/page.tsx` → utiliser `getServices()`
   - `app/(main)/garanties/page.tsx` → utiliser `getWarranties()`
   - `app/(main)/aides-financement/page.tsx` → utiliser `getFinancialAids()`
   - `app/(main)/zones-intervention/page.tsx` → utiliser `getInterventionZones()`
   - `app/(main)/page.tsx` → utiliser `getStats()`, `getAboutCards()`, etc.

2. **Composants Globaux** :
   - `app/_components/features/Navigation/Navbar.tsx` → utiliser `getNavigation()`
   - `app/_components/features/Footer/Footer.tsx` → utiliser `getNavigation()`, `getSiteSettings()`

### Étape 6: Tester

Pour chaque page mise à jour :

1. Vérifier que les données s'affichent correctement
2. Vérifier qu'il n'y a pas d'erreurs dans la console
3. Tester la navigation

### Étape 7: Supprimer les Fichiers JSON (Optionnel)

Une fois que tout fonctionne avec Payload :

```bash
# Sauvegarder d'abord (au cas où)
mkdir -p backup
cp -r src/data backup/

# Puis supprimer les fichiers JSON obsolètes
rm src/data/*.json
```

**⚠️ Attention** : Ne supprimez les JSON qu'après avoir vérifié que tout fonctionne !

### Étape 8: Merger vers Develop

Une fois que tout est testé et fonctionne :

```bash
git checkout develop
git merge feature/migrate-to-payload
git push origin develop
```

## 🛠️ Commandes Utiles

### Régénérer les Types TypeScript

```bash
pnpm payload generate:types
```

### Accéder à l'Admin Payload

```bash
pnpm dev
# Puis ouvrir http://localhost:3000/admin
```

### Voir les Logs de Migration

Le script de migration affiche des logs détaillés pour chaque étape.

## 📚 Documentation des Fonctions Utilitaires

Toutes les fonctions sont dans `src/app/_lib/payload-queries.ts` :

```typescript
// En-têtes de pages
await getPageHeader('services');

// Services
await getServices();

// Garanties (toutes ou par catégorie)
await getWarranties();
await getWarranties('certification');
await getWarrantiesByCategory(); // Retourne { certifications, products, commitments, process }

// Aides financières
await getFinancialAids();
await getFinancialAids('main');
await getFinancialAidsByCategory(); // Retourne { main, local, financing, roi }

// Zones d'intervention
await getInterventionZones();

// Globals
await getSiteSettings();
await getNavigation();

// Autres collections existantes
await getPricingPacks();
await getProjects();
await getStats();
await getAboutCards();
await getBenefits();
await getFaqs();
```

## ❓ Problèmes Courants

### La migration échoue

- Vérifier que la base de données est accessible
- Vérifier les variables d'environnement
- Vérifier que `PAYLOAD_SECRET` est défini

### Les types TypeScript ne sont pas à jour

```bash
pnpm payload generate:types
```

### Erreur "Cannot find module"

```bash
pnpm install
```

## 🎯 Résultat Final

Une fois terminé, vous aurez :

- ✅ Toutes les données gérées via Payload CMS
- ✅ Interface d'administration pour modifier le contenu
- ✅ Plus de fichiers JSON statiques
- ✅ Types TypeScript automatiques
- ✅ Meilleure maintenabilité

## 📞 Besoin d'Aide ?

Si vous rencontrez des problèmes, vérifiez :

1. Les logs de la migration
2. Les logs du serveur de développement
3. La console du navigateur
4. Les types TypeScript générés

Bonne migration ! 🚀
