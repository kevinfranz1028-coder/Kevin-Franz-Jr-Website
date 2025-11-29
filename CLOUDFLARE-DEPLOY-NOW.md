# Deploy to Cloudflare Pages - Simple Steps

Everything is configured and ready. Just follow these 3 simple steps:

## Step 1: Deploy to Cloudflare Pages (5 minutes)

1. Go to https://dash.cloudflare.com
2. Click **Pages** → **Create a project** → **Connect to Git**
3. Select your GitHub repo: `kevinfranz1028-coder/Kevin-Franz-Jr-Website`
4. Configure build:
   - **Production branch**: `claude/new-session-01NzEvUVxZkbsoz2ehxruTvK`
   - **Build command**: `npm run build`
   - **Build output directory**: `_site`
5. Click **Save and Deploy**

Your site will be live at: `https://kevin-franz-jr-website-2.pages.dev`

## Step 2: Set Environment Variables in Cloudflare (2 minutes)

1. In Cloudflare dashboard, go to **Pages** → **Your Project** → **Settings** → **Environment variables**
2. Add these for **Production**:
   ```
   GITHUB_OAUTH_CLIENT_ID = (you'll get this in Step 3)
   GITHUB_OAUTH_CLIENT_SECRET = (you'll get this in Step 3)
   ```
3. Also add them for **Preview** if you want CMS to work on preview branches

## Step 3: Create GitHub OAuth App (3 minutes)

1. Go to https://github.com/settings/developers
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: `Kevin Franz Jr Website CMS`
   - **Homepage URL**: `https://kevin-franz-jr-website-2.pages.dev`
   - **Authorization callback URL**: `https://kevin-franz-jr-website-2.pages.dev/callback`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy it immediately
7. Go back to Cloudflare (Step 2) and paste these values into the environment variables
8. Click **Save** in Cloudflare

## Step 4: Trigger a Redeploy (1 minute)

1. In Cloudflare Pages, go to **Deployments**
2. Click **Retry deployment** on the latest deployment (this loads the environment variables)

## Step 5: Test Your CMS (1 minute)

1. Go to `https://kevin-franz-jr-website-2.pages.dev/admin/`
2. Click **Login with GitHub**
3. Authorize the app
4. You're in! 🎉

---

## That's It!

Your site is live with a fully functional CMS. No more manual configuration needed.

**Your live site**: https://kevin-franz-jr-website-2.pages.dev
**Your CMS admin**: https://kevin-franz-jr-website-2.pages.dev/admin/

## Troubleshooting

### CMS shows "GitHub OAuth not configured"
- Make sure you set both environment variables in Cloudflare
- Make sure you clicked "Save" in Cloudflare
- Trigger a redeploy (Step 4)

### OAuth error during login
- Verify the callback URL in your GitHub OAuth app is exactly: `https://kevin-franz-jr-website-2.pages.dev/callback`
- Make sure Client ID and Secret are correct in Cloudflare environment variables
- No extra spaces when copying/pasting

### Need to use a different URL?
If your Cloudflare Pages URL is different than `kevin-franz-jr-website-2.pages.dev`:
1. Edit `src/admin/config.yml`
2. Change `base_url` and `site_url` to your actual URL
3. Update the GitHub OAuth app callback URL to match
4. Commit and push
