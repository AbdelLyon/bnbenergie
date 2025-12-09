# BNB ÉNERGIE

Site web professionnel pour BNB ÉNERGIE, spécialiste de l'installation de panneaux solaires photovoltaïques dans l'Ain (01).

## 🚀 Quick Start

### Prérequis

- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-org/bnbenergie.git
cd bnbenergie

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local

# Générer les types Payload
pnpm generate:types

# Lancer en mode développement
pnpm dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## 📁 Structure du Projet

```
bnbenergie/
├── src/
│   ├── app/              # Routes Next.js (App Router)
│   ├── components/       # Composants React
│   ├── lib/              # Utilitaires et helpers
│   ├── config/           # Configuration centralisée
│   ├── collections/      # Collections Payload CMS
│   ├── globals/          # Globals Payload
│   └── services/         # Couche service
├── public/               # Assets statiques
└── scripts/              # Scripts utilitaires
```

Pour plus de détails, voir [ARCHITECTURE.md](./ARCHITECTURE.md).

## 🛠 Stack Technique

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, HeroUI, Tailwind CSS 4
- **CMS**: Payload CMS 3.x (Headless)
- **Base de données**: PostgreSQL
- **Storage**: Vercel Blob
- **Déploiement**: Vercel
- **Langage**: TypeScript (strict mode)

## 🔧 Scripts Disponibles

```bash
# Développement
pnpm dev              # Lancer le serveur de développement
pnpm devsafe          # Nettoyer .next et relancer

# Build & Production
pnpm build            # Build pour la production
pnpm start            # Lancer en mode production

# Payload CMS
pnpm generate:types   # Générer les types TypeScript
pnpm generate:importmap  # Générer l'import map
pnpm payload          # CLI Payload

# Qualité du code
pnpm lint             # Linter le code
```

## 🔐 Variables d'Environnement

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour la liste complète des variables requises.

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md) - Architecture détaillée du projet
- [Next.js Docs](https://nextjs.org/docs)
- [Payload CMS Docs](https://payloadcms.com/docs)

## 📄 License

MIT © BNB ÉNERGIE

## 👥 Contact

- **Site**: https://bnbenergie01.com
- **Email**: contact@bnbenergie.fr
- **Téléphone**: 07 81 25 11 25
