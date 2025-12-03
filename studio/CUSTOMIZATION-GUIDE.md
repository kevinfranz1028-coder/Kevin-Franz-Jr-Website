# 🎨 Sanity Studio Customization Guide

Your Studio can be customized in tons of creative ways! Here's how:

## 🖌️ 1. Custom Styling (CSS)

**File:** `studio/custom-studio.css`

Change anything you want:
- Colors
- Fonts
- Spacing
- Shadows
- Animations
- Borders

**Example - Change main color:**
```css
:root {
  --brand-primary: #YOUR_COLOR !important;
}
```

**Example - Add custom boxes/sections:**
```css
.my-custom-box {
  background: linear-gradient(135deg, #1B5E20 0%, #4CAF50 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
```

---

## 🎯 2. Custom Components

Create React components for custom field inputs!

**Example:** Create `studio/components/CustomColorPicker.jsx`

```jsx
import {useState} from 'react'

export function CustomColorPicker(props) {
  const {value, onChange} = props

  return (
    <div style={{padding: '20px', background: '#f5f5f5', borderRadius: '8px'}}>
      <h3>Pick Your Color</h3>
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
        style={{width: '100%', height: '60px', cursor: 'pointer'}}
      />
      <p style={{marginTop: '10px'}}>Selected: {value}</p>
    </div>
  )
}
```

Then use it in your schema:
```js
{
  name: 'brandColor',
  type: 'string',
  components: {
    input: CustomColorPicker
  }
}
```

---

## 📐 3. Custom Desk Structure

Organize your content types in creative ways!

**Create:** `studio/deskStructure.js`

```js
export default (S) =>
  S.list()
    .title('Content')
    .items([
      // Custom section with icon and description
      S.listItem()
        .title('🏀 Basketball')
        .child(
          S.list()
            .title('Basketball Content')
            .items([
              S.documentTypeListItem('timelineYear').title('Timeline'),
              S.documentTypeListItem('game').title('Games'),
            ])
        ),

      // Divider
      S.divider(),

      // Another section
      S.listItem()
        .title('📸 Media & Updates')
        .child(
          S.list()
            .title('Media & Updates')
            .items([
              S.documentTypeListItem('media').title('Media Library'),
              S.documentTypeListItem('update').title('Blog Posts'),
            ])
        ),
    ])
```

Then add to `sanity.config.js`:
```js
import deskStructure from './deskStructure'

plugins: [
  deskTool({
    structure: deskStructure
  }),
]
```

---

## 🎨 4. Add Custom Branding

**In `sanity.config.js`:**

```js
export default defineConfig({
  // ... other config

  title: 'Kevin Franz Jr. - Content Manager',

  // Custom logo
  icon: () => '🏀',

  // Or use an image
  // logo: () => <img src="/path/to/logo.png" />
})
```

---

## 🔧 5. Field-Level Customization

Add custom validation, descriptions, and UI:

```js
{
  name: 'email',
  title: 'Contact Email',
  type: 'string',
  description: '📧 Your primary contact email',
  validation: Rule => Rule.required().email(),

  // Custom placeholder
  placeholder: 'kevin@example.com',

  // Hidden by default
  hidden: ({document}) => !document.showContact,

  // Read-only
  readOnly: true,
}
```

---

## 🎭 6. Custom Preview Components

Control how documents appear in lists:

```js
{
  name: 'game',
  type: 'document',
  preview: {
    select: {
      opponent: 'opponent',
      date: 'date',
      result: 'result',
    },
    prepare({opponent, date, result}) {
      const emoji = result === 'win' ? '✅' : '❌'
      return {
        title: `${emoji} vs ${opponent}`,
        subtitle: new Date(date).toLocaleDateString(),
        media: () => '🏀'
      }
    }
  }
}
```

---

## 🚀 Quick Customization Examples:

### Change Studio Background:
```css
[data-ui="AppLayout"] {
  background: linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%) !important;
}
```

### Add Custom Header:
```css
[data-ui="Navbar"]::before {
  content: "🏀 Kevin Franz Jr. CMS";
  display: block;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
}
```

### Custom Card Hover Effects:
```css
[data-ui="Card"] {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

[data-ui="Card"]:hover {
  transform: scale(1.02) translateY(-4px) !important;
  box-shadow: 0 12px 40px rgba(27, 94, 32, 0.2) !important;
}
```

### Make Buttons Bigger:
```css
[data-ui="Button"] {
  padding: 12px 24px !important;
  font-size: 16px !important;
  min-height: 48px !important;
}
```

---

## 📱 Mobile Customization:

```css
@media (max-width: 768px) {
  [data-ui="AppLayout"] {
    padding: 12px !important;
  }

  [data-ui="Button"] {
    width: 100% !important;
    margin-bottom: 12px !important;
  }
}
```

---

## 🎯 Apply Your Changes:

After editing `custom-studio.css`:

1. **Redeploy Studio:**
   ```bash
   cd ~/Kevin-Franz-Jr-Website/studio
   npx sanity deploy
   ```

2. **Or run locally to test:**
   ```bash
   npm run dev
   ```
   Opens at: http://localhost:3333

---

## 💡 Tips:

- Use browser DevTools to inspect elements and find the right selectors
- Test changes locally before deploying
- Keep a backup of your CSS before major changes
- Use `!important` to override default Sanity styles
- Check the [Sanity docs](https://www.sanity.io/docs) for more advanced customizations

**Get creative! The Studio is yours to design! 🎨**
