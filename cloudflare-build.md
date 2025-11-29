# Cloudflare Pages Build Configuration

## Build Settings

When setting up your Cloudflare Pages project, use these settings:

### Framework preset
- **Framework**: None (or select "Eleventy" if available)

### Build configuration
- **Build command**: `npm run build`
- **Build output directory**: `_site`
- **Root directory**: `/` (leave empty or use root)

### Environment Variables

You'll need to set these in Cloudflare Pages Dashboard → Settings → Environment variables:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_REPO=kevinfranz1028-coder/Kevin-Franz-Jr-Website
GITHUB_BRANCH=claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4
```

### Branch Configuration

- **Production branch**: `main` (or your default branch)
- **Preview branch**: `claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4`

## Functions

Cloudflare Pages Functions are located in the `/functions` directory and will be automatically deployed:

- `/functions/claude-ai.js` - AI content generation
- `/functions/ai-site-editor.js` - Site-wide AI editing

These are accessed at:
- `https://your-site.pages.dev/functions/claude-ai`
- `https://your-site.pages.dev/functions/ai-site-editor`

## Node.js Version

Cloudflare Pages uses Node.js 18 by default. If you need a different version, set:

```
NODE_VERSION=18
```

in your environment variables.
