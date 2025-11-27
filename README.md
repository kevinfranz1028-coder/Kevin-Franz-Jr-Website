# Kevin Franz Jr. - Student-Athlete Website

A modern, professional recruiting profile website for Kevin Franz Jr., Class of 2028 guard. Built with 11ty (Eleventy) static site generator and Netlify CMS for easy content management.

## 🌟 Features

- **7 Complete Pages**: Home, Basketball, Academics, Projects & Passions, Character & Service, Updates, Contact
- **Netlify CMS Admin Panel**: Update blog posts, games, and settings without touching code
- **Responsive Design**: Looks great on desktop, tablet, and mobile
- **Free Hosting**: Hosted on Netlify (free plan included)
- **Contact Form**: Built-in contact form with Netlify Forms
- **Fast & Secure**: Static site = lightning fast load times and excellent security

## 📋 What's Included

### Pages
1. **Home** - Hero section, at-a-glance stats, about, recent updates
2. **Basketball** - Complete profile with stats, highlights, schedule, achievements
3. **Academics** - GPA, coursework, resume download
4. **Projects & Passions** - Meteorology projects and interests
5. **Character & Service** - Community involvement and values
6. **Updates** - Blog for game recaps, academic milestones, personal posts
7. **Contact** - Contact form and quick links

### CMS Collections
- **Updates** - Blog posts with categories (Game Recap, Tournament, Academic, etc.)
- **Games** - Season schedule with results and stats
- **Settings** - Easy-to-update player info, contact details, links

## 🚀 Quick Start - Deploy to Netlify

### Step 1: Push to GitHub

1. **Create a GitHub account** (if you don't have one): https://github.com/signup

2. **Create a new repository**:
   - Go to https://github.com/new
   - Name it: `kevin-franz-jr-website`
   - Make it **Public**
   - Do NOT initialize with README (we already have one)
   - Click "Create repository"

3. **Push this code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial site build"
   git push -u origin claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4
   ```

### Step 2: Deploy to Netlify

1. **Go to Netlify**: https://app.netlify.com/signup
   - Sign up using your GitHub account (easiest option)

2. **Create a new site**:
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select the `kevin-franz-jr-website` repository
   - Choose branch: `claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4`

3. **Build settings** (should auto-detect):
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Click "Deploy site"

4. **Wait for deploy** (~2-3 minutes)
   - Netlify will install dependencies and build your site
   - You'll get a random URL like `https://random-name-123456.netlify.app`

### Step 3: Enable Netlify CMS

1. **Enable Identity** (for CMS login):
   - In your Netlify site dashboard, go to "Site settings" → "Identity"
   - Click "Enable Identity"

2. **Enable Git Gateway**:
   - In Identity settings, scroll down to "Services"
   - Click "Enable Git Gateway"

3. **Invite yourself as a user**:
   - Go to "Identity" tab (top navigation)
   - Click "Invite users"
   - Enter your email address
   - Check your email and accept the invitation
   - Set a password

4. **Access your CMS**:
   - Go to `https://your-site-name.netlify.app/admin/`
   - Log in with the email/password you just created
   - You now have a Webflow-like admin panel! 🎉

### Step 4: Customize Your Domain (Optional)

1. **Use a custom domain**:
   - In Netlify dashboard, go to "Site settings" → "Domain management"
   - Click "Add custom domain"
   - Enter your domain (e.g., `kevinfranzjr.com`)
   - Follow instructions to point your domain's DNS to Netlify

2. **Or change the Netlify subdomain**:
   - Go to "Site settings" → "Domain management"
   - Click "Options" → "Edit site name"
   - Change to something like `kevinfranzjr.netlify.app`

## 📝 How to Update Content

### Using the CMS (Easiest Way)

1. **Go to your admin panel**: `https://your-site.netlify.app/admin/`

2. **Add a blog post (Update)**:
   - Click "Updates" in the left sidebar
   - Click "New Updates"
   - Fill in the form:
     - Title
     - Type (Game Recap, Tournament, etc.)
     - Date
     - Summary
     - Upload cover image (optional)
     - Write your post in the Body field (supports formatting)
   - Click "Publish"
   - Your post is now live!

3. **Add/Update a game**:
   - Click "Games" in the left sidebar
   - Click "New Games"
   - Fill in opponent, date, location, result, stats
   - Click "Publish"
   - The schedule page updates automatically!

4. **Update player info**:
   - Click "Site Settings" → "Player Information"
   - Update GPA, stats, contact info, etc.
   - Click "Publish"

### Manual Updates (Advanced)

If you want to edit code directly:

1. Edit files in the `src/` folder
2. Commit and push to GitHub
3. Netlify auto-deploys your changes in ~2 minutes

## 📁 Project Structure

```
kevin-franz-jr-website/
├── src/
│   ├── _layouts/          # Page templates
│   │   ├── base.njk       # Main layout wrapper
│   │   └── post.njk       # Blog post template
│   ├── _includes/         # Reusable components
│   │   ├── nav.njk        # Navigation
│   │   └── footer.njk     # Footer
│   ├── css/
│   │   └── style.css      # All styles
│   ├── js/
│   │   └── main.js        # JavaScript (mobile menu, etc.)
│   ├── images/            # Upload images here
│   ├── updates/           # Blog posts (markdown files)
│   ├── games/             # Game schedule (markdown files)
│   ├── admin/             # Netlify CMS config
│   ├── index.njk          # Home page
│   ├── basketball.njk     # Basketball page
│   ├── academics.njk      # Academics page
│   ├── projects.njk       # Projects page
│   ├── character.njk      # Character page
│   ├── updates.njk        # Blog index page
│   └── contact.njk        # Contact page
├── .eleventy.js           # 11ty configuration
├── netlify.toml           # Netlify build settings
├── package.json           # Dependencies
└── README.md              # This file
```

## 🖼️ Adding Images

### Via CMS (Easy):
1. When creating/editing a post or page, use the "Choose an image" button
2. Upload your image
3. It automatically saves to `src/images/` and inserts the correct path

### Manually:
1. Add images to `src/images/` folder
2. Reference them in your content as `/images/your-image.jpg`

**Recommended image sizes**:
- Hero photos: 1000×1000px (square) or 800×1200px (portrait)
- Blog post covers: 1200×675px (16:9 ratio)
- Action shots: 1000×750px (4:3 ratio)

**Tip**: Compress images before uploading (use https://tinypng.com)

## 🎨 Customizing Design

### Colors

Edit `src/css/style.css`, find the `:root` section at the top:

```css
:root {
    --primary-color: #1E3A8A;     /* Main blue - change to school colors */
    --secondary-color: #F59E0B;   /* Accent orange */
    --text-dark: #1a1a1a;
    --text-gray: #666666;
    /* ... more colors */
}
```

Change the hex codes to match your school colors or personal brand.

### Fonts

In `src/css/style.css`, find the `body` selector and change the `font-family`:

```css
body {
    font-family: 'Your Font Name', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

To use Google Fonts:
1. Go to https://fonts.google.com
2. Select a font
3. Copy the `<link>` code
4. Add it to `src/_layouts/base.njk` in the `<head>` section

## 📧 Contact Form Setup

The contact form uses Netlify Forms (free, no setup needed).

**How it works**:
1. User fills out form on `/contact/` page
2. Form submits to Netlify
3. You receive an email notification
4. View all submissions in Netlify dashboard under "Forms" tab

**To enable email notifications**:
1. Go to Netlify dashboard → "Site settings" → "Forms"
2. Click "Form notifications"
3. Add your email address

## 🔧 Troubleshooting

### Site not building?
- Check the "Deploys" tab in Netlify dashboard for error messages
- Most common issue: Make sure `package.json` is at the root level

### CMS not loading?
- Make sure you enabled Identity and Git Gateway (see Step 3 above)
- Clear your browser cache and try again

### Images not showing?
- Check that image paths start with `/images/` (not `../images/` or `images/`)
- Make sure images are in `src/images/` folder

### Changes not appearing?
- Wait 2-3 minutes for Netlify to rebuild
- Check "Deploys" tab to see if build is complete
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

## 📊 Analytics (Optional)

To track visitors:

1. **Google Analytics**:
   - Create a GA4 property at https://analytics.google.com
   - Copy your Measurement ID (looks like `G-XXXXXXXXXX`)
   - In Netlify: Site settings → Build & deploy → Post processing → Snippet injection
   - Add GA script to `</head>`

2. **Netlify Analytics** (paid, $9/mo):
   - Go to "Site settings" → "Analytics"
   - Click "Enable analytics"
   - Get server-side analytics (more accurate, no cookie banner needed)

## 🆘 Support

If you run into issues:

1. **Check Netlify docs**: https://docs.netlify.com
2. **11ty docs**: https://www.11ty.dev/docs/
3. **Netlify CMS docs**: https://www.netlifycms.org/docs/

## ✅ Post-Deploy Checklist

After deploying, make sure to:

- [ ] Log into CMS at `/admin/` and test creating a post
- [ ] Update player info in CMS → Site Settings → Player Information
- [ ] Replace placeholder images in `src/images/` with real photos
- [ ] Update coach contact info on Basketball page
- [ ] Update links in footer (Hudl, YouTube, etc.)
- [ ] Test contact form by submitting a test message
- [ ] Set up email notifications for form submissions
- [ ] Add your custom domain (if you have one)
- [ ] Share the site with coaches, family, and on social media!

## 📅 Regular Maintenance

**Weekly** (during season):
- Add game results to "Games" collection
- Post game recaps or updates to "Updates" collection

**Monthly**:
- Update season stats on Basketball page
- Add new projects or achievements

**Quarterly**:
- Update GPA and coursework on Academics page
- Refresh highlight video if you have new footage

---

## 🎉 You're All Set!

Your site is now live and you have a powerful, easy-to-use CMS to keep it updated.

**Next steps**:
1. Deploy to Netlify (follow instructions above)
2. Customize with your real info and photos
3. Share with college coaches!

Good luck with your recruiting journey! 🏀
