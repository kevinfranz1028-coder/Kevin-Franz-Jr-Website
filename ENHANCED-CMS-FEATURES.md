# Enhanced CMS Features Documentation

## Overview

The Netlify CMS has been significantly enhanced with two major features:

1. **Dual-Mode AI Assistant** - Content generation AND full site editing capabilities
2. **Advanced Media Upload Widget** - Multi-file upload with drag & drop support

All existing API integrations and functionality have been preserved and remain fully functional.

---

## 1. Enhanced Claude AI Widget

### Two Powerful Modes

The AI widget now operates in two distinct modes:

#### 📝 Content Generation Mode (Default)
- **Purpose**: Generate content for the specific field you're editing
- **Use Cases**:
  - Write game recaps
  - Create timeline entries
  - Generate blog post content
  - Draft player bios and descriptions

**Example Prompts:**
```
- "Create a game recap for last night's game vs Lincoln High where I scored 18 points"
- "Write a timeline entry for my freshman year season"
- "Generate an academic update about the semester"
```

#### 🛠️ Site Editor Mode
- **Purpose**: Make changes across your entire website
- **Use Cases**:
  - Update player stats on any page
  - Add new sections to existing pages
  - Modify navigation or footer
  - Create new content entries
  - Update images and media

**Example Prompts:**
```
- "Add my latest GPA (3.8) to the academics page"
- "Update the hero image on the homepage"
- "Create a new game entry for tonight's match vs Oak Park at 7pm"
- "Add a highlights section to the basketball page"
```

### How to Use

1. **Open the AI Assistant**: Click the "🤖 AI Assistant" button in any content field
2. **Choose Your Mode**:
   - Click "📝 Content" for content generation
   - Click "🛠️ Site Editor" for site-wide changes
3. **Type Your Request**: Describe what you want in natural language
4. **Apply Changes**:
   - In Content mode: Click "✅ Apply Generated Content"
   - In Site Editor mode: Changes are automatically committed and deployed

### Key Features

- ✅ **Dual-Mode Operation**: Switch between content generation and site editing
- ✅ **Natural Language**: No technical knowledge required
- ✅ **Auto-Deploy**: Site Editor changes automatically rebuild your site
- ✅ **Chat History**: See all your requests and responses
- ✅ **Context-Aware**: Understands which page/content you're working on
- ✅ **Backward Compatible**: All existing functionality still works

---

## 2. Enhanced Media Upload Widget

### Features

- ✅ **Drag & Drop**: Drag files directly onto the upload zone
- ✅ **Multi-File Upload**: Upload multiple files at once
- ✅ **File Type Support**:
  - Images: JPG, PNG, GIF, WEBP, SVG
  - Videos: MP4, WEBM, MOV
  - Documents: PDF
- ✅ **Preview**: See thumbnails before uploading
- ✅ **File Management**: Easy remove/delete functionality
- ✅ **Size Limit**: Up to 10MB per file
- ✅ **Validation**: Automatic file type and size validation

### How to Use

1. **Find the Upload Zone**: Look for the file upload area in your content fields
2. **Add Files**:
   - **Option 1**: Drag and drop files onto the zone
   - **Option 2**: Click "Choose Files" to browse
3. **Review**: See previews of all uploaded files
4. **Remove**: Click the × button to remove unwanted files
5. **Save**: Save your entry to commit the media files

### Supported Use Cases

- **Game Images**: Upload action shots from games
- **Profile Photos**: Update player headshots
- **Video Highlights**: Add game highlight videos
- **Academic Documents**: Upload resume PDFs
- **Timeline Gallery**: Add multiple photos to timeline entries

---

## 3. Preserved API Integrations

All existing APIs and integrations continue to work without any changes:

### ✅ Claude AI API
- **Status**: Fully functional
- **Usage**: Powers both content generation and site editing
- **Configuration**: Uses ANTHROPIC_API_KEY from environment variables

### ✅ GitHub API
- **Status**: Fully functional
- **Usage**: Handles auto-commits and deployments
- **Configuration**: Uses GITHUB_TOKEN and GITHUB_REPO from environment variables

### ✅ Netlify Identity
- **Status**: Fully functional
- **Usage**: User authentication for CMS access
- **Configuration**: Managed through Netlify dashboard

### ✅ Git Gateway
- **Status**: Fully functional
- **Usage**: Backend for content management
- **Configuration**: Defined in config.yml

---

## 4. Technical Architecture

### Enhanced Files

#### New Files Created:
- `/src/admin/media-upload-widget.js` - Multi-file upload widget
- `/src/admin/media-upload-widget.css` - Upload widget styles
- `/ENHANCED-CMS-FEATURES.md` - This documentation

#### Modified Files:
- `/src/admin/claude-widget.js` - Added site editor mode
- `/src/admin/claude-widget.css` - Added mode switcher styles
- `/src/admin/index.html` - Registered new widgets

#### Existing Files (Unchanged):
- `/src/admin/config.yml` - CMS configuration
- `/netlify/functions/claude-ai.js` - Content generation function
- `/netlify/functions/ai-site-editor.js` - Site editing function
- `/src/js/ai-overlay.js` - Frontend AI overlay

### Widget Registration

Both widgets are automatically registered with Netlify CMS:

```javascript
// Claude AI Widget (enhanced)
CMS.registerWidget('claude-ai', ClaudeControl, ClaudePreview);

// Media Upload Widget
CMS.registerWidget('media-upload', MediaUploadControl, MediaUploadPreview);
```

---

## 5. Configuration

### Environment Variables Required

Make sure these are set in your Netlify dashboard:

```bash
# Claude AI
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# GitHub Integration
GITHUB_TOKEN=ghp_xxxxxxxxxxxxx
GITHUB_REPO=kevinfranz1028-coder/Kevin-Franz-Jr-Website
GITHUB_BRANCH=claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4

# Netlify (optional, for deploy links)
NETLIFY_SITE_ID=your-site-id
```

### Media Storage

- **Location**: `src/images/`
- **Public Path**: `/images/`
- **Max Size**: 10MB per file
- **Supported Types**: Images, Videos, PDFs

---

## 6. Usage Examples

### Example 1: Update Game Stats (Site Editor Mode)

1. Open any content field
2. Click AI Assistant → Switch to "🛠️ Site Editor"
3. Type: "Add a new game entry for tonight vs Roosevelt High at 7pm, home game"
4. AI creates the game entry automatically
5. Site rebuilds with new game on schedule

### Example 2: Generate Content (Content Mode)

1. Edit a blog post
2. Click AI Assistant (already in Content mode)
3. Type: "Write a game recap about scoring 22 points and 8 assists"
4. Click "Apply Generated Content"
5. Content appears in your field

### Example 3: Upload Multiple Images

1. Go to Timeline entry
2. Find Gallery section
3. Drag 5 game photos onto upload zone
4. Preview all images
5. Remove any you don't want
6. Save entry

---

## 7. Troubleshooting

### AI Assistant Issues

**Problem**: "API key not configured" error
- **Solution**: Check that ANTHROPIC_API_KEY is set in Netlify environment variables

**Problem**: Site Editor changes not applying
- **Solution**: Verify GITHUB_TOKEN and GITHUB_REPO are correctly set

**Problem**: Chat history not showing
- **Solution**: Click "Clear Chat" and try again

### Media Upload Issues

**Problem**: "File too large" error
- **Solution**: Ensure files are under 10MB. Compress images if needed.

**Problem**: "Invalid file type" error
- **Solution**: Only JPG, PNG, GIF, WEBP, SVG, MP4, WEBM, MOV, and PDF are supported

**Problem**: Upload stuck
- **Solution**: Refresh the page and try again with fewer files

---

## 8. Best Practices

### Using the AI Assistant

✅ **DO**:
- Be specific in your requests
- Use natural language
- Provide context (dates, opponents, stats, etc.)
- Review AI-generated content before applying
- Use Content mode for field-specific edits
- Use Site Editor mode for page-wide changes

❌ **DON'T**:
- Make vague requests like "update the site"
- Request changes to files outside the site structure
- Expect instant deployment (allow 1-2 minutes for builds)

### Using Media Upload

✅ **DO**:
- Compress large images before uploading
- Use descriptive filenames
- Preview files before saving
- Remove unwanted files before saving

❌ **DON'T**:
- Upload files over 10MB
- Use special characters in filenames
- Upload unrelated file types

---

## 9. Security & Privacy

### API Keys
- All API keys are stored securely in Netlify environment variables
- Never commit API keys to the repository
- Keys are never exposed to the frontend

### File Uploads
- All uploads go through Git Gateway
- Files are stored in the repository
- Version controlled with Git

### User Authentication
- Netlify Identity handles authentication
- Only authorized users can access the CMS
- All actions are logged in Git history

---

## 10. Future Enhancements

Potential features for future development:

- [ ] AI-powered image optimization
- [ ] Bulk content generation
- [ ] Advanced file type support (audio, etc.)
- [ ] Cloud storage integration (Cloudinary, etc.)
- [ ] AI content suggestions based on analytics
- [ ] Voice input for AI requests
- [ ] Collaborative editing features

---

## Support

For issues or questions:

1. Check this documentation first
2. Review the troubleshooting section
3. Check the console for error messages
4. Contact your site administrator

---

## Summary

Your CMS now has powerful new capabilities while maintaining all existing functionality:

🎉 **What's New**:
- Dual-mode AI (Content + Site Editor)
- Advanced file uploads
- Better user experience

✅ **What's Preserved**:
- All API integrations
- Existing content structure
- Current workflows
- Configuration settings

Your recruiting website is now easier to manage than ever!
