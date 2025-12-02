# 🎯 Sanity CMS Setup Instructions

Welcome to your new Sanity.io CMS! This is much easier than Decap CMS - no OAuth headaches!

## 📱 Quick Start (5 Minutes)

### Step 1: Create Sanity Account
1. Go to: https://www.sanity.io/
2. Click "Get started for free"
3. Sign up with your email (or Google/GitHub - your choice!)
4. Choose the FREE plan (it's very generous)

### Step 2: Create Your Project
1. Once logged in, click "Create new project"
2. Name it: **Kevin Franz Jr Website**
3. Choose dataset: **Production**
4. Region: **US** (or closest to you)
5. Copy your **Project ID** (looks like: `abc12345`)

### Step 3: Update Configuration
1. Open the file: `studio/sanity.config.js`
2. Replace `YOUR_PROJECT_ID` with your actual Project ID
3. Save the file

### Step 4: Install Studio Dependencies
On your computer (not phone), run:
```bash
cd studio
npm install
```

### Step 5: Deploy Your Studio
Still in the `studio` directory, run:
```bash
npx sanity deploy
```

This will:
- Build your CMS interface
- Deploy it to: `https://kevin-franz-jr.sanity.studio`
- Give you a link to access it

### Step 6: Log In! 🎉
1. Go to your Studio URL (from step 5)
2. Log in with the account you created in Step 1
3. Start adding content!

---

## 📱 Using Sanity on Mobile

Your Sanity Studio works GREAT on mobile! Just:
1. Open your Studio URL in your phone browser
2. Log in
3. Add to home screen for easy access (optional)

---

## 🎨 What You Can Do

### 📸 Media Library
- Upload images once
- Organize by category
- Reuse across the site
- Add captions and alt text

### 📝 Updates (Blog Posts)
- Write updates/news
- Add images
- Rich text editing
- Automatic URL generation

### 📅 Games & Schedule
- Add upcoming games
- Record scores and stats
- Upload game photos
- Write recaps

### 🏀 Basketball Timeline
- Track each season
- Add achievements
- Upload photo galleries
- Record stats

### 📄 Pages
- Edit website pages
- Update content
- Change images

### ⚙️ Site Settings
- Update site info
- Manage social links
- Edit navigation

---

## 🔄 How It Works

1. **You edit content** in Sanity Studio (easy interface)
2. **Content is saved** in Sanity's cloud (fast & secure)
3. **Website fetches** the content when it builds
4. **Cloudflare deploys** the updated site automatically

---

## 💰 Pricing

FREE tier includes:
- 3 users
- 100,000 documents
- 5GB assets
- Unlimited API requests

This is more than enough for your website! You won't need to pay.

---

## 🆘 Need Help?

- Sanity Docs: https://www.sanity.io/docs
- Support: https://www.sanity.io/help
- Or just ask me in the chat!

---

## 🚀 Next Steps

After setup:
1. I'll integrate Sanity with your Eleventy site
2. Content will automatically update when you publish in Sanity
3. You can manage everything from your phone!

**Let me know when you've completed Steps 1-3 above (creating account and getting Project ID) and I'll help with the rest!**
