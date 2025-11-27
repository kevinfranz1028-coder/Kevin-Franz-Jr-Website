# Bulk Upload Games via CSV

This guide explains how to bulk upload multiple games at once using a CSV file.

## CSV Template

Create a CSV file with the following columns:

```csv
opponent,date,location,homeAway,result,points,rebounds,assists,season,team
Washburn Rural,2024-12-05T16:30:00.000Z,Washburn Rural HS,away,,,,2024-2025,JV
Wyandotte,2024-12-09T17:30:00.000Z,Wyandotte HS,away,,,,2024-2025,JV
Gardner Edgerton,2024-12-16T16:00:00.000Z,BVSW HS (South Gym),home,,,,2024-2025,JV
```

## Field Descriptions

- **opponent** (required): Opponent team name
- **date** (required): Game date and time in ISO format (YYYY-MM-DDTHH:MM:SS.000Z)
- **location** (required): Game location/venue
- **homeAway** (required): Either "home" or "away"
- **result** (optional): Game result (e.g., "W 62-58", "L 45-50") - leave empty for upcoming games
- **points** (optional): Your points scored
- **rebounds** (optional): Your rebounds
- **assists** (optional): Your assists
- **season** (required): Season year (e.g., "2024-2025", "2023-2024")
- **team** (required): Team level (e.g., "JV", "Varsity", "AAU")

## Date Format

Dates must be in ISO 8601 format with timezone (UTC):
- Format: `YYYY-MM-DDTHH:MM:SS.000Z`
- Example: `2024-12-05T16:30:00.000Z` (Dec 5, 2024 at 4:30 PM)

### Converting Times to ISO Format

1. Start with your game date and time: **December 5, 2024 at 4:30 PM**
2. Convert to 24-hour format: **16:30**
3. Format as ISO: **2024-12-05T16:30:00.000Z**

## How to Upload

### Method 1: Using the Script (Recommended)

1. Save your CSV file as `games.csv` in the project root directory
2. Run the upload script:
   ```bash
   node scripts/import-games.js games.csv
   ```

### Method 2: Manual Upload via CMS

1. Go to your Netlify CMS admin panel: `https://yoursite.netlify.app/admin/`
2. Navigate to "Games" collection
3. Click "New Game" for each entry
4. Fill in the fields manually

### Method 3: Direct File Creation

1. For each game in your CSV, create a markdown file in `src/games/`
2. Name it: `YYYY-MM-DD-opponent-name.md` (e.g., `2024-12-05-washburn-rural.md`)
3. Use this template:

```markdown
---
opponent: Washburn Rural
date: 2024-12-05T16:30:00.000Z
location: Washburn Rural HS
homeAway: away
result: ""
points: ""
rebounds: ""
assists: ""
season: "2024-2025"
team: "JV"
---
```

## CSV Import Script

Create a file `scripts/import-games.js`:

```javascript
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = process.argv[2];

if (!csvFilePath) {
  console.error('Usage: node import-games.js <csv-file-path>');
  process.exit(1);
}

const gamesDir = path.join(__dirname, '..', 'src', 'games');

// Ensure games directory exists
if (!fs.existsSync(gamesDir)) {
  fs.mkdirSync(gamesDir, { recursive: true });
}

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
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
season: "${row.season}"
team: "${row.team}"
---
`;

    // Write file
    const filePath = path.join(gamesDir, filename);
    fs.writeFileSync(filePath, frontmatter);
    console.log(`Created: ${filename}`);
  })
  .on('end', () => {
    console.log('CSV import complete!');
  });
```

## Installation

To use the import script, install the required dependency:

```bash
npm install csv-parser
```

## Example: Importing Full Season Schedule

1. Create `2024-2025-jv-schedule.csv`:

```csv
opponent,date,location,homeAway,result,points,rebounds,assists,season,team
Washburn Rural,2024-12-05T16:30:00.000Z,Washburn Rural HS,away,,,,2024-2025,JV
Wyandotte,2024-12-09T17:30:00.000Z,Wyandotte HS,away,,,,2024-2025,JV
Gardner Edgerton,2024-12-16T16:00:00.000Z,BVSW HS (South Gym),home,,,,2024-2025,JV
Shawnee Mission North,2025-01-06T16:00:00.000Z,BVSW HS (Main Gym),home,,,,2024-2025,JV
Basehor-Linwood,2025-01-08T16:00:00.000Z,BVSW HS (Main Gym),home,,,,2024-2025,JV
Louisburg,2025-01-13T18:00:00.000Z,Louisburg HS,away,,,,2024-2025,JV
Blue Valley West,2025-01-16T16:00:00.000Z,BVSW HS (Main Gym),home,,,,2024-2025,JV
J. C. Harmon,2025-01-19T17:30:00.000Z,Harmon HS,away,,,,2024-2025,JV
Olathe Northwest,2025-01-21T19:00:00.000Z,ONW HS (Aux Gym),away,,,,2024-2025,JV
Olathe East,2025-01-27T17:30:00.000Z,BVSW HS (Main Gym),home,,,,2024-2025,JV
Shawnee Mission West,2025-01-30T17:30:00.000Z,Shawnee Mission West,away,,,,2024-2025,JV
Saint Thomas Aquinas,2025-02-03T16:00:00.000Z,BVSW HS (Main Gym),home,,,,2024-2025,JV
Blue Valley Northwest,2025-02-06T16:00:00.000Z,BVSW HS (Main Gym),home,,,,2024-2025,JV
Blue Valley North,2025-02-10T16:00:00.000Z,BV North HS (Main Gym),away,,,,2024-2025,JV
Blue Valley,2025-02-13T16:00:00.000Z,BVSW HS (Main Gym),home,,,,2024-2025,JV
Bishop Miege,2025-02-17T16:00:00.000Z,Bishop Miege HS,away,,,,2024-2025,JV
St. James Academy,2025-02-20T16:00:00.000Z,St. James Academy (Main),away,,,,2024-2025,JV
Blue Valley West,2025-02-27T16:00:00.000Z,BV West (South Gym),away,,,,2024-2025,JV
```

2. Run the import:
```bash
node scripts/import-games.js 2024-2025-jv-schedule.csv
```

## Updating Game Results

After games are played:

1. Export your games to CSV
2. Update the `result`, `points`, `rebounds`, `assists` columns
3. Re-import using the script (it will overwrite existing files with the same date/opponent)

## Tips

- Keep backups of your CSV files
- Use the season and team fields to organize games by year and level
- Leave stats empty for upcoming games
- You can import past seasons the same way by changing the season field

## Game Repository

All games are stored in `src/games/` as individual markdown files. They are automatically:
- Displayed on the basketball schedule
- Sorted by date
- Filtered by season (if you implement season filtering)
- Editable via the CMS

The `season` field allows you to maintain a complete history of games across multiple years.
