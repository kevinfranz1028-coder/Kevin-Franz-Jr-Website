# Claude AI Widget - Quick Start 🚀

## ⚡ 3-Step Setup

### 1️⃣ Get Claude API Key
- Go to https://console.anthropic.com/
- Create an API key
- Copy it (starts with `sk-ant-api...`)

### 2️⃣ Add to Netlify
- Netlify Dashboard → Your Site → **Environment Variables**
- Add: `ANTHROPIC_API_KEY` = your API key
- Save

### 3️⃣ Deploy & Use
- Push code to GitHub (trigger deploy)
- Go to `/admin/` on your site
- Click **🤖 AI Assistant** button

---

## 💬 Example Prompts

### Game Recap
```
Create a game recap for yesterday vs Lincoln High.
Won 68-62, I scored 24 pts, 6 reb, 8 ast.
Hit game-winning three with 30 seconds left.
```

### Schedule Entry
```
Add game: Next Friday 7pm vs Johnson County HS
Away game at their gym, JV team, season 2024-2025
```

### Timeline Entry
```
Timeline for 8th grade 2023-2024:
Middle School Eagles, 18 ppg, 5 apg, 6 rpg
Led team to championship, tournament MVP
```

---

## 🎯 Using the Widget

1. Open CMS at `/admin/`
2. Create or edit any content
3. Click **🤖 AI Assistant**
4. Type your request
5. Click **Send to Claude**
6. Review generated content
7. Click **Apply Generated Content**
8. Edit if needed & publish

---

## 🎨 Pro Tips

✅ **Be specific** - Include dates, scores, stats, details
✅ **Use context** - "yesterday", "last Friday", "season opener"
✅ **Iterate** - Chat back and forth to refine content
✅ **Review** - Always check before publishing
✅ **Combine** - AI draft → manual polish = best results

---

## 🐛 Quick Fixes

**Widget missing?** → Hard refresh (Cmd+Shift+R)
**API error?** → Check API key in Netlify env vars
**Won't apply?** → Content might not match field type

---

## 📝 Widget Config (Optional)

To use the widget for specific fields, edit `src/admin/config.yml`:

```yaml
# Change this:
- {label: "Body", name: "body", widget: "markdown"}

# To this:
- {label: "Body", name: "body", widget: "claude-ai"}
```

---

## 💰 Costs

~$0.01-0.05 per request
Monitor at https://console.anthropic.com/

---

**That's it! Start creating content with AI! 🏀🤖**
