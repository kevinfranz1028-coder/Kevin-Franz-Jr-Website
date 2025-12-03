import React, {useState} from 'react'
import {Card, Button, Stack, Text, Heading, Box, Spinner} from '@sanity/ui'
import {UploadIcon, CheckmarkIcon} from '@sanity/icons'
import {useClient} from 'sanity'
import * as XLSX from 'xlsx'

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

function parseDate(dateStr) {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
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

export default function ScheduleImportTool() {
  const client = useClient({apiVersion: '2024-01-01'})
  const [importing, setImporting] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setImporting(true)
    setError(null)
    setResults(null)

    try {
      // Read the file
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const games = XLSX.utils.sheet_to_json(sheet)

      console.log(`Found ${games.length} games to import`)
      console.log('Sample game data:', games[0])

      let successCount = 0
      let errorCount = 0
      const errors = []

      // Process each game
      for (const game of games) {
        try {
          // Clean up opponent name (remove @ and vs prefixes)
          let opponent = (game.Opponent || game.opponent || '').toString().trim()
          opponent = opponent.replace(/^[@]?\s*(vs\.?|@)?\s*/i, '').trim()

          const date = parseDate(game.Date || game.date)
          const time = (game.Time || game.time || '').toString()
          const location = (game.Location || game.location || '').toString()

          // Normalize home/away to lowercase
          let homeAway = (game['Home/Away'] || game.homeAway || game.home_away || 'home').toString().toLowerCase().trim()
          if (homeAway === 'home' || homeAway.includes('home')) {
            homeAway = 'home'
          } else {
            homeAway = 'away'
          }

          const season = (game.Season || game.season || '').toString()
          const team = (game.Team || game.team || '').toString()
          const result = (game.Result || game.result || '').toString()
          const points = (game.Points || game.points || '').toString()
          const rebounds = (game.Rebounds || game.rebounds || '').toString()
          const assists = (game.Assists || game.assists || '').toString()
          const recap = (game.Recap || game.recap || game.Notes || game.notes || '').toString()

          // Create document ID
          const dateStr = formatDateForFilename(date)
          const opponentSlug = slugify(opponent)
          const docId = `game-${dateStr}-${opponentSlug}`

          // Check if game already exists
          const existing = await client.fetch(`*[_id == $id][0]`, {id: docId})

          if (existing) {
            // Update existing game and publish
            await client.patch(docId).set({
              opponent,
              date: date.toISOString(),
              time,
              location,
              homeAway,
              season,
              team,
              result,
              points,
              rebounds,
              assists,
              recap,
            }).commit({autoPublish: true})
          } else {
            // Create new game (automatically published)
            await client.create({
              _type: 'game',
              _id: docId,
              opponent,
              date: date.toISOString(),
              time,
              location,
              homeAway,
              season,
              team,
              result,
              points,
              rebounds,
              assists,
              recap,
            })
          }

          console.log(`✓ Imported: ${opponent} on ${dateStr}`)
          successCount++
        } catch (err) {
          errorCount++
          const errorMsg = `${game.Opponent || game.opponent || 'Unknown'}: ${err.message}`
          errors.push(errorMsg)
          console.error('Failed to import game:', game, err)
        }
      }

      setResults({
        total: games.length,
        success: successCount,
        errors: errorCount,
        errorDetails: errors
      })
    } catch (err) {
      setError(err.message)
      console.error('Import failed:', err)
    } finally {
      setImporting(false)
    }
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Box>
          <Heading size={2}>📊 Import Game Schedule</Heading>
          <Text muted size={1} style={{marginTop: '0.5rem'}}>
            Upload an Excel (.xlsx) or CSV file with your game schedule
          </Text>
        </Box>

        <Card padding={4} border style={{borderStyle: 'dashed'}}>
          <Stack space={3}>
            <Text weight="semibold">Required Columns:</Text>
            <Text size={1} muted>
              Date, Opponent, Location, Home/Away
            </Text>
            <Text weight="semibold" style={{marginTop: '1rem'}}>Optional Columns:</Text>
            <Text size={1} muted>
              Time, Season, Team, Result, Points, Rebounds, Assists, Recap
            </Text>
          </Stack>
        </Card>

        <Box>
          <label htmlFor="file-upload">
            <Button
              as="span"
              icon={UploadIcon}
              text="Select Excel/CSV File"
              tone="primary"
              disabled={importing}
              style={{cursor: 'pointer'}}
            />
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            style={{display: 'none'}}
          />
        </Box>

        {importing && (
          <Card padding={3} tone="primary">
            <Stack space={2}>
              <Spinner />
              <Text>Importing games...</Text>
            </Stack>
          </Card>
        )}

        {results && (
          <Card padding={3} tone={results.errors > 0 ? 'caution' : 'positive'}>
            <Stack space={2}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <CheckmarkIcon />
                <Text weight="semibold">Import Complete!</Text>
              </div>
              <Text size={1}>
                Total: {results.total} | Success: {results.success} | Errors: {results.errors}
              </Text>
              <Text size={1} weight="semibold" style={{marginTop: '0.5rem'}}>
                ✅ Games are published and live!
              </Text>
              <Text size={1} muted>
                Go to Basketball → Games & Schedule to view and edit individual games.
              </Text>
              {results.errorDetails.length > 0 && (
                <Box marginTop={2}>
                  <Text size={1} weight="semibold">Errors:</Text>
                  {results.errorDetails.map((err, i) => (
                    <Text key={i} size={1} style={{color: 'red'}}>
                      • {err}
                    </Text>
                  ))}
                </Box>
              )}
            </Stack>
          </Card>
        )}

        {error && (
          <Card padding={3} tone="critical">
            <Text>Error: {error}</Text>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
