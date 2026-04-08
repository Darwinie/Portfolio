# Assets Guide

## 📁 Folder Structure

```
public/
├── resume.pdf                    ← Place your resume PDF here
├── og-image.png                  ← Place your social sharing image here (1200x630px recommended)
└── assets/
    ├── projects/                 ← Place project screenshots here
    │   ├── shopify-image-resizer.png
    │   ├── timekeeping-system.png
    │   ├── shopify-automation.png
    │   ├── ocr-integration.png
    │   └── mho-system.png
    └── screenshots/              ← Place any other screenshots here
```

## 📸 Screenshot Guidelines

### Recommended Sizes
- **Project Cards**: 800x400px (2:1 ratio)
- **OG Image**: 1200x630px (1.91:1 ratio)

### Format
- Use **PNG** for screenshots with text/UI
- Use **JPG** (quality 80%) for photos
- Keep file sizes under **500KB** each for fast loading

### Naming Convention
Use kebab-case: `project-name.png`

## 📄 Resume
- Name your resume file as `resume.pdf`
- Place it directly in the `public/` folder
- The download button in the hero section links to this file

## 🔗 Updating Social Links

Edit `src/data/portfolio.js` and update the `social` array:

```javascript
social: [
  { name: 'GitHub', initials: 'GH', url: 'https://github.com/YOUR_USERNAME' },
  { name: 'LinkedIn', initials: 'IN', url: 'https://linkedin.com/in/YOUR_PROFILE' },
  { name: 'Facebook', initials: 'FB', url: 'https://facebook.com/YOUR_PROFILE' }
]
```

## 🖼️ Adding Project Screenshots

1. Place screenshots in `public/assets/projects/`
2. Update `src/data/portfolio.js` projects array with image paths:

```javascript
{
  title: 'Shopify Image Resizer',
  image: '/assets/projects/shopify-image-resizer.png',  // Add this
  description: '...',
  // ...
}
```

3. Update the `ProjectsSection.vue` component to display the image instead of the gradient background.
