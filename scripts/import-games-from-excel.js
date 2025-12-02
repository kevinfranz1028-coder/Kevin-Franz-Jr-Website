/**
 * Import Games from Excel/CSV
 *
 * This script imports game schedule from an Excel or CSV file
 * and creates markdown files for each game.
 *
 * Excel/CSV Format:
 * | Date       | Time     | Opponent            | Location           | Home/Away | Season    | Team | Result | Points | Rebounds | Assists |
 * |------------|----------|---------------------|--------------------|-----------|-----------| -----|--------|--------|----------|---------|
 * | 12/5/2024  | 3:30 PM  | Washburn Rural      | Washburn Rural HS  | away      | 2024-2025 | JV   | win    | 15     | 5        | 3       |
 *
 * Usage:
 *   node scripts/import-games-from-excel.js path/to/schedule.xlsx
 *   node scripts/import-games-from-excel.js path/to/schedule.csv
 */

const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function parseDate(dateStr) {
  // Handle various date formats
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    console.warn(`  ⚠️  Invalid date: ${dateStr}, using today`)
    return new Date()
  }
  return date
}

function formatDateForFilename(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDateForFrontmatter(date) {
  return date.toISOString()
}

function createGameMarkdown(game) {
  const opponent = game.Opponent || game.opponent || ''
  const date = parseDate(game.Date || game.date)
  const time = game.Time || game.time || ''
  const location = game.Location || game.location || ''
  const homeAway = (game['Home/Away'] || game.homeAway || game.home_away || 'home').toLowerCase()
  const season = game.Season || game.season || ''
  const team = game.Team || game.team || ''
  const result = game.Result || game.result || ''
  const points = game.Points || game.points || ''
  const rebounds = game.Rebounds || game.rebounds || ''
  const assists = game.Assists || game.assists || ''
  const recap = game.Recap || game.recap || game.Notes || game.notes || ''

  // Create frontmatter
  const frontmatter = `---
opponent: ${opponent}
date: ${formatDateForFrontmatter(date)}
time: "${time}"
location: ${location}
homeAway: ${homeAway}
season: "${season}"
team: "${team}"
result: "${result}"
points: "${points}"
rebounds: "${rebounds}"
assists: "${assists}"
---`

  // Add recap if provided
  let body = ''
  if (recap) {
    body = `\n${recap}\n`
  }

  return frontmatter + body
}

function importGames(filePath) {
  console.log(`📊 Importing games from: ${filePath}\n`)

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    process.exit(1)
  }

  // Read the file
  const workbook = xlsx.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  // Convert to JSON
  const games = xlsx.utils.sheet_to_json(sheet)

  console.log(`Found ${games.length} games\n`)

  // Create games directory if it doesn't exist
  const gamesDir = path.join(__dirname, '../src/games')
  if (!fs.existsSync(gamesDir)) {
    fs.mkdirSync(gamesDir, {recursive: true})
  }

  let successCount = 0
  let errorCount = 0

  // Process each game
  games.forEach((game, index) => {
    try {
      const opponent = game.Opponent || game.opponent || `Game ${index + 1}`
      const date = parseDate(game.Date || game.date)

      // Create filename
      const dateStr = formatDateForFilename(date)
      const opponentSlug = slugify(opponent)
      const filename = `${dateStr}-${opponentSlug}.md`
      const filePath = path.join(gamesDir, filename)

      // Create markdown content
      const markdown = createGameMarkdown(game)

      // Write file
      fs.writeFileSync(filePath, markdown)
      console.log(`  ✓ Created: ${filename}`)
      successCount++
    } catch (error) {
      console.error(`  ✗ Failed to process game ${index + 1}:`, error.message)
      errorCount++
    }
  })

  console.log(`\n✅ Import complete!`)
  console.log(`   ${successCount} games created`)
  if (errorCount > 0) {
    console.log(`   ${errorCount} errors`)
  }
  console.log(`\n📁 Games saved to: ${gamesDir}`)
  console.log(`\n🚀 Next steps:`)
  console.log(`   1. Review the created files in src/games/`)
  console.log(`   2. Run: npm run build`)
  console.log(`   3. Deploy: git add . && git commit -m "Update schedule" && git push`)
}

// Main
const args = process.argv.slice(2)
if (args.length === 0) {
  console.log(`Usage: node scripts/import-games-from-excel.js <file.xlsx|file.csv>`)
  console.log(`\nExample:`)
  console.log(`  node scripts/import-games-from-excel.js schedule.xlsx`)
  console.log(`\nExpected columns:`)
  console.log(`  - Date (required): e.g., "12/5/2024"`)
  console.log(`  - Time: e.g., "3:30 PM"`)
  console.log(`  - Opponent (required): e.g., "Washburn Rural"`)
  console.log(`  - Location (required): e.g., "Washburn Rural HS"`)
  console.log(`  - Home/Away: "home" or "away"`)
  console.log(`  - Season: e.g., "2024-2025"`)
  console.log(`  - Team: e.g., "JV", "Varsity"`)
  console.log(`  - Result: "win", "loss", or empty for upcoming`)
  console.log(`  - Points: Kevin's points`)
  console.log(`  - Rebounds: Kevin's rebounds`)
  console.log(`  - Assists: Kevin's assists`)
  console.log(`  - Recap: Optional game notes`)
  process.exit(1)
}

const filePath = args[0]
importGames(filePath)
