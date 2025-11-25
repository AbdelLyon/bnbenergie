/**
 * Script to migrate navigation data to Payload CMS
 * Run with: pnpm tsx scripts/migrate-navigation.ts
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

// Import navigation data
const megaMenuData = await import('../src/data/megaMenuData.js')

async function migrateNavigation() {
  console.log('\n🚀 Starting Navigation Migration...\n')

  const payload = await getPayload({ config })

  try {
    // Prepare main navigation items
    const mainNavItems = megaMenuData.megaMenuData.menuCategories
      .filter((item: any) => item.type === 'link')
      .map((item: any, index: number) => ({
        label: item.label,
        href: item.href,
        icon: item.icon || 'Circle',
        order: index,
      }))

    // Prepare mega menu items
    const megaMenuItems = megaMenuData.megaMenuData.menuCategories
      .filter((item: any) => item.type === 'mega')
      .map((item: any, index: number) => ({
        title: item.label,
        description: item.description || '',
        icon: item.icon || 'Grid',
        order: mainNavItems.length + index,
        sections: item.sections?.map((section: any) => ({
          title: section.title,
          links: section.links?.map((link: any) => ({
            label: link.label,
            href: link.href,
            description: link.description || '',
            icon: link.icon || 'ArrowRight',
          })) || [],
        })) || [],
      }))

    console.log('📊 Migration Summary:')
    console.log(`  - Main Nav Items: ${mainNavItems.length}`)
    console.log(`  - Mega Menu Items: ${megaMenuItems.length}`)
    console.log()

    // Update the navigation global
    await payload.updateGlobal({
      slug: 'navigation',
      data: {
        mainNav: mainNavItems,
        megaMenu: megaMenuItems,
      },
    })

    console.log('✅ Navigation migrated successfully!\n')

    // Display migrated data
    console.log('📋 Main Navigation:')
    mainNavItems.forEach((item: any) => {
      console.log(`  ✓ ${item.label} → ${item.href}`)
    })

    console.log('\n📋 Mega Menu:')
    megaMenuItems.forEach((item: any) => {
      console.log(`  ✓ ${item.title} (${item.sections?.length || 0} sections)`)
      item.sections?.forEach((section: any) => {
        console.log(`    • ${section.title}: ${section.links?.length || 0} links`)
      })
    })

    console.log('\n✨ Done! You can now view the navigation at http://localhost:3000/admin/globals/navigation')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

migrateNavigation()
