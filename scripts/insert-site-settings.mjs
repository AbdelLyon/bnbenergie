import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function insertSiteSettings() {
  try {
    // Récupérer les credentials depuis les arguments
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
      console.error('❌ Usage: node scripts/insert-site-settings.mjs <email> <password>');
      process.exit(1);
    }

    console.log('📝 Connexion à Payload...');

    // Se connecter
    const loginResponse = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!loginResponse.ok) {
      throw new Error('Échec de la connexion. Vérifiez vos identifiants.');
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;

    console.log('✅ Connecté !');

    // Charger les données depuis le fichier JSON
    const dataPath = join(__dirname, '..', 'site-settings-data.json');
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));

    console.log('\n📝 Mise à jour des données site-settings...');

    // Appel API vers Payload avec authentification
    const response = await fetch('http://localhost:3000/api/globals/site-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Erreur API: ${response.status} - ${error}`);
    }

    const result = await response.json();
    console.log('\n✅ Données insérées avec succès !');
    console.log('\n📊 Résumé :');
    console.log(`- Site: ${result.siteName}`);
    console.log(`- Domain: ${result.domain}`);
    console.log(`- Contact: ${result.contactPhone}`);
    console.log(`- Mots-clés SEO: ${result.seoKeywords?.length || 0}`);

    console.log('\n🎉 Terminé ! Vérifiez sur http://localhost:3000/admin/globals/site-settings');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.log('\n💡 Assurez-vous que :');
    console.log('1. Le serveur dev tourne (pnpm dev)');
    console.log('2. Vos identifiants admin sont corrects');
    console.log('3. Vous avez modifié l\'adresse dans site-settings-data.json');
    process.exit(1);
  }
}

insertSiteSettings();
