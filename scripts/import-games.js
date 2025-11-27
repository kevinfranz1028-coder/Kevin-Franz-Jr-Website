const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Usage: node import-games.js <csv-file-path>');
  console.error('Example: node import-games.js games.csv');
  process.exit(1);
}

if (!fs.existsSync(csvFilePath)) {
  console.error(`Error: File not found: ${csvFilePath}`);
  process.exit(1);
}

const gamesDir = path.join(__dirname, '..', 'src', 'games');

// Ensure games directory exists
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

let count = 0;

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    try {
      // Validate required fields
      if (!row.opponent || !row.date || !row.location || !row.homeAway) {
        console.error(`Skipping row - missing required fields:`, row);
        return;
      }

      // Create filename from date and opponent
      const date = new Date(row.date);
      const dateStr = date.toISOString().split('T')[0];
      const opponentSlug = row.opponent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const filename = `${dateStr}-${opponentSlug}.md`;

      // Create frontmatter
      const frontmatter = `---
opponent: ${row.opponent}
date: ${row.date}
location: ${row.location}
homeAway: ${row.homeAway}
result: "${row.result || ''}"
points: "${row.points || ''}"
rebounds: "${row.rebounds || ''}"
assists: "${row.assists || ''}"
season: "${row.season || ''}"
team: "${row.team || ''}"
---
`;

      // Write file
      const filePath = path.join(gamesDir, filename);
      fs.writeFileSync(filePath, frontmatter);
      console.log(`✓ Created: ${filename}`);
      count++;
    } catch (error) {
      console.error(`Error processing row:`, row, error.message);
    }
  })
  .on('end', () => {
    console.log(`\n✓ CSV import complete! Created ${count} game files.`);
  })
  .on('error', (error) => {
    console.error('Error reading CSV:', error.message);
    process.exit(1);
  });
