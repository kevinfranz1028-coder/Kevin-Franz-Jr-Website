/**
 * Re-import Timeline and Games with clean data
 * This will delete existing timeline/games and re-import from markdown
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
  token: process.env.SANITY_AUTH_TOKEN,
})

// Helper function to retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 4) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      const delay = Math.pow(2, i) * 1000
      console.log(`    ⏳ Retry ${i + 1}/${maxRetries} after ${delay/1000}s...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Parse markdown file
function parseMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const {data, content} = matter(fileContent)

  return {
    frontmatter: data,
    body: content
  }
}

// Delete all timeline documents
async function deleteTimeline() {
  console.log('🗑️  Deleting existing timeline documents...')
  const query = `*[_type == "timelineYear"]._id`
  const ids = await client.fetch(query)

  for (const id of ids) {
    try {
      await retryWithBackoff(async () => {
        await client.delete(id)
      })
      console.log(`  ✓ Deleted: ${id}`)
    } catch (error) {
      console.error(`  ✗ Failed to delete ${id}:`, error.message)
    }
  }
}

// Delete all game documents
async function deleteGames() {
  console.log('🗑️  Deleting existing game documents...')
  const query = `*[_type == "game"]._id`
  const ids = await client.fetch(query)

  for (const id of ids) {
    try {
      await retryWithBackoff(async () => {
        await client.delete(id)
      })
      console.log(`  ✓ Deleted: ${id}`)
    } catch (error) {
      console.error(`  ✗ Failed to delete ${id}:`, error.message)
    }
  }
}

// Import timeline from markdown
async function importTimeline() {
  console.log('📅 Importing timeline from markdown...')
  const timelineDir = path.join(__dirname, '../src/timeline')
  const files = fs.readdirSync(timelineDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    try {
      const filePath = path.join(timelineDir, file)
      const {frontmatter, body} = parseMarkdownFile(filePath)

      // Create document ID from filename
      const docId = `timeline-${file.replace('.md', '')}`

      const result = await retryWithBackoff(async () => {
        return await client.create({
          _type: 'timelineYear',
          _id: docId,
          year: frontmatter.year,
          grade: frontmatter.grade,
          order: frontmatter.order,
          summary: frontmatter.summary,
          body: body,
          season: frontmatter.season,
          team: frontmatter.team,
          achievements: frontmatter.highlights || [],
          stats: frontmatter.stats || {},
        })
      })

      console.log(`  ✓ Imported: ${frontmatter.year} (${frontmatter.grade})`)
    } catch (error) {
      console.error(`  ✗ Failed to import ${file}:`, error.message)
    }
  }
}

// Import games from markdown
async function importGames() {
  console.log('🏀 Importing games from markdown...')
  const gamesDir = path.join(__dirname, '../src/games')
  const files = fs.readdirSync(gamesDir).filter(f => f.endsWith('.md'))

  for (const file of files) {
    try {
      const filePath = path.join(gamesDir, file)
      const {frontmatter, body} = parseMarkdownFile(filePath)

      // Create document ID from filename
      const docId = `game-${file.replace('.md', '')}`

      const result = await retryWithBackoff(async () => {
        return await client.create({
          _type: 'game',
          _id: docId,
          opponent: frontmatter.opponent,
          date: frontmatter.date,
          time: frontmatter.time || '',
          location: frontmatter.location,
          homeAway: frontmatter.homeAway,
          season: frontmatter.season || '',
          team: frontmatter.team || '',
          result: frontmatter.result || '',
          points: frontmatter.points || '',
          rebounds: frontmatter.rebounds || '',
          assists: frontmatter.assists || '',
          recap: body,
        })
      })

      console.log(`  ✓ Imported: ${frontmatter.opponent} (${frontmatter.date})`)
    } catch (error) {
      console.error(`  ✗ Failed to import ${file}:`, error.message)
    }
  }
}

// Main function
async function main() {
  console.log('🚀 Starting clean re-import of basketball data...\n')

  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ Error: SANITY_AUTH_TOKEN not found!')
    process.exit(1)
  }

  try {
    await deleteTimeline()
    console.log()

    await deleteGames()
    console.log()

    await importTimeline()
    console.log()

    await importGames()
    console.log()

    console.log('✅ Re-import complete!')
    console.log('🎉 Check your Sanity Studio: https://kevin-franz-jr.sanity.studio/')
    console.log('📝 Deploy schemas: cd studio && npx sanity deploy')
  } catch (error) {
    console.error('❌ Re-import failed:', error.message)
    process.exit(1)
  }
}

main()
