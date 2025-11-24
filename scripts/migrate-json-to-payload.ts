/**
 * Script to migrate JSON data to Payload CMS
 * Run with: pnpm migrate
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local BEFORE importing config
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

console.log('Environment check:')
console.log('PAYLOAD_SECRET:', process.env['PAYLOAD_SECRET'] ? '✓ loaded' : '✗ missing')
console.log('DATABASE_URL:', process.env['DATABASE_URL'] ? '✓ loaded' : '✗ missing')

// NOW import after env is loaded
const { getPayload } = await import('payload')
const configModule = await import('../src/payload.config.js')
const config = configModule.default

// Import JSON data
const pricingData = await import('../src/data/pricingData.json', { assert: { type: 'json' } })
const aboutData = await import('../src/data/aboutData.json', { assert: { type: 'json' } })
const faqsData = await import('../src/data/faqsData.json', { assert: { type: 'json' } })
const realisationsData = await import('../src/data/realisationsData.json', { assert: { type: 'json' } })

async function migrate() {
  console.log('🚀 Starting migration...')

  const payload = await getPayload({ config })

  try {
    // 1. Migrate Pricing Packs
    console.log('\n📦 Migrating Pricing Packs...')
    for (let i = 0; i < pricingData.default.packs.length; i++) {
      const pack = pricingData.default.packs[i]
      if (!pack) continue
      await payload.create({
        collection: 'pricing-packs',
        data: {
          name: pack.name,
          panels: pack.panels,
          price: pack.price,
          originalPrice: pack.originalPrice || '',
          popular: pack.popular || false,
          features: pack.features.map((f: string) => ({ feature: f })),
          cta: pack.cta,
          order: i,
        },
      })
      console.log(`  ✓ Created: ${pack.name}`)
    }

    // 2. Migrate About Cards
    console.log('\n📋 Migrating About Cards...')
    const seoContent = aboutData.default.seoContent || []
    for (let i = 0; i < seoContent.length; i++) {
      const card = seoContent[i]
      if (!card) continue
      await payload.create({
        collection: 'about-cards',
        data: {
          icon: card.icon,
          title: card.title,
          content: card.content,
          stat: card.stat,
          statLabel: card.statLabel,
          gradient: card.gradient || '',
          order: i,
        },
      })
      console.log(`  ✓ Created: ${card.title}`)
    }

    // 3. Migrate Stats
    console.log('\n📊 Migrating Stats...')
    const stats = (aboutData.default as any).stats || []
    for (let i = 0; i < stats.length; i++) {
      const stat = stats[i]
      await payload.create({
        collection: 'stats',
        data: {
          icon: stat.icon,
          number: stat.number,
          label: stat.label,
          color: stat.color,
          order: i,
        },
      })
      console.log(`  ✓ Created: ${stat.label}`)
    }

    // 4. Migrate Benefits
    console.log('\n✨ Migrating Benefits...')
    const benefitsData = {
      benefits: [
        'Installation rapide et professionnelle',
        'Accompagnement personnalisé',
        'Garantie décennale',
        'Service après-vente réactif',
        'Maintenance préventive',
        'Suivi de production',
      ],
    }
    for (let i = 0; i < benefitsData.benefits.length; i++) {
      const benefit = benefitsData.benefits[i]
      if (!benefit) continue
      await payload.create({
        collection: 'benefits',
        data: {
          text: benefit,
          order: i,
        },
      } as any)
      console.log(`  ✓ Created: ${benefit}`)
    }

    // 5. Migrate FAQs
    console.log('\n❓ Migrating FAQs...')
    const faqs = Array.isArray(faqsData.default) ? faqsData.default : ((faqsData.default as any).faqs || [])
    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i]
      await payload.create({
        collection: 'faqs',
        data: {
          question: faq.question,
          answer: faq.answer,
          category: faq.category || '',
          order: i,
        },
      })
      console.log(`  ✓ Created: ${faq.question}`)
    }

    // 6. Migrate Projects (Note: images need to be uploaded separately)
    console.log('\n🏗️ Migrating Projects...')
    console.log('  ⚠️  Images need to be uploaded manually via admin panel')
    for (let i = 0; i < realisationsData.default.projects.length; i++) {
      const project = realisationsData.default.projects[i]
      if (!project) continue
      console.log(`  ℹ️  Project: ${project.title} (image: ${project.image})`)
      // Skip projects migration as images need manual upload
      // You can add them manually in the admin panel with proper images
    }

    console.log('\n✅ Migration completed successfully!')
    console.log('\n📝 Next steps:')
    console.log('  1. Go to http://localhost:3000/admin')
    console.log('  2. Upload images for Projects in the Media collection')
    console.log('  3. Create Project entries and link the uploaded images')
    console.log('  4. Refresh your frontend to see Payload data!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

migrate()
