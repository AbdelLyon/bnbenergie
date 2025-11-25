/**
 * Script to migrate site settings to Payload CMS
 * Run with: pnpm tsx scripts/migrate-site-settings.ts
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

// Import site config data
const siteConfig = await import('../src/data/siteConfig.json', { assert: { type: 'json' } })

async function migrateSiteSettings() {
  console.log('\n🚀 Starting Site Settings Migration...\n')

  const payload = await getPayload({ config })

  try {
    const settings = siteConfig.default

    const siteSettingsData = {
      siteName: settings.siteName,
      businessName: settings.businessName,
      domain: settings.domain,
      contact: {
        phone: settings.contact.phone,
        phone_href: settings.contact.phone_href,
        email: settings.contact.email,
        email_href: settings.contact.email_href,
      },
      address: {
        street: settings.address.street,
        city: settings.address.city,
        locality: settings.address.locality,
        region: settings.address.region,
        zip: settings.address.zip,
        country: settings.address.country,
      },
      geo: {
        latitude: settings.geo.latitude,
        longitude: settings.geo.longitude,
      },
      social: {
        facebook: settings.social?.facebook || '',
        instagram: settings.social?.instagram || '',
        linkedin: settings.social?.linkedin || '',
        twitter: settings.social?.twitter || '',
      },
      seo: {
        title: settings.seo.title,
        titleTemplate: settings.seo.titleTemplate,
        description: settings.seo.description,
        keywords: settings.seo.keywords?.map((keyword: string) => ({ keyword })) || [],
      },
      verification: {
        google: settings.verification?.google || '',
        bing: settings.verification?.bing || '',
      },
    }

    console.log('📊 Migrating Site Settings:')
    console.log(`  - Site Name: ${siteSettingsData.siteName}`)
    console.log(`  - Business: ${siteSettingsData.businessName}`)
    console.log(`  - Phone: ${siteSettingsData.contact.phone}`)
    console.log(`  - Email: ${siteSettingsData.contact.email}`)
    console.log()

    // Update the site-settings global
    await payload.updateGlobal({
      slug: 'site-settings',
      data: siteSettingsData,
    })

    console.log('✅ Site Settings migrated successfully!\n')
    console.log('✨ Done! You can now view the settings at http://localhost:3000/admin/globals/site-settings')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

migrateSiteSettings()
