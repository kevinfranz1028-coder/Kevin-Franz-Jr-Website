# 🚀 Quick Deployment Guide

Follow these steps to get your site live in ~15 minutes.

## Step 1: Push to GitHub (5 minutes)

### If you don't have a GitHub account:
1. Go to https://github.com/signup
2. Create a free account
3. Verify your email

### Push this code:

```bash
# Navigate to the project folder (if not already there)
cd Kevin-Franz-Jr-Website

# Add all files
git add .

# Commit
git commit -m "Initial website build"

# Push to the branch
git push -u origin claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4
```

### If you need to create the GitHub repository:

1. Go to https://github.com/new
2. Name: `kevin-franz-jr-website`
3. Make it **Public**
4. Do NOT add README or .gitignore
5. Click "Create repository"
6. Copy the commands shown and run them in your terminal

---

## Step 2: Deploy to Netlify (5 minutes)

### Create Netlify Account:
1. Go to https://app.netlify.com/signup
2. Click "Sign up with GitHub" (easiest option)
3. Authorize Netlify to access your GitHub

### Deploy Your Site:
1. Click "Add new site" → "Import an existing project"
2. Click "Deploy with GitHub"
3. Find and select `kevin-franz-jr-website` repository
4. Branch: `claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4`
5. Build settings (should auto-fill):
   - Build command: `npm run build`
   - Publish directory: `_site`
6. Click "Deploy site"

**Wait ~2-3 minutes for the build to complete.**

Your site is now live at a URL like: `https://random-name-123456.netlify.app`

---

## Step 3: Set Up CMS Admin Panel (5 minutes)

### Enable Identity:
1. In Netlify dashboard, go to **"Site settings"** → **"Identity"**
2. Click **"Enable Identity"**

### Enable Git Gateway:
1. Scroll down to **"Services"** section
2. Click **"Enable Git Gateway"**

### Create Your Admin Account:
1. Go to the **"Identity"** tab (top navigation)
2. Click **"Invite users"**
3. Enter your email
4. Check your email for the invitation
5. Click the link and set a password

### Log In to CMS:
1. Go to `https://your-site-name.netlify.app/admin/`
2. Log in with your email and password
3. You now have access to your admin panel! 🎉

---

## Step 4: Customize (10 minutes)

### Update Player Information:
1. In CMS, click **"Site Settings"** → **"Player Information"**
2. Fill in all your real info (name, school, stats, contact, etc.)
3. Click **"Publish"**

### Add Real Images:
1. Replace placeholder images in `src/images/` folder with your photos:
   - `hero-photo.jpg` - Action shot for home page
   - `about-photo.jpg` - Portrait for About section
   - `basketball-action.jpg` - Action shot for Basketball page
   - `academic-photo.jpg` - Academic/study photo

2. **Tip**: Resize images before uploading:
   - Hero: 1000×1000px
   - Others: 800×600px or similar
   - Use https://tinypng.com to compress

### Test Everything:
- [ ] Visit your site and click through all pages
- [ ] Create a test blog post in CMS
- [ ] Add a game to the schedule
- [ ] Submit the contact form (test it works)

---

## Step 5: Share! 🎉

### Change Your Site URL (Optional):
1. Go to **"Site settings"** → **"Domain management"**
2. Click **"Options"** → **"Edit site name"**
3. Change to something like: `kevinfranzjr.netlify.app`

### Share Your Site:
- Email the link to coaches
- Add it to your Hudl profile
- Share on social media
- Put it in your email signature

---

## 🆘 Need Help?

### Common Issues:

**Site not building?**
- Go to "Deploys" tab in Netlify
- Click on the failed deploy to see error message
- Usually it's a typo in a file - fix and push again

**CMS not working?**
- Make sure you enabled Identity AND Git Gateway
- Clear browser cache and try again
- Use Chrome or Firefox (works best)

**Images not showing?**
- Make sure image files are in `src/images/` folder
- Image paths in HTML should be `/images/filename.jpg`

**Changes not appearing?**
- Wait 2-3 minutes for Netlify to rebuild
- Check "Deploys" tab - should say "Published"
- Hard refresh browser (Ctrl+Shift+R)

---

## 📞 What's Next?

### Weekly Updates (during season):
- Log into `/admin/`
- Add game results to "Games"
- Write game recaps in "Updates"

### Monthly:
- Update stats on Basketball page
- Add new achievements

### As Needed:
- Upload new highlight videos
- Update GPA and grades
- Add new projects or awards

---

**Your site is live and ready to help you get recruited! 🏀**

Keep it updated and share it with every coach you talk to.

Good luck!
