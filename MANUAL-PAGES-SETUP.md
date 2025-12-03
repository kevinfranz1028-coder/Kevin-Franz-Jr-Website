# 📝 Manual Pages Setup Guide

Due to network restrictions in the deployment environment, pages need to be added manually through Sanity Studio.

## 🎯 Quick Setup

1. **Open Sanity Studio:** https://kevin-franz-jr.sanity.studio/
2. **Click "Website Pages"** in the left sidebar
3. **Create each page below** by clicking "+ Create" button

---

## 📄 Pages to Create

### 1. Home Page

Click "+ Create" → Select "📄 Website Pages"

**Page ID:** `home`
**Title:** `Home`

Then copy the content from: `src/_data/pages/home.json`

- Open the file and copy each section (hero, glanceCards, about, tiles) into the corresponding fields

---

### 2. Basketball Page

**Page ID:** `basketball`
**Title:** `Basketball`

Copy content from: `src/_data/pages/basketball.json`

- Player Info section
- Highlights section
- Stats section
- Training section
- Recruiting Profiles
- Social Media
- Contacts

---

### 3. Academics Page

**Page ID:** `academics`
**Title:** `Academics`

Copy content from: `src/_data/pages/academics.json`

---

### 4. Media Page

**Page ID:** `media`
**Title:** `Media`

Copy content from: `src/_data/pages/media.json`

---

### 5. Projects Page

**Page ID:** `projects`
**Title:** `Projects`

Copy content from: `src/_data/pages/projects.json`

---

### 6. Character Page

**Page ID:** `character`
**Title:** `Character & Community`

Copy content from: `src/_data/pages/character.json`

---

### 7. Updates Page

**Page ID:** `updates`
**Title:** `Updates`

Copy content from: `src/_data/pages/updates.json`

---

### 8. Contact Page

**Page ID:** `contact`
**Title:** `Contact`

Copy content from: `src/_data/pages/contact.json`

---

## 🚀 Alternative: Run Migration from Your Computer

If you want to run the automated migration from your own computer (which likely won't have network restrictions):

1. **Clone the repo** (if not already):
   ```bash
   git clone https://github.com/kevinfranz1028-coder/Kevin-Franz-Jr-Website.git
   cd Kevin-Franz-Jr-Website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the migration**:
   ```bash
   SANITY_AUTH_TOKEN=sk8LVCB4PYIqgr648ZSzTRsSranOofIkzEPUYFsdXlNCzSuKNwxK8np3aGO5h0mzcrr4l0Q2jTwEuLupFLZLPGmGrjq16amB7s2qKfvKp3ozTUV0hvVMdr3IInJQC2907K3Jt9IVRPDQtgqq4CRBQE2mrkahIvEHD56DyvLXxrLdPovNaz3q node scripts/migrate-pages-to-sanity.js
   ```

This should work from your local machine without the 403 network errors.

---

## ✅ After Adding Pages

Once pages are added to Sanity:

1. **Publish each page** (click Publish button)
2. **Wait for webhook** to trigger Cloudflare deployment (~2-3 min)
3. **Check your live site** to see the changes

---

## 📋 Page JSON Files Reference

All page content is in: `src/_data/pages/`

- `home.json` - Homepage content
- `basketball.json` - Basketball profile
- `academics.json` - Academic achievements
- `media.json` - Photos and videos
- `projects.json` - Personal projects
- `character.json` - Community involvement
- `updates.json` - News and updates
- `contact.json` - Contact information

You can view these files to see the exact structure and content to add.
