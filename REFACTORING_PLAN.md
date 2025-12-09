# Plan de Refactorisation - Architecture et Qualité du Code

## ✅ Déjà fait

### 1. Nettoyage du code mort (knip)
- ✅ Suppression de 11 fichiers inutilisés
- ✅ Désinstallation de 6 dépendances inutilisées
- ✅ Nettoyage des exports non utilisés

### 2. Refactorisation du composant Pricing
- ✅ Décomposition en sous-composants :
  - `PricingHeader` - Badge et prix
  - `PricingDetails` - Nom, description, prix barré
  - `PricingFeatures` - Liste des fonctionnalités
  - `PricingCTA` - Bouton d'action
  - `PricingFooter` - Note et tags
- ✅ Utilisation des composants Theme (`ThemeSection`, `ThemeText`)
- ✅ Séparation logique/vue

### 3. Amélioration des composants Theme
- ✅ `ThemeSection` - Accepte maintenant les attributs HTML (id, etc.)
- ✅ `ThemeText` - Composant de texte thématisé
- ✅ `ThemeCard` - Carte thématisée

## 🔄 En cours

### 4. Correction du build
- ❌ Erreur MODULE_NOT_FOUND à résoudre
- 🔍 Vérifier les imports manquants

## 📋 À faire

### 5. Refactorisation des autres pages

#### Page Contact (`/contact`)
**Analyse** : Formulaire + carte + stats
**Actions** :
- Extraire `ContactForm` component
- Extraire `ContactInfo` component
- Extraire `ContactMap` component
- Séparer la logique du formulaire (validation, soumission)

#### Page Services (`/services`)
**Analyse** : Liste de services avec étapes
**Actions** :
- Créer `ServiceCard` component réutilisable
- Extraire `ServiceSteps` component
- Utiliser `ThemeSection` et `ThemeText`

#### Page Garanties (`/garanties`)
**Analyse** : Cartes de garanties
**Actions** :
- Simplifier `WarrantyCard`
- Créer un layout grid réutilisable
- Utiliser les composants Theme

#### Page Aides Financement (`/aides-financement`)
**Analyse** : Cartes d'aides
**Actions** :
- Refactoriser `AidCard`
- Extraire la logique de calcul
- Créer des sous-composants

#### Page Zones d'Intervention (`/zones-intervention`)
**Analyse** : Carte interactive + liste de zones
**Actions** :
- Extraire `ZoneCard` component
- Séparer la logique de filtrage
- Créer `ZoneMap` component

#### Page FAQ (`/faq-panneaux-solaires`)
**Analyse** : Accordion FAQ
**Actions** :
- Utiliser HeroUI Accordion directement
- Créer `FAQItem` component
- Ajouter filtrage par catégorie

#### Page Réalisations (`/realisations`)
**Analyse** : Grille de projets
**Actions** :
- Déjà bien structuré avec `ProjectCard`
- Ajouter filtrage/tri
- Améliorer les animations

### 6. Patterns à appliquer partout

#### Séparation Logique/Vue
```tsx
// ❌ Avant : Tout mélangé
export function MyComponent() {
  const [data, setData] = useState();
  const handleClick = () => { /* logique */ };

  return <div>{/* JSX complexe */}</div>
}

// ✅ Après : Séparé
// hooks/useMyLogic.ts
export function useMyLogic() {
  const [data, setData] = useState();
  const handleClick = () => { /* logique */ };
  return { data, handleClick };
}

// MyComponent.tsx
export function MyComponent() {
  const { data, handleClick } = useMyLogic();
  return <div>{/* JSX simple */}</div>
}
```

#### Composants atomiques
- Un composant = une responsabilité
- Maximum 50 lignes par composant
- Props typées et documentées

#### Réutilisation
- Utiliser `ThemeSection`, `ThemeText`, `ThemeCard`
- Créer des composants partagés dans `/shared/ui`
- Éviter la duplication de code

### 7. Structure cible

```
src/
├── app/
│   └── (main)/
│       ├── _components/          # Composants partagés entre pages
│       │   ├── Benefits/
│       │   │   ├── Benefits.tsx           # Server component
│       │   │   ├── BenefitsClient.tsx     # Client wrapper
│       │   │   └── components/            # Sous-composants
│       │   │       ├── BenefitsList.tsx
│       │   │       └── BenefitsCTA.tsx
│       │   └── Pricing/
│       │       ├── Pricing.tsx
│       │       ├── PricingClient.tsx
│       │       └── components/
│       │           ├── PricingCard.tsx
│       │           ├── PricingHeader.tsx
│       │           ├── PricingDetails.tsx
│       │           ├── PricingFeatures.tsx
│       │           ├── PricingCTA.tsx
│       │           └── PricingFooter.tsx
│       └── contact/
│           ├── page.tsx
│           ├── ContactPageContent.tsx
│           └── components/              # Composants spécifiques à la page
│               ├── ContactForm.tsx
│               ├── ContactInfo.tsx
│               └── ContactMap.tsx
├── components/
│   └── shared/
│       ├── ui/                    # Composants UI réutilisables
│       │   ├── ThemeCard.tsx
│       │   ├── ThemeSection.tsx
│       │   ├── ThemeText.tsx
│       │   ├── StatCard.tsx
│       │   └── ...
│       ├── layout/                # Composants de layout
│       ├── effects/               # Effets visuels
│       └── animations/            # Animations
└── hooks/                         # Custom hooks (logique réutilisable)
    ├── useContactForm.ts
    ├── useZoneFilter.ts
    └── ...
```

## 🎯 Objectifs de qualité

1. **Maintenabilité** : Code facile à comprendre et modifier
2. **Réutilisabilité** : Composants DRY (Don't Repeat Yourself)
3. **Testabilité** : Logique séparée, facile à tester
4. **Performance** : Server components par défaut, client uniquement si nécessaire
5. **Type Safety** : Props typées, pas de `any`
6. **Accessibilité** : Sémantique HTML, ARIA labels

## 📊 Métriques cibles

- ✅ Composants < 50 lignes
- ✅ Pas de duplication de code
- ✅ 100% des props typées
- ✅ Séparation logique/vue
- ✅ Build sans erreurs
- ✅ 0 warnings ESLint
