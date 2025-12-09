// Charger les variables d'environnement AVANT tout import
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
dotenvConfig({ path: resolve(process.cwd(), '.env.local') });

// Maintenant on peut importer Payload
import { getPayload } from 'payload';
import config from '../src/payload.config';

async function seedNosPacksPageHeader() {
  console.log('🚀 Démarrage de la migration des données...');

  const payload = await getPayload({ config });

  try {
    // Vérifier si l'entrée existe déjà
    const existing = await payload.find({
      collection: 'page-headers',
      where: {
        pageSlug: {
          equals: 'nos-packs',
        },
      },
    });

    if (existing.docs.length > 0) {
      console.log('ℹ️  L\'entrée "nos-packs" existe déjà, mise à jour...');
      await payload.update({
        collection: 'page-headers',
        id: existing.docs[0].id,
        data: {
          pageSlug: 'nos-packs',
          title: 'Nos Packs Photovoltaïques',
          subtitle: 'Des Solutions Adaptées à Vos Besoins',
          description: "Découvrez nos packs d'installation de panneaux solaires personnalisés pour répondre à tous vos besoins énergétiques dans l'Ain. Tarifs transparents, garanties incluses et accompagnement personnalisé de A à Z.",
          badge: 'Tarifs Transparents',
          icon: 'Package',
        },
      });
      console.log('✅ Entrée "nos-packs" mise à jour avec succès !');
    } else {
      console.log('📝 Création de l\'entrée "nos-packs"...');
      await payload.create({
        collection: 'page-headers',
        data: {
          pageSlug: 'nos-packs',
          title: 'Nos Packs Photovoltaïques',
          subtitle: 'Des Solutions Adaptées à Vos Besoins',
          description: "Découvrez nos packs d'installation de panneaux solaires personnalisés pour répondre à tous vos besoins énergétiques dans l'Ain. Tarifs transparents, garanties incluses et accompagnement personnalisé de A à Z.",
          badge: 'Tarifs Transparents',
          icon: 'Package',
        },
      });
      console.log('✅ Entrée "nos-packs" créée avec succès !');
    }

    console.log('🎉 Migration terminée !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  }
}

seedNosPacksPageHeader();
