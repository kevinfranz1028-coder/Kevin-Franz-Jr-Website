/**
 * Migration Script: Import website pages into Sanity
 * This will import all page content from JSON files
 */

const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'q1z27lr2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN, // Required for write operations
})

// Helper function to retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 4) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      const delay = Math.pow(2, i) * 1000 // 1s, 2s, 4s, 8s
      console.log(`    ⏳ Retry ${i + 1}/${maxRetries} after ${delay/1000}s...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Import Pages
async function importPages() {
  console.log('📄 Importing Website Pages...')
  const pagesDir = path.join(__dirname, '../src/_data/pages')
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'))

  for (const file of files) {
    try {
      const filePath = path.join(pagesDir, file)
      const pageId = file.replace('.json', '')
      const pageData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

      // Create document in Sanity with retry logic
      const result = await retryWithBackoff(async () => {
        return await client.create({
          _type: 'websitePage',
          _id: `page-${pageId}`,
          pageId: pageId,
          ...pageData,
        })
      })

      console.log(`  ✓ Imported: ${pageId} (${pageData.title || pageId})`)
    } catch (error) {
      console.error(`  ✗ Failed to import ${file}:`, error.message)
    }
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting pages migration to Sanity...\n')

  // Check for auth token
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ Error: SANITY_AUTH_TOKEN not found!')
    console.log('\nTo run this migration:')
    console.log('SANITY_AUTH_TOKEN=your_token node scripts/migrate-pages-to-sanity.js')
    process.exit(1)
  }

  try {
    await importPages()
    console.log()
    console.log('✅ Pages migration complete!')
    console.log('🎉 Check your Sanity Studio: https://kevin-franz-jr.sanity.studio/')
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run migration
migrate()
