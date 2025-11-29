/**
 * Script pour remplacer les valeurs hardcodées de revalidation
 * par des constantes centralisées
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');

const files = [
  'src/app/(main)/garanties/page.tsx',
  'src/app/(main)/realisations/page.tsx',
  'src/app/(main)/zones-intervention/page.tsx',
  'src/app/(main)/faq-panneaux-solaires/page.tsx',
  'src/app/(main)/nos-packs/page.tsx',
  'src/app/(main)/contact/page.tsx',
  'src/app/(main)/aides-financement/page.tsx',
];

files.forEach((file) => {
  const filePath = path.join(projectRoot, file);

  try {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Vérifier si la constante est déjà importée
    if (!content.includes('REVALIDATION_INTERVALS')) {
      // Ajouter l'import
      content = content.replace(
        /(import.*from.*\n)/,
        "$1import { REVALIDATION_INTERVALS } from '@/config/cache';\n"
      );
    }

    // Remplacer export const revalidate = 60;
    content = content.replace(
      /\/\/ Revalidate every 60 seconds \(ISR - Incremental Static Regeneration\)\nexport const revalidate = 60;/g,
      '// ISR - Incremental Static Regeneration\nexport const revalidate = REVALIDATION_INTERVALS.MEDIUM_FREQUENCY;'
    );

    // Variante sans commentaire
    content = content.replace(
      /export const revalidate = 60;/g,
      'export const revalidate = REVALIDATION_INTERVALS.MEDIUM_FREQUENCY;'
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated: ${file}`);
  } catch (error) {
    console.error(`❌ Error updating ${file}:`, error);
  }
});

console.log('\n✨ Done!');
