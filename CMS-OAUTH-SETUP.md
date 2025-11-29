# CMS OAuth Setup Guide

Your CMS now uses Decap CMS with GitHub OAuth authentication. Follow these steps to complete the setup:

## Step 1: Create a GitHub OAuth App

1. Go to **GitHub Settings** → **Developer settings** → **OAuth Apps**
   - Direct link: https://github.com/settings/developers

2. Click **"New OAuth App"**

3. Fill in the application details:
   - **Application name**: `Kevin Franz Jr Website CMS`
   - **Homepage URL**: `https://your-site.pages.dev` (replace with your actual Cloudflare Pages URL)
   - **Authorization callback URL**: `https://your-site.pages.dev/callback` (replace with your actual domain)

4. Click **"Register application"**

5. On the next page, you'll see:
   - **Client ID** - Copy this
   - Click **"Generate a new client secret"** and copy the secret immediately (you won't be able to see it again!)

## Step 2: Configure Cloudflare Pages

1. Go to your **Cloudflare Dashboard**

2. Navigate to **Pages** → **Your Project** → **Settings** → **Environment variables**

3. Add these two environment variables for **Production**:
   ```
   GITHUB_OAUTH_CLIENT_ID = [paste your Client ID]
   GITHUB_OAUTH_CLIENT_SECRET = [paste your Client Secret]
   ```

4. **Important**: Also add them to **Preview** deployments if you want to test on preview branches

## Step 3: Update Your CMS Configuration

1. Edit `src/admin/config.yml`

2. Update the `base_url` line to match your actual Cloudflare Pages URL:
   ```yaml
   backend:
     name: github
     repo: kevinfranz1028-coder/Kevin-Franz-Jr-Website
     branch: claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4
     base_url: https://your-actual-site.pages.dev  # ← Change this!
     auth_endpoint: auth
   ```

## Step 4: Deploy & Test

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add OAuth configuration for CMS"
   git push
   ```

2. Wait for Cloudflare Pages to rebuild your site

3. Visit `https://your-site.pages.dev/admin/`

4. Click **"Login with GitHub"**

5. You should be redirected to GitHub, then back to your CMS

## Troubleshooting

### "Not Found" Error When Logging In
- Make sure the `base_url` in `config.yml` matches your exact Cloudflare Pages URL
- Verify the OAuth callback URL in GitHub matches `https://your-site.pages.dev/callback`

### "GitHub OAuth not configured" Error
- Check that environment variables are set in Cloudflare Pages
- Make sure you're using the **Production** environment variables
- Redeploy your site after adding environment variables

### "Authorization Failed" Error
- Double-check your Client ID and Client Secret
- Make sure the Client Secret wasn't copied with extra spaces
- Verify the OAuth app's callback URL matches your site

### GitHub Shows "Application Not Configured"
- Make sure the Homepage URL and Callback URL in your GitHub OAuth app are correct
- They should both use `https://` (not `http://`)

## Finding Your Cloudflare Pages URL

Your Cloudflare Pages URL will look like:
- `https://kevin-franz-jr-website.pages.dev` or
- `https://your-custom-domain.com` (if you set up a custom domain)

You can find it in:
- Cloudflare Dashboard → Pages → Your Project → Deployments

## Security Notes

- Never commit your Client Secret to git (it's in environment variables only)
- The OAuth flow happens server-side, keeping your credentials secure
- Only authorized GitHub users with repo access can log into the CMS

## Need Help?

If you're still having issues:
1. Check the browser console for error messages
2. Verify all URLs match exactly (including https://)
3. Make sure environment variables are saved and deployed
4. Try clearing your browser cache and cookies
