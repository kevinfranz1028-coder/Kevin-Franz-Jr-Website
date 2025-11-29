# Kevin Franz Jr. - Modern Website Design Guide

## Overview
This guide documents the modern redesign inspired by the Novaprobio template while maintaining Kevin's athletic recruiting focus.

## 🎨 Design System

### Color Palette
- **Primary Green**: `#1B5E20` - Main brand color (Timberwolves green)
- **Secondary Green**: `#43A047` - Accent and hover states
- **Gold Accent**: `#FFB300` - Achievements and highlights
- **Neutral Grays**: Professional text hierarchy

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 800-900 weight, tight letter-spacing
- **Body**: 400-600 weight, 1.7 line-height

## 📁 File Structure

```
src/
├── css/
│   ├── style.css (original)
│   └── style-modern.css (NEW - Novaprobio-inspired styles)
├── js/
│   ├── main.js (original)
│   └── modern-animations.js (NEW - Enhanced interactions)
└── _includes/
    └── (template components)
```

## 🧩 New Components

### 1. Sidebar Navigation
**File**: Needs to be added to layout
**Purpose**: Sticky navigation with profile, links, and quick stats

```html
<aside class="sidebar-nav">
    <div class="sidebar-profile">
        <div class="sidebar-avatar">
            <img src="/images/kevin-portrait.jpg" alt="Kevin Franz Jr.">
        </div>
        <h3 class="sidebar-name">Kevin Franz Jr.</h3>
        <p class="sidebar-role">Class of 2028 • Guard</p>
    </div>

    <ul class="sidebar-links">
        <li><a href="/" class="active">
            <span class="sidebar-icon">🏠</span>
            Home
        </a></li>
        <li><a href="/basketball/">
            <span class="sidebar-icon">🏀</span>
            Basketball
        </a></li>
        <!-- More links -->
    </ul>

    <div class="sidebar-stats">
        <div class="stat-item">
            <span class="stat-value">3.9</span>
            <span class="stat-label">GPA</span>
        </div>
        <div class="stat-item">
            <span class="stat-value">6'2"</span>
            <span class="stat-label">Height</span>
        </div>
    </div>

    <div class="sidebar-social">
        <a href="#" class="social-link">📧</a>
        <a href="#" class="social-link">📹</a>
        <a href="#" class="social-link">📸</a>
    </div>
</aside>
```

### 2. Modern Hero Section
**Classes**: `section-hero-modern`, `hero-content-modern`
**Features**: Animated label, gradient headings, image grid

```html
<section class="section-hero-modern">
    <div class="container">
        <div class="hero-content-modern">
            <div class="hero-label">
                <span>Class of 2028 Guard</span>
            </div>

            <h1 class="hero-heading-modern text-gradient">
                Kevin Franz Jr.
            </h1>

            <p class="hero-subtitle-modern">
                6'2" guard and driven student, working to play college basketball
                and study atmospheric science.
            </p>

            <div class="hero-cta-group">
                <a href="/basketball/" class="btn-modern-primary">
                    View Basketball Profile
                    <span class="btn-icon">→</span>
                </a>
                <a href="/files/resume.pdf" class="btn-modern-secondary">
                    Download Resume
                    <span class="btn-icon">→</span>
                </a>
            </div>

            <div class="hero-image-grid">
                <div class="hero-image-card">
                    <img src="/images/action-1.jpg" alt="Game action">
                    <div class="hero-image-label">In the Zone</div>
                </div>
                <div class="hero-image-card">
                    <img src="/images/action-2.jpg" alt="Team huddle">
                    <div class="hero-image-label">Leadership</div>
                </div>
                <div class="hero-image-card">
                    <img src="/images/action-3.jpg" alt="Practice">
                    <div class="hero-image-label">Work Ethic</div>
                </div>
            </div>
        </div>
    </div>
</section>
```

### 3. Enhanced Stats Display
**Classes**: `stats-showcase`, `stat-card`
**Features**: Animated counters, gradient icons, hover effects

```html
<div class="stats-showcase fade-in">
    <div class="stat-card stagger-1">
        <div class="stat-icon">🎯</div>
        <span class="stat-number">14.5</span>
        <p class="stat-description">Points Per Game</p>
    </div>

    <div class="stat-card stagger-2">
        <div class="stat-icon">🤝</div>
        <span class="stat-number">5.2</span>
        <p class="stat-description">Assists Per Game</p>
    </div>

    <div class="stat-card stagger-3">
        <div class="stat-icon">📚</div>
        <span class="stat-number">3.9</span>
        <p class="stat-description">GPA</p>
    </div>

    <div class="stat-card stagger-4">
        <div class="stat-icon">🏆</div>
        <span class="stat-number">12</span>
        <p class="stat-description">Academic Awards</p>
    </div>
</div>
```

### 4. Video Showcase Section
**Classes**: `video-section-modern`, `video-card-modern`
**Features**: Play button overlay, modal player, metadata

```html
<section class="video-section-modern">
    <div class="container">
        <div class="section-header">
            <span class="section-eyebrow">Highlights</span>
            <h2 class="section-title text-gradient">Game Footage</h2>
            <p class="section-description">
                Watch my recent performances and skill development
            </p>
        </div>

        <div class="video-grid-modern">
            <div class="video-card-modern" data-video-url="https://youtube.com/embed/VIDEO_ID">
                <div class="video-thumbnail">
                    <img src="/images/video-thumb-1.jpg" alt="Highlight reel">
                    <div class="video-play-button"></div>
                </div>
                <div class="video-info">
                    <h3 class="video-title-modern">2024-25 Season Highlights</h3>
                    <div class="video-meta">
                        <span class="video-meta-item">
                            📅 December 2024
                        </span>
                        <span class="video-meta-item">
                            ⏱️ 4:32
                        </span>
                    </div>
                    <p class="video-description">
                        First semester highlight reel featuring defensive plays,
                        transition offense, and clutch moments.
                    </p>
                </div>
            </div>

            <!-- More video cards -->
        </div>
    </div>
</section>
```

### 5. Modern Timeline
**Classes**: `timeline-modern`, `timeline-item-modern`
**Features**: Center line, alternating layout, smooth animations

```html
<div class="timeline-modern">
    <div class="timeline-item-modern fade-in">
        <div class="timeline-content-left">
            <span class="timeline-year">2024-25</span>
            <h3 class="timeline-title-modern">Freshman Season</h3>
            <p class="timeline-description">
                Varsity starter for Blue Valley Southwest. Averaged 14.5 PPG,
                5.2 APG. Named to All-League Honorable Mention.
            </p>
        </div>

        <div class="timeline-dot-modern"></div>

        <div class="timeline-content-right">
            <!-- Empty for alternating layout -->
        </div>
    </div>

    <div class="timeline-item-modern fade-in">
        <div class="timeline-content-left">
            <!-- Empty for alternating layout -->
        </div>

        <div class="timeline-dot-modern"></div>

        <div class="timeline-content-right">
            <span class="timeline-year">2023-24</span>
            <h3 class="timeline-title-modern">8th Grade</h3>
            <p class="timeline-description">
                Led middle school team to conference championship.
                MVP honors, 18 PPG.
            </p>
        </div>
    </div>
</div>
```

### 6. Testimonials Slider
**Classes**: `testimonial-section`, `testimonial-slider`, `testimonial-card`
**Features**: Auto-rotation, keyboard nav, smooth transitions

```html
<section class="testimonial-section">
    <div class="container">
        <div class="section-header">
            <span class="section-eyebrow">Testimonials</span>
            <h2 class="section-title text-gradient">What Coaches Say</h2>
        </div>

        <div class="testimonial-slider">
            <div class="testimonial-card">
                <p class="testimonial-quote">
                    "Kevin is one of the hardest-working players I've coached. His
                    basketball IQ and leadership on the court are exceptional for
                    his age. He makes everyone around him better."
                </p>
                <div class="testimonial-author">
                    <img src="/images/coach-1.jpg" alt="Coach" class="testimonial-avatar">
                    <div class="testimonial-info">
                        <h4>Coach John Smith</h4>
                        <p class="testimonial-role">Varsity Head Coach, BVSW</p>
                    </div>
                </div>
            </div>

            <!-- More testimonials -->

            <div class="slider-controls">
                <span class="slider-dot active"></span>
                <span class="slider-dot"></span>
                <span class="slider-dot"></span>
            </div>
        </div>
    </div>
</section>
```

## 🎭 Animation Classes

### Scroll Animations
Add these classes to elements for automatic scroll-triggered animations:

- `.fade-in` - Fade in from bottom
- `.slide-in-left` - Slide in from left
- `.slide-in-right` - Slide in from right
- `.scale-in` - Scale up from 95%

### Stagger Delays
For grid items, add stagger classes:
- `.stagger-1` through `.stagger-6`

Example:
```html
<div class="stats-showcase">
    <div class="stat-card fade-in stagger-1">...</div>
    <div class="stat-card fade-in stagger-2">...</div>
    <div class="stat-card fade-in stagger-3">...</div>
</div>
```

## 🎯 Usage Guide

### Step 1: Update Base Layout
Add modern CSS and JS to `_layouts/base.njk`:

```html
<head>
    <!-- Existing styles -->
    <link rel="stylesheet" href="/css/style.css">

    <!-- Add modern styles -->
    <link rel="stylesheet" href="/css/style-modern.css">
</head>

<body>
    <!-- Content -->

    <!-- Existing scripts -->
    <script src="/js/main.js"></script>

    <!-- Add modern animations -->
    <script src="/js/modern-animations.js"></script>
</body>
```

### Step 2: Implement Sidebar Layout
Wrap your main content in the two-column grid:

```html
<div class="main-wrapper">
    <!-- Sidebar -->
    <aside class="sidebar-nav">
        <!-- Sidebar content -->
    </aside>

    <!-- Main content -->
    <main>
        <!-- Page sections -->
    </main>
</div>
```

### Step 3: Add Scroll Animations
Add animation classes to sections:

```html
<div class="card-glance fade-in stagger-1">
    <!-- Card content -->
</div>
```

## 📱 Responsive Behavior

### Breakpoints
- **Desktop**: 1200px+ (Sidebar visible)
- **Tablet**: 768px - 1199px (Sidebar stacks on top)
- **Mobile**: < 768px (Single column, mobile menu)

### Mobile Menu
The JavaScript automatically handles mobile menu toggle for the existing navbar.

## 🚀 Performance Features

1. **Lazy Loading**: Images load as they enter viewport
2. **Intersection Observer**: Efficient scroll animations
3. **CSS Transforms**: Hardware-accelerated animations
4. **Debounced Scroll**: Optimized scroll event handling

## 🎨 Customization

### Colors
Modify CSS variables in `style-modern.css`:

```css
:root {
    --primary-color: #1B5E20;  /* Change team colors here */
    --accent-gold: #FFB300;     /* Change accent color */
}
```

### Typography
Update font imports and variables:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700;900&display=swap');

body {
    font-family: 'Your Font', sans-serif;
}
```

## 📋 Implementation Checklist

- [ ] Add `style-modern.css` to base layout
- [ ] Add `modern-animations.js` to base layout
- [ ] Create sidebar navigation component
- [ ] Update hero section with modern classes
- [ ] Add stats showcase section
- [ ] Implement video section
- [ ] Create modern timeline
- [ ] Add testimonials slider
- [ ] Test all animations
- [ ] Test responsive design
- [ ] Optimize images for new sections

## 🆘 Troubleshooting

### Animations not working?
- Check that `modern-animations.js` is loaded
- Verify animation classes are spelled correctly
- Check browser console for errors

### Sidebar not sticky?
- Ensure parent container isn't `overflow: hidden`
- Verify sidebar has `.sidebar-nav` class
- Check that parent has enough height

### Videos not playing?
- Verify video URLs are correct
- Check `data-video-url` attribute
- Ensure modal styles are loaded

## 📚 Resources

- [Inter Font](https://fonts.google.com/specimen/Inter)
- [Novaprobio Template](https://novaprobio.webflow.io/) - Inspiration source
- [CSS Tricks - Smooth Scrolling](https://css-tricks.com/snippets/jquery/smooth-scrolling/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

**Built with inspiration from Novaprobio template**
**Customized for student-athlete recruiting**
**Kevin Franz Jr. - Class of 2028**
