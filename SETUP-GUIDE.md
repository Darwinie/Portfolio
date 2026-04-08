# 🚀 Portfolio Setup Guide

## 📁 Where to Place Files

### Resume PDF
```
📂 portfolio/
└── 📂 public/
    └── 📄 resume.pdf          ← Place your resume here
```

### Project Screenshots
```
📂 portfolio/
└── 📂 public/
    └── 📂 assets/
        └── 📂 projects/
            ├── 🖼️ shopify-image-resizer.png
            ├── 🖼️ timekeeping-system.png
            ├── 🖼️ shopify-automation.png
            ├── 🖼️ ocr-integration.png
            └── 🖼️ mho-system.png
```

### Social Sharing Image (OG Image)
```
📂 portfolio/
└── 📂 public/
    └── 🖼️ og-image.png          ← 1200x630px recommended
```

---

## 📸 Screenshot Specifications

| Property | Value |
|----------|-------|
| **Dimensions** | 800x400px (2:1 ratio) |
| **Format** | PNG (for UI/screenshots) or JPG (80% quality) |
| **Max File Size** | < 500KB each |
| **Naming** | kebab-case (e.g., `shopify-image-resizer.png`) |

### Tips for Great Screenshots
1. **Use browser dev tools** to capture clean screenshots (Ctrl+Shift+P → "Capture screenshot")
2. **Remove sensitive data** - blur out any real user info
3. **Show the UI** - include the browser frame for context
4. **Add annotations** - highlight key features with arrows/boxes
5. **Use consistent styling** - same browser, similar zoom level

---

## 🔗 Update Your Social Links

Edit `src/data/portfolio.js` (around line 165):

```javascript
social: [
  { name: 'GitHub', initials: 'GH', url: 'https://github.com/YOUR_USERNAME' },
  { name: 'LinkedIn', initials: 'IN', url: 'https://linkedin.com/in/YOUR_PROFILE' },
  { name: 'Facebook', initials: 'FB', url: 'https://facebook.com/YOUR_PROFILE' }
]
```

---

## 🏷️ Update Testimonials

Edit `src/data/portfolio.js` (around line 150) with real quotes:

```javascript
testimonials: [
  {
    quote: "Your actual testimonial quote here...",
    author: "Manager Name",
    role: "Company Name",
    initials: "AB"  // 2-letter initials
  }
]
```

---

## 🏃 Running Locally

```bash
cd C:\Users\IT\Documents\portfolio
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder. Deploy this to:
- **GitHub Pages**
- **Netlify** (drag & drop the `dist/` folder)
- **Vercel**
- **Azure Static Web Apps**

---

## ✅ Checklist Before Going Live

- [ ] Place `resume.pdf` in `public/`
- [ ] Add 5 project screenshots to `public/assets/projects/`
- [ ] Update social links in `src/data/portfolio.js`
- [ ] Update testimonials with real quotes
- [ ] Create `og-image.png` (1200x630px) for social sharing
- [ ] Run `npm run build` and verify no errors
- [ ] Test on mobile device
- [ ] Test dark/light mode toggle
- [ ] Verify all links work
