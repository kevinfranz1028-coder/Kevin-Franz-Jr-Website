# 🔄 Auto-Deploy Setup: Sanity → Cloudflare Pages

Set up automatic deployments when you publish content in Sanity!

## 📋 What This Does:

When you **publish** content in Sanity Studio:
1. Sanity sends a webhook to Cloudflare
2. Cloudflare triggers a new build
3. Your site updates automatically in 2-3 minutes

No manual deployments needed! 🎉

---

## 🚀 Setup Instructions:

### Step 1: Get Cloudflare Deploy Hook

1. Go to your Cloudflare Pages dashboard:
   https://dash.cloudflare.com

2. Select your project: **kevin-franz-jr-website-2**

3. Go to **Settings** → **Builds & deployments**

4. Scroll to **Deploy hooks**

5. Click **Add deploy hook**
   - Name: `Sanity Content Updates`
   - Branch: `claude/review-deployments-answer-01KDSuvjBiv7qjNd2ScZhKgh`
   - Click **Save**

6. **Copy the webhook URL** (looks like: `https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/...`)

### Step 2: Add Webhook to Sanity

1. Go to your Sanity project settings:
   https://www.sanity.io/manage/personal/project/q1z27lr2/api/webhooks

2. Click **Create webhook**

3. Fill in the details:
   - **Name:** `Deploy to Cloudflare Pages`
   - **URL:** Paste the Cloudflare webhook URL you copied
   - **Dataset:** `production`
   - **Trigger on:** Check these:
     - ✅ Create
     - ✅ Update
     - ✅ Delete
   - **Filter:** Leave empty (triggers on all documents)
   - **Projection:** Leave empty
   - **HTTP method:** `POST`
   - **HTTP Headers:** Leave empty
   - **Include drafts:** ❌ Unchecked (only trigger on published content)

4. Click **Save**

### Step 3: Test It!

1. Go to your Sanity Studio: https://kevin-franz-jr.sanity.studio/

2. Edit any document (e.g., a timeline year or update)

3. Click **Publish**

4. Go to Cloudflare Pages → Deployments

5. You should see a new deployment starting!

6. Wait 2-3 minutes, then check your live site

---

## 🎯 How to Use:

### Before (Manual):
1. Edit content in Sanity ✏️
2. Open terminal
3. Git pull, commit, push
4. Wait for deploy
5. Total time: ~5-10 minutes

### After (Automatic):
1. Edit content in Sanity ✏️
2. Click "Publish" 🚀
3. Total time: ~2-3 minutes

---

## 🔧 Advanced: Conditional Webhooks

Want webhooks to only trigger for specific content types? Update the **Filter** field:

**Only trigger on page updates:**
```groq
_type == "websitePage"
```

**Only trigger on basketball content:**
```groq
_type in ["timelineYear", "game"]
```

**Only trigger on published updates:**
```groq
_type == "update" && !(_id in path("drafts.**"))
```

---

## 🐛 Troubleshooting:

**Webhook not firing?**
- Check the webhook is enabled in Sanity
- Make sure you **published** (not just saved as draft)
- Check Sanity webhook logs: https://www.sanity.io/manage/personal/project/q1z27lr2/api/webhooks

**Deployment not triggering?**
- Verify the Cloudflare webhook URL is correct
- Check the branch name matches your production branch
- Look at Cloudflare deployment logs

**Deployment failing?**
- Check build logs in Cloudflare Pages
- Ensure SANITY_PROJECT_ID environment variable is set
- Verify Sanity data is valid

---

## 💡 Pro Tips:

1. **Use Draft Mode:**
   - Save as draft while working
   - Preview changes
   - Publish when ready (triggers deploy)

2. **Batch Updates:**
   - Make multiple edits
   - Publish all at once
   - Only one deployment triggered!

3. **Monitor Deployments:**
   - Bookmark Cloudflare deployments page
   - Check if content changes are live
   - Usually takes 2-3 minutes

---

## 📊 Webhook Log:

After setup, you can view webhook activity:
- Sanity: https://www.sanity.io/manage/personal/project/q1z27lr2/api/webhooks
- Click on your webhook → View logs
- See all webhook calls, status codes, timing

---

**Once set up, you'll never need to manually deploy again!** 🎉
