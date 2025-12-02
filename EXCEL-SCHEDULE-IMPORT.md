# 📊 Excel Schedule Import Guide

Import your entire game schedule from an Excel or CSV file in seconds!

## 🚀 Quick Start

1. **Create your schedule in Excel or Google Sheets**
2. **Save as `.xlsx` or `.csv`**
3. **Run the import script**

## 📋 Excel Format

Your spreadsheet should have these columns (case-insensitive):

| Column Name | Required | Example | Notes |
|-------------|----------|---------|-------|
| Date | ✅ | 12/5/2024 | Game date (MM/DD/YYYY) |
| Time | | 3:30 PM | Game time |
| Opponent | ✅ | Washburn Rural | Opponent team name |
| Location | ✅ | Washburn Rural HS | Where the game is played |
| Home/Away | | away | "home" or "away" |
| Season | | 2024-2025 | Season year |
| Team | | JV | "JV", "Varsity", "Freshman" |
| Result | | win | "win", "loss", or empty |
| Points | | 15 | Kevin's points scored |
| Rebounds | | 5 | Kevin's rebounds |
| Assists | | 3 | Kevin's assists |
| Recap | | Great game! | Optional notes |

## 📝 Example Excel Sheet

```
Date       | Time    | Opponent           | Location           | Home/Away | Season    | Team | Result | Points | Rebounds | Assists
-----------|---------|--------------------|--------------------|-----------|-----------|------|--------|--------|----------|--------
12/5/2024  | 3:30 PM | Washburn Rural     | Washburn Rural HS  | away      | 2024-2025 | JV   | win    | 15     | 5        | 3
12/9/2024  | 5:00 PM | Wyandotte          | Blue Valley SW     | home      | 2024-2025 | JV   |        |        |          |
12/16/2024 | 6:30 PM | Gardner Edgerton   | Gardner Edgerton   | away      | 2024-2025 | JV   |        |        |          |
```

## 💻 How to Import

### Step 1: Prepare Your File

Save your Excel file (e.g., `schedule.xlsx`) in the project directory

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Run the Import

```bash
node scripts/import-games-from-excel.js schedule.xlsx
```

Or if your file is a CSV:

```bash
node scripts/import-games-from-excel.js schedule.csv
```

### Step 4: Review and Deploy

```bash
# Check the created files
ls src/games/

# Build the site
npm run build

# Commit and deploy
git add .
git commit -m "Update game schedule"
git push
```

## 🎯 Tips

- **Leave fields empty** for upcoming games (no result, points, etc.)
- **Use consistent date format**: MM/DD/YYYY works best
- **Column names are flexible**: "Opponent" or "opponent" both work
- **Backup your existing games** before importing if you want to preserve them:
  ```bash
  cp -r src/games src/games-backup
  ```

## 🔄 Updating the Schedule

To update games throughout the season:

1. **Open your Excel file**
2. **Update results, stats, and notes**
3. **Re-run the import script**
4. **Push changes**

The script will overwrite existing game files with matching dates/opponents.

## 📥 Template Download

Want a template? Create a new Excel file with these columns:

- Date
- Time
- Opponent
- Location
- Home/Away
- Season
- Team
- Result
- Points
- Rebounds
- Assists
- Recap

Then fill in your schedule!

## 🆘 Troubleshooting

**"File not found" error:**
- Make sure the file path is correct
- Use quotes if the filename has spaces: `"my schedule.xlsx"`

**"Invalid date" warnings:**
- Check your date format (use MM/DD/YYYY)
- Make sure all date cells are formatted as dates, not text

**Games not showing on website:**
- Run `npm run build` after importing
- Check that files were created in `src/games/` directory
- Deploy changes with `git push`

## 🎉 That's It!

No more manually creating game files one by one. Just maintain your schedule in Excel and import it whenever you need to update!
