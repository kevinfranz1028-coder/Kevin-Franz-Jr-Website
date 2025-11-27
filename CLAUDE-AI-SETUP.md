# Claude AI Widget Setup Guide

This guide will help you set up the Claude AI widget for your Netlify CMS.

## 🎯 What This Does

The Claude AI widget adds an AI assistant directly into your CMS interface. You can:

- Type natural language instructions like "Create a game recap for yesterday vs Lincoln High, scored 24 pts"
- Have Claude generate properly formatted content
- Review and apply the generated content with one click
- Chat back and forth to refine the content

## 📋 Prerequisites

1. A Netlify account with this site deployed
2. An Anthropic API key (get one at https://console.anthropic.com/)

## 🔧 Setup Instructions

### Step 1: Get Your Claude API Key

1. Go to https://console.anthropic.com/
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. **Copy the API key** (you'll need it in the next step)

### Step 2: Add API Key to Netlify

1. Log in to your Netlify dashboard
2. Go to your site settings
3. Navigate to **Build & Deploy** → **Environment Variables**
4. Click **Add a variable**
5. Add the following:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: Your Claude API key (starts with `sk-ant-api...`)
6. Click **Save**

### Step 3: Deploy Your Site

The widget files are already in your repository. You just need to deploy:

1. Push your code to GitHub (if not already done)
2. Netlify will automatically rebuild your site
3. Wait for the build to complete (~2-3 minutes)

### Step 4: Test the Widget

1. Go to your CMS admin: `https://your-site.netlify.app/admin/`
2. Log in with your credentials
3. Navigate to any content section (Updates, Games, or Timeline)
4. Look for the "🤖 AI Assistant" button

## 🎨 How to Use the Widget

### Option 1: Using the Widget in config.yml (Optional)

You can explicitly add the Claude AI widget to specific fields in your `src/admin/config.yml`:

```yaml
# Example: Add to a markdown field
- {label: "Body", name: "body", widget: "claude-ai"}

# Instead of:
- {label: "Body", name: "body", widget: "markdown"}
```

### Option 2: Global AI Assistant (Recommended)

The widget also works as a standalone tool. Click the "🤖 AI Assistant" button that appears at the top of your editor to:

1. **Generate new content**:
   - "Create a game recap for yesterday's game vs Lincoln High where I scored 24 points and had 6 rebounds"

2. **Modify existing content**:
   - "Make this summary more exciting"
   - "Add more details about the defensive plays"

3. **Create structured data**:
   - "Generate a timeline entry for my freshman year with stats: 15 ppg, 5 apg, 4 rpg"

## 💡 Example Prompts

### For Game Updates (Blog Posts)
```
Create a game recap for yesterday's tournament game vs Lincoln High.
We won 68-62. I scored 24 points, 6 rebounds, 8 assists.
Highlight how I hit the game-winning three-pointer with 30 seconds left.
```

### For Game Schedule
```
Add a game for next Friday at 7pm vs Johnson County High School.
It's an away game at their gymnasium. Season is 2024-2025, team is JV.
```

### For Timeline Entries
```
Create a timeline entry for my 8th grade year (2023-2024).
Team: Middle School Eagles
Stats: 18 ppg, 5 apg, 6 rpg
Highlights: Led team to championship, MVP of district tournament,
Made game-winning shot in finals
```

## 🔍 How It Works

1. **You type a request** in natural language
2. **Claude processes it** using the Netlify Function (secure API call)
3. **Claude generates content** in the proper format for your field
4. **You review** the generated content in the chat
5. **Click "Apply"** to insert it into your CMS field
6. **Edit as needed** and publish

## 🔒 Security Notes

- Your API key is stored securely in Netlify environment variables
- It's never exposed to the browser
- All API calls go through a secure Netlify Function
- The function validates requests before calling Claude

## 🐛 Troubleshooting

### Widget doesn't appear
- Clear your browser cache and hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Check browser console for JavaScript errors
- Verify the files are in `_site/admin/` after build

### "API key not configured" error
- Double-check the environment variable name is exactly: `ANTHROPIC_API_KEY`
- Make sure you saved the variable in Netlify
- Trigger a new deploy after adding the variable

### Widget loads but API calls fail
- Verify your API key is valid at https://console.anthropic.com/
- Check your Anthropic account has available credits
- Look at Netlify Function logs for detailed errors

### Content doesn't apply correctly
- Make sure the generated content matches the field type
- For markdown fields, the content should include markdown
- For structured fields, ensure it's valid JSON

## 💰 Cost Considerations

- Claude API uses a pay-per-use model
- Typical content generation: $0.01-0.05 per request
- Monitor usage at https://console.anthropic.com/
- Set usage limits in your Anthropic account settings

## 🎓 Tips for Best Results

1. **Be specific**: Include all relevant details in your prompt
2. **Use context**: Mention dates, opponent names, scores, stats
3. **Iterate**: You can refine content by chatting back and forth
4. **Review**: Always review AI-generated content before publishing
5. **Combine**: Use AI for first draft, then manually polish

## 📚 Advanced Customization

### Modify System Prompts

Edit `netlify/functions/claude-ai.js` to customize how Claude generates content:

```javascript
function buildSystemPrompt(contentType, userContext) {
  // Customize prompts for different content types
  // Add sport-specific terminology
  // Adjust tone and style
}
```

### Add New Content Types

The function automatically detects content types based on your CMS collections:
- `updates` - Blog posts and updates
- `games` - Game schedule entries
- `timeline` - Basketball timeline entries

Add new types by editing the `typeSpecificPrompts` object in the function.

### Customize Widget Styling

Edit `src/admin/claude-widget.css` to match your brand:

```css
.claude-toggle-btn {
  background: linear-gradient(135deg, #YOUR-COLOR-1, #YOUR-COLOR-2);
}
```

## 🚀 Next Steps

Now that your AI widget is set up:

1. ✅ Test it with a simple prompt
2. ✅ Generate a game recap
3. ✅ Create a new timeline entry
4. ✅ Experiment with different prompts
5. ✅ Customize the prompts to fit your style

## 📞 Support

If you run into issues:

1. Check the troubleshooting section above
2. Review Netlify Function logs for errors
3. Check browser console for JavaScript errors
4. Verify environment variables are set correctly

---

**Happy content creating! 🏀🤖**
