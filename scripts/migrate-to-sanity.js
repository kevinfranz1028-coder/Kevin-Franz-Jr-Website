/**
 * Migration Script: Import existing content into Sanity
 * This will import all timeline years, games, and updates from markdown files
 */

const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'q1z27lr2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN, // Required for write operations
})

// Helper to convert markdown frontmatter to Sanity document
function parseMarkdownFile(filePath, type) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const {data, content} = matter(fileContent)

  return {
    _type: type,
    ...data,
    body: content,
  }
}

// Import Timeline Years
async function importTimeline() {
  console.log('📅 Importing Basketball Timeline...')
  const timelineDir = path.join(__dirname, '../src/timeline')
  const files = fs.readdirSync(timelineDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    try {
      const filePath = path.join(timelineDir, file)
      const data = parseMarkdownFile(filePath, 'timelineYear')

      // Create document in Sanity
      const result = await client.create({
        ...data,
        _id: `timeline-${data.year}`.replace(/[^a-zA-Z0-9-]/g, '-'),
      })

      console.log(`  ✓ Imported: ${data.year} - ${data.grade}`)
    } catch (error) {
      console.error(`  ✗ Failed to import ${file}:`, error.message)
    }
  }
}

// Import Games
async function importGames() {
  console.log('🏀 Importing Games...')
  const gamesDir = path.join(__dirname, '../src/games')
  const files = fs.readdirSync(gamesDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    try {
      const filePath = path.join(gamesDir, file)
      const data = parseMarkdownFile(filePath, 'game')

      // Create slug from filename
      const slug = file.replace('.md', '')

      const result = await client.create({
        ...data,
        _id: `game-${slug}`,
      })

      console.log(`  ✓ Imported: ${data.opponent || slug}`)
    } catch (error) {
      console.error(`  ✗ Failed to import ${file}:`, error.message)
    }
  }
}

// Import Updates/Blog Posts
async function importUpdates() {
  console.log('📝 Importing Updates...')
  const updatesDir = path.join(__dirname, '../src/updates')
  const files = fs.readdirSync(updatesDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    try {
      const filePath = path.join(updatesDir, file)
      const {data, content} = matter(fs.readFileSync(filePath, 'utf-8'))

      // Create slug from filename if not in frontmatter
      const slug = data.slug || file.replace('.md', '')

      const result = await client.create({
        _type: 'update',
        _id: `update-${slug}`,
        title: data.title,
        slug: {
          _type: 'slug',
          current: slug,
        },
        date: data.date,
        summary: data.summary || data.description || '',
        body: [
          {
            _type: 'block',
            _key: 'body',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: content,
              },
            ],
          },
        ],
        tags: data.tags || [],
      })

      console.log(`  ✓ Imported: ${data.title}`)
    } catch (error) {
      console.error(`  ✗ Failed to import ${file}:`, error.message)
    }
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting migration to Sanity...\n')

  // Check for auth token
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ Error: SANITY_AUTH_TOKEN not found!')
    console.log('\nTo run this migration:')
    console.log('1. Go to: https://www.sanity.io/manage/personal/project/q1z27lr2/api')
    console.log('2. Create a new token with "Editor" permissions')
    console.log('3. Run: SANITY_AUTH_TOKEN=your_token_here node scripts/migrate-to-sanity.js')
    process.exit(1)
  }

  try {
    await importTimeline()
    console.log()
    await importGames()
    console.log()
    await importUpdates()
    console.log()
    console.log('✅ Migration complete!')
    console.log('🎉 Check your Sanity Studio: https://kevin-franz-jr.sanity.studio/')
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run migration
migrate()
