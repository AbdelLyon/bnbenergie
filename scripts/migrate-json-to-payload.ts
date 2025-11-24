/**
 * Script de migration complète des données JSON vers Payload CMS
 * Run with: pnpm migrate
 */

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local BEFORE importing config
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

console.log('🔍 Environment check:');
console.log(
  'PAYLOAD_SECRET:',
  process.env['PAYLOAD_SECRET'] ? '✓ loaded' : '✗ missing'
);
console.log(
  'DATABASE_URL:',
  process.env['DATABASE_URL'] ? '✓ loaded' : '✗ missing'
);

// NOW import after env is loaded
const { getPayload } = await import('payload');
const configModule = await import('../src/payload.config.js');
const config = configModule.default;

// Helper to load JSON files
function loadJSON(filename: string) {
  const filePath = path.resolve(__dirname, '../src/data', filename);
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

async function migrate() {
  console.log('\n🚀 Starting complete migration...\n');

  const payload = await getPayload({ config });

  try {
    // ===== 1. MIGRATE PAGE HEADERS =====
    console.log('📄 Migrating Page Headers...');
    const headers = [
      { file: 'headerData.json', slug: 'home' },
      { file: 'servicesHeaderData.json', slug: 'services' },
      { file: 'garantiesHeaderData.json', slug: 'garanties' },
      { file: 'aidesHeaderData.json', slug: 'aides' },
      { file: 'zonesHeaderData.json', slug: 'zones' },
      { file: 'realisationsHeaderData.json', slug: 'realisations' },
      { file: 'faqHeaderData.json', slug: 'faq' },
      { file: 'contactHeaderData.json', slug: 'contact' },
    ];

    for (const { file, slug } of headers) {
      try {
        const data = loadJSON(file);
        await payload.create({
          collection: 'page-headers',
          data: {
            pageSlug: slug,
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            badge: data.badge || '',
            icon: data.icon || '',
          },
        });
        console.log(`  ✓ Created header for: ${slug}`);
      } catch (error) {
        console.log(`  ⚠️  Skipped ${slug}: ${error}`);
      }
    }

    // ===== 2. MIGRATE SERVICES =====
    console.log('\n🔧 Migrating Services...');
    const servicesData = loadJSON('servicesData.json');
    for (let i = 0; i < servicesData.steps.length; i++) {
      const step = servicesData.steps[i];
      await payload.create({
        collection: 'services',
        data: {
          number: step.number,
          icon: step.icon,
          title: step.title,
          subtitle: step.subtitle,
          description: step.description,
          highlights: step.highlights.map((text: string) => ({ text })),
          duration: step.duration,
          gradient: step.gradient,
          order: i,
        },
      });
      console.log(`  ✓ Created service: ${step.title}`);
    }

    // ===== 3. MIGRATE WARRANTIES =====
    console.log('\n🛡️ Migrating Warranties...');
    const garantiesData = loadJSON('garantiesData.json');

    // Certifications
    let order = 0;
    for (const cert of garantiesData.certifications.items) {
      await payload.create({
        collection: 'warranties',
        data: {
          icon: cert.icon,
          badge: cert.badge,
          title: cert.title,
          subtitle: cert.subtitle,
          description: cert.description,
          highlights: cert.highlights.map((text: string) => ({ text })),
          gradient: cert.gradient,
          category: 'certification',
          order: order++,
        },
      });
      console.log(`  ✓ Created certification: ${cert.title}`);
    }

    // Product Warranties
    for (const product of garantiesData.productWarranties.items) {
      await payload.create({
        collection: 'warranties',
        data: {
          icon: product.icon,
          title: product.title,
          description: product.warranties
            .map((w: any) => `${w.label}: ${w.duration} - ${w.description}`)
            .join('\n'),
          features: product.features.map((text: string) => ({ text })),
          warrantyDetails: product.warranties.map((w: any) => ({
            label: w.label,
            duration: w.duration,
            description: w.description,
          })),
          category: 'product',
          order: order++,
        },
      });
      console.log(`  ✓ Created product warranty: ${product.title}`);
    }

    // Commitments
    for (const commitment of garantiesData.commitments.items) {
      await payload.create({
        collection: 'warranties',
        data: {
          icon: commitment.icon,
          title: commitment.title,
          description: commitment.description,
          category: 'commitment',
          order: order++,
        },
      });
      console.log(`  ✓ Created commitment: ${commitment.title}`);
    }

    // ===== 4. MIGRATE FINANCIAL AIDS =====
    console.log('\n💰 Migrating Financial Aids...');
    const aidesData = loadJSON('aidesData.json');

    order = 0;
    // Main aids
    for (const aid of aidesData.main_aids.items) {
      await payload.create({
        collection: 'financial-aids',
        data: {
          icon: aid.icon,
          badge: aid.badge,
          title: aid.title,
          subtitle: aid.subtitle,
          description: aid.description,
          gradient: aid.gradient,
          conditions: aid.conditions?.map((text: string) => ({ text })) || [],
          amounts:
            aid.amounts?.map((a: any) => ({
              power: a.power,
              amount: a.amount,
              example: a.example,
              bestFor: a.bestFor,
            })) || [],
          payment: aid.payment || '',
          savings: aid.savings || '',
          category: 'main',
          order: order++,
        },
      });
      console.log(`  ✓ Created main aid: ${aid.title}`);
    }

    // Local aids
    for (const aid of aidesData.local_aids.items) {
      await payload.create({
        collection: 'financial-aids',
        data: {
          icon: aid.icon,
          title: aid.title,
          description: aid.description,
          link: aid.link || '',
          category: 'local',
          order: order++,
        },
      });
      console.log(`  ✓ Created local aid: ${aid.title}`);
    }

    // Financing options
    for (const option of aidesData.financing.options) {
      await payload.create({
        collection: 'financial-aids',
        data: {
          icon: option.icon,
          title: option.title,
          description: option.description,
          features: option.features.map((text: string) => ({ text })),
          category: 'financing',
          order: order++,
        },
      });
      console.log(`  ✓ Created financing option: ${option.title}`);
    }

    // ===== 5. MIGRATE INTERVENTION ZONES =====
    console.log('\n📍 Migrating Intervention Zones...');
    const zonesData = loadJSON('zonesData.json');

    for (let i = 0; i < zonesData.communes.groups.length; i++) {
      const group = zonesData.communes.groups[i];
      await payload.create({
        collection: 'intervention-zones',
        data: {
          zone: group.zone,
          communes: group.communes.map((name: string) => ({ name })),
          gradient: group.gradient,
          order: i,
        },
      });
      console.log(`  ✓ Created zone: ${group.zone}`);
    }

    // ===== 6. MIGRATE SITE SETTINGS =====
    console.log('\n⚙️ Migrating Site Settings...');
    const siteConfig = loadJSON('siteConfig.json');

    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: siteConfig.siteName,
        businessName: siteConfig.businessName,
        domain: siteConfig.domain,
        contact: siteConfig.contact,
        address: siteConfig.address,
        geo: siteConfig.geo,
        social: siteConfig.social,
        seo: {
          ...siteConfig.seo,
          keywords: siteConfig.seo.keywords.map((keyword: string) => ({
            keyword,
          })),
        },
        verification: siteConfig.verification,
      },
    });
    console.log('  ✓ Site settings updated');

    // ===== 7. MIGRATE NAVIGATION =====
    console.log('\n🧭 Migrating Navigation...');
    const navData = loadJSON('navData.json');

    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        mainNav:
          navData.menuItems?.map((link: any, i: number) => ({
            label: link.label,
            href: link.href,
            icon: link.icon || '',
            order: i,
          })) || [],
        footerNav: [], // Footer navigation will be handled separately if needed
      },
    });
    console.log('  ✓ Navigation updated');

    // ===== ALREADY MIGRATED (from previous script) =====
    console.log('\n✅ Previously migrated collections:');
    console.log('  - Pricing Packs');
    console.log('  - About Cards');
    console.log('  - Stats');
    console.log('  - Benefits');
    console.log('  - FAQs');
    console.log('  - Projects (images need manual upload)');

    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('  1. Go to http://localhost:3000/admin');
    console.log('  2. Verify all data has been imported correctly');
    console.log('  3. Upload images for Projects in the Media collection');
    console.log(
      '  4. Update components to fetch data from Payload instead of JSON'
    );

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
