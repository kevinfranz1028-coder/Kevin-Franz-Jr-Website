# AI Site Editor Setup Guide

## Overview
The AI Site Editor is a powerful overlay that appears on all pages of your site, allowing you to make content and layout changes through natural language requests. Changes are automatically committed to GitHub and deployed via Netlify.

## Features
- **Universal Access**: Available on every page of your site via a floating button
- **Natural Language Editing**: Simply describe what you want to change
- **Auto-Deployment**: Changes are automatically committed and deployed
- **Content & Layout Updates**: Can modify text, add sections, update data, and more
- **Real-time Feedback**: See status updates and deployment information

## Setup Instructions

### 1. Environment Variables
You need to configure the following environment variables in your Netlify site settings:

#### Required Variables:

**ANTHROPIC_API_KEY**
- Get from: https://console.anthropic.com/
- Description: API key for Claude AI
- Already configured for the CMS widget

**GITHUB_TOKEN**
- Get from: https://github.com/settings/tokens
- Permissions needed: `repo` (Full control of private repositories)
- Description: Personal access token for committing changes
- Steps to create:
  1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Click "Generate new token (classic)"
  3. Give it a name like "AI Site Editor"
  4. Select the `repo` scope
  5. Click "Generate token"
  6. Copy the token immediately (you won't see it again!)

**GITHUB_REPO**
- Format: `owner/repository-name`
- Example: `kevinfranz1028-coder/Kevin-Franz-Jr-Website`
- Description: Your GitHub repository in owner/repo format

#### Optional Variables:

**GITHUB_BRANCH**
- Default: `claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4`
- Description: Branch to commit changes to
- Note: Changes will be committed to this branch and auto-deployed

**NETLIFY_SITE_ID**
- Find in: Netlify Site Settings → General → Site details
- Description: Used to generate deploy dashboard links
- Optional but helpful for tracking deployments

### 2. Configure Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add each variable listed above

Example configuration:
```
ANTHROPIC_API_KEY = sk-ant-xxxxxxxxxxxxxxxxxxxxx
GITHUB_TOKEN = ghp_xxxxxxxxxxxxxxxxxxxxx
GITHUB_REPO = kevinfranz1028-coder/Kevin-Franz-Jr-Website
GITHUB_BRANCH = claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4
```

### 3. Deploy the Changes

After adding the environment variables, deploy your site:

```bash
git add .
git commit -m "Add AI Site Editor overlay"
git push origin claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4
```

Netlify will automatically build and deploy your site.

## How to Use

### Opening the AI Editor

1. Visit any page on your site
2. Look for the purple "AI Editor" button in the bottom-right corner
3. Click the button to open the overlay

### Making Requests

The AI can handle various types of requests:

#### Content Updates
```
"Update my GPA to 3.9 in the academics section"
"Add a new game recap for yesterday's game against Lincoln High"
"Change the hero text on the homepage to something more professional"
```

#### Layout Changes
```
"Add a highlights section to the homepage"
"Add a stats box to the basketball page"
"Create a testimonials section on the character page"
```

#### Data Management
```
"Add a new timeline entry for this season"
"Update my player stats with the latest game"
"Add a new project to the projects page"
```

### Understanding Responses

The AI will:
1. Confirm what it understood from your request
2. Show which files it's modifying
3. Commit the changes to GitHub
4. Provide a link to track the deployment

After a successful change:
- Wait about 1-2 minutes for Netlify to rebuild
- Refresh the page to see your changes
- Check the deployment status in your Netlify dashboard

## File Structure

The AI understands your site structure:

- **Content files**: `src/updates/*.md`, `src/games/*.md`, `src/timeline/*.md`
- **Data files**: `src/_data/**/*.json`
- **Layouts**: `src/_layouts/*.njk`
- **Pages**: `src/*.njk`
- **Styles**: `src/css/*.css`
- **Scripts**: `src/js/*.js`

## Security Considerations

- The AI only has access to your public repository
- All changes are committed with clear commit messages
- You can review changes in GitHub before they go live
- The GitHub token has repository-level permissions only
- Consider using a dedicated GitHub account or token with minimal permissions

## Troubleshooting

### "GitHub integration not configured"
- Check that GITHUB_TOKEN and GITHUB_REPO are set in Netlify
- Verify the token has `repo` permissions
- Make sure the repository name format is `owner/repo`

### "API key not configured" or "Error: model: claude-3-5-sonnet-..."
- **This error means the ANTHROPIC_API_KEY is either missing or invalid**
- Go to Netlify Dashboard → Your Site → Site settings → Environment variables
- Verify ANTHROPIC_API_KEY is set (should start with `sk-ant-`)
- Get a new API key from https://console.anthropic.com/ if needed
- Check that the API key is valid and has available credits
- After updating, redeploy your site for changes to take effect

### Changes not appearing
- Wait 1-2 minutes for Netlify to rebuild and deploy
- Check Netlify deploy logs for errors
- Verify the changes were committed to GitHub
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### AI not understanding requests
- Be specific about what page and section you're referring to
- Provide concrete values (e.g., "3.9" instead of "my GPA")
- Reference existing sections by their visible names
- Start with simple requests and build up to complex ones

## Example Workflow

1. **Visit the basketball page**
2. **Click the AI Editor button**
3. **Type**: "Add a section showing my season averages: 18.5 PPG, 5.2 APG, 4.1 RPG"
4. **AI responds**: "I'll add a season stats section to the basketball page data file"
5. **Changes are committed and deployed**
6. **Wait ~1 minute**
7. **Refresh the page to see your new stats section**

## Advanced Usage

### Batch Requests
You can make multiple related changes in one request:
```
"Update the homepage: change the hero title, add my latest stats, and feature the recent game recap"
```

### Conditional Changes
The AI can make smart decisions:
```
"If there's no media gallery section, create one. Otherwise, add these new images to it"
```

### Template Requests
Ask for repeatable patterns:
```
"Create a new game entry template I can use for future games"
```

## Limitations

- The AI works with existing file structures
- Major architectural changes should be done manually
- Image uploads need to be done separately (the AI can reference them)
- Some complex layout changes may need manual refinement
- API rate limits apply (both Claude and GitHub)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Review Netlify function logs
3. Verify environment variables are set correctly
4. Check GitHub for committed changes
5. Review the deployment logs in Netlify

## Credits

Built with:
- Claude AI (Anthropic)
- Netlify Functions
- GitHub API
- Eleventy (11ty)
