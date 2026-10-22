# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic dark/gradient portfolio with a distinctive, editorial single-page portfolio that presents Darwin as a software engineer who builds automation and internal systems.

**Architecture:** Keep Vue 3 + Vite. Build a small custom design system (tokens, base styles, shared primitives), then compose six sections from a single structured content model. Remove the old sections, composables, and styles once the new shell is wired. Add Vitest for component/content tests and Playwright for responsive, accessibility, and visual verification.

**Tech Stack:** Vue 3, Vite 5, plain CSS, `lucide-vue-next`, `@fontsource` fonts, `vite-imagetools`, Vitest 2, `@vue/test-utils`, jsdom 25, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-22-portfolio-redesign-design.md`

## Global Constraints

- **Stack:** Vue 3 + Vite only. Do not add Vuetify, Vue Router, Pinia, Tailwind, GSAP, or an animation library.
- **Theme:** light editorial only. No dark-mode toggle.
- **Palette:** `--paper: #F4F0E7`, `--paper-deep: #EAE4D7`, `--ink: #171512`, `--ink-soft: #3A3630`, `--muted: #6D675C`, `--line: #D5CDBE`, `--accent: #B4431D`, `--accent-soft: #F0DED2`, `--code-bg: #1C1A17`, `--code-text: #EDE7DB`.
- **Type:** Newsreader (display), IBM Plex Sans (body/UI), IBM Plex Mono (metadata/code). Self-hosted via `@fontsource`. No Google Fonts runtime request, no Inter.
- **Forbidden UI:** gradients, gradient text, glassmorphism, particles, typing headline, animated counters, marquee, percentage skill bars, emoji UI icons, rounded card grids, drop shadows, testimonials, contact form, `#` links.
- **Content honesty:** no invented metrics, dates, issuers, or quotes. Use `≈70%` where the source says approximately.
- **Images:** no unredacted screenshots, internal store URLs, customer data, system names, or browser bookmarks may ship. Only the redacted timekeeping image and diagrams are used.
- **Photo workflow:** `src/assets/profile.png` remains the replaceable source photo.
- **Resume:** `/Lubugan_Darwin_Resume.pdf` must remain downloadable.
- **Canonical URL:** `https://darwinlubugan.dev/`, deployed at the domain root unless changed.
- **Windows shell:** use `npm.cmd` and `npx.cmd`; `npm.ps1` is blocked by execution policy.
- **Git:** this project is not currently a git repository. **Do not run commit steps until Darwin explicitly approves `git init`.** If he declines, replace each commit step with a checkpoint verification and leave the working tree intact.

## Review Focus

These are the failure modes most likely to bite a visitor and are not fully covered by a single component's happy-path test. Each has an owning test below.

1. **360px mobile overflow** — long words, fixed-width grids, and large type must not create horizontal scrolling. Owned by Task 11's viewport test.
2. **Privacy leaks in images** — internal store URLs, `localhost` paths, bookmarks, and system names must never appear in shipped assets. Owned by Task 6's content test and asset check, plus Task 11's timekeeping-image request.
3. **Fake or placeholder content** — testimonials, `#` links, invented metrics, and the alert-only contact form must be gone. Owned by Task 1's data test and Task 9's App test.
4. **Keyboard and reduced-motion behavior** — mobile menu must close on Escape and restore focus; reveal animations must disappear under `prefers-reduced-motion`. Owned by Task 4's header test and Task 9's reveal test.
5. **Broken asset paths** — resume, portrait, timekeeping image, favicon, and fonts must resolve after a production build. Owned by Task 11's HTTP checks.

---

### Task 1: Test harness and content model

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/test/setup.js`
- Create: `src/data/portfolio.spec.js`
- Modify: `src/data/portfolio.js` (add `portfolio`; keep `portfolioData` until Task 9)

**Interfaces:**
- Produces: `import { portfolio } from '@/data/portfolio'`
- `portfolio.profile`: `{ name, role, location, timezone, email, phone, availability, headline, intro, portraitAlt, resumeUrl, links }`
- `portfolio.metrics`: `Array<{ value: string, label: string, detail: string }>`, exactly 3
- `portfolio.caseStudies`: `Array<{ number, slug, title, outcome, context, constraint, built, result, role, stack: string[], scope, visual, link: null }>`, exactly 3
- `portfolio.additionalWork`: `Array<{ title, description, stack: string[] }>`, exactly 2
- `portfolio.about`: `{ bio: string[], howIWork: Array<{ number, title, description }>, toolbox: Array<{ group, items: string[] }>, currently: Array<{ label, value }> }`
- `portfolio.experience`: `Array<{ role, company, period, summary, highlights: string[] }>`, exactly 2
- `portfolio.education`: `{ degree, school, period }`
- `portfolio.certifications`: `Array<{ name }>`, exactly 5
- `portfolio.contact`: `{ headline, email, location, timezone }`

- [ ] **Step 1: Install the test dependencies**

Run:

```powershell
npm.cmd install -D vitest@^2.1.9 @vue/test-utils@^2.4.6 jsdom@^25.0.1
```

Expected: install completes and `package.json` lists the three dev dependencies.

- [ ] **Step 2: Add test scripts and configuration**

Add to `package.json`:

```json
"test": "vitest",
"test:run": "vitest run"
```

Create `vitest.config.js`:

```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js'
  }
}))
```

Create `src/test/setup.js`:

```js
import { afterEach, vi } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'

enableAutoUnmount(afterEach)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver
```

- [ ] **Step 3: Write the failing content-model test**

Create `src/data/portfolio.spec.js` with the assertions below. It should fail because `portfolio` does not exist yet.

```js
import { describe, it, expect } from 'vitest'
import { portfolio } from './portfolio'

describe('portfolio content model', () => {
  it('has the approved profile and links', () => {
    expect(portfolio.profile.name).toBe('Darwin M. Lubugan')
    expect(portfolio.profile.role).toBe('Software Engineer · Automation')
    expect(portfolio.profile.email).toBe('lubugandarwin@gmail.com')
    expect(portfolio.profile.resumeUrl).toBe('/Lubugan_Darwin_Resume.pdf')
    expect(portfolio.profile.links.map((link) => link.label)).toEqual([
      'GitHub', 'LinkedIn', 'Email'
    ])
  })

  it('uses three sourced proof points and marks estimates', () => {
    expect(portfolio.metrics).toHaveLength(3)
    expect(portfolio.metrics[0].value).toBe('≈70%')
    expect(portfolio.metrics.map((metric) => metric.value)).toContain('Weeks → < 1 hour')
    expect(portfolio.metrics.map((metric) => metric.value)).toContain('Since 2023')
  })

  it('has exactly three complete case studies with safe visuals', () => {
    expect(portfolio.caseStudies).toHaveLength(3)
    const [shopify, timekeeping, ocr] = portfolio.caseStudies

    expect(shopify.visual).toEqual({
      type: 'pipeline',
      steps: ['Catalog data', 'Dedupe + align', 'Barcodes + Shopify']
    })
    expect(timekeeping.visual).toEqual(expect.objectContaining({
      type: 'image',
      src: '/assets/projects/timekeeping-redacted.jpg'
    }))
    expect(ocr.visual).toEqual({
      type: 'pipeline',
      steps: ['Capture ID', 'OCR extract', 'Prefill workflow']
    })

    for (const study of portfolio.caseStudies) {
      expect(study.title).toBeTruthy()
      expect(study.outcome).toBeTruthy()
      expect(study.context).toBeTruthy()
      expect(study.constraint).toBeTruthy()
      expect(study.built).toBeTruthy()
      expect(study.result).toBeTruthy()
      expect(study.link).toBeNull()
    }
  })

  it('has two additional-work entries and no fake content', () => {
    expect(portfolio.additionalWork).toHaveLength(2)
    expect(portfolio).not.toHaveProperty('testimonials')
    expect(JSON.stringify(portfolio)).not.toContain('"#"')
    expect(JSON.stringify(portfolio)).not.toContain('proficiency')
  })

  it('keeps experience, education, certifications, and toolbox content', () => {
    expect(portfolio.experience).toHaveLength(2)
    expect(portfolio.experience[0].period).toContain('Nov 2025')
    expect(portfolio.education).toEqual({
      degree: 'BSIT, Cum Laude',
      school: 'STI College Balayan',
      period: '2019 — 2023'
    })
    expect(portfolio.certifications).toHaveLength(5)
    expect(portfolio.about.toolbox.map((group) => group.group)).toEqual([
      'Build', 'Automate', 'Data', 'Operate'
    ])
  })
})
```

- [ ] **Step 4: Run the test and verify it fails**

Run: `npm.cmd run test:run -- src/data/portfolio.spec.js`

Expected: FAIL because `portfolio` is not exported.

- [ ] **Step 5: Add the new `portfolio` export**

Append `portfolio` to `src/data/portfolio.js` and leave the existing `portfolioData` export in place. The old sections still import `portfolioData` until Task 9, so removing it now would break the interim build. Populate the new export from spec sections 7.2–7.7. Key values that must match tests:

```js
export const portfolio = {
  profile: {
    name: 'Darwin M. Lubugan',
    role: 'Software Engineer · Automation',
    location: 'Batangas, Philippines',
    timezone: 'GMT+8',
    email: 'lubugandarwin@gmail.com',
    phone: '+639280810360',
    availability: 'Open to software engineering and automation roles · Remote-friendly',
    headline: 'I turn repetitive work into reliable systems.',
    intro: 'I build internal tools and automations for business operations — C#, .NET, Vue, PowerShell, Python, SQL. Currently keeping business systems running at Advani Group of Companies.',
    portraitAlt: 'Darwin M. Lubugan',
    resumeUrl: '/Lubugan_Darwin_Resume.pdf',
    links: [
      { label: 'GitHub', url: 'https://github.com/Darwinie' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/lubugandarwin05' },
      { label: 'Email', url: 'mailto:lubugandarwin@gmail.com' }
    ]
  },
  metrics: [
    { value: '≈70%', label: 'Less repetitive work', detail: 'Approximate reduction across automation work' },
    { value: 'Weeks → < 1 hour', label: 'Catalog cleanup', detail: 'Manual reconciliation replaced by scripts' },
    { value: 'Since 2023', label: 'Building internal tools', detail: 'Software engineering and automation roles' }
  ],
  caseStudies: [
    {
      number: '01',
      slug: 'shopify-catalog-automation',
      title: 'Shopify catalog automation',
      outcome: 'A multi-week catalog cleanup, reduced to under an hour.',
      context: 'Product data across stores was inconsistent, duplicated, and slow to reconcile. Barcode generation was manual.',
      constraint: 'No third-party licensing. The process had to fit the existing store operation without adding a new platform.',
      built: 'A set of PowerShell and Python scripts that align product data, remove duplicates, and generate barcodes through the Shopify API.',
      result: 'Repeatable catalog cleanup in under an hour instead of weeks of manual work.',
      role: 'Automation engineer',
      stack: ['PowerShell', 'Python', 'Shopify API'],
      scope: 'Product data, deduplication, barcode generation',
      visual: { type: 'pipeline', steps: ['Catalog data', 'Dedupe + align', 'Barcodes + Shopify'] },
      link: null
    },
    {
      number: '02',
      slug: 'timekeeping-system',
      title: 'Timekeeping, rebuilt in-house',
      outcome: 'Replaced a licensed timesheet system with a custom PHP/MySQL app.',
      context: 'Timesheets were manual, and the existing third-party system carried recurring licensing fees.',
      constraint: 'The replacement had to cover daily timekeeping, records, and reporting without disrupting payroll operations.',
      built: 'An internal timekeeping system with a PHP/MySQL backend and a Vue.js front end.',
      result: 'Eliminated licensing fees and manual timesheet handling.',
      role: 'Full-stack developer',
      stack: ['PHP', 'MySQL', 'Vue.js'],
      scope: 'Timekeeping, records, reporting',
      visual: {
        type: 'image',
        src: '/assets/projects/timekeeping-redacted.jpg',
        alt: 'Timekeeping dashboard showing attendance and payroll summaries'
      },
      link: null
    },
    {
      number: '03',
      slug: 'ocr-customer-identification',
      title: 'OCR at the counter',
      outcome: 'Customer identification ≈70% faster, with no manual typing.',
      context: 'Manual customer identification created queues and typing errors at the counter.',
      constraint: 'The integration had to prefill the existing workflow without replacing the systems staff already used.',
      built: 'An Azure OCR integration with a Vue.js and C# workflow that reads customer information and prefills the record.',
      result: '≈70% faster processing and less manual data entry.',
      role: 'Software engineer',
      stack: ['Azure OCR', 'Vue.js', 'C#'],
      scope: 'Customer identification, data entry',
      visual: { type: 'pipeline', steps: ['Capture ID', 'OCR extract', 'Prefill workflow'] },
      link: null
    }
  ],
  additionalWork: [
    {
      title: 'Shopify image resizer with API tester',
      description: 'Tool for resizing Shopify product images and validating store credentials.',
      stack: ['Python', 'Shopify API', 'Pillow']
    },
    {
      title: 'Municipal Health Office information system',
      description: 'Capstone project that digitized paper-based health records.',
      stack: ['C#', '.NET', 'SQL Server']
    }
  ],
  about: {
    bio: [
      "I'm Darwin, a software engineer based in Batangas, Philippines. I build internal tools and automations for business operations — the kind of work that removes a manual step, a spreadsheet, or a licensing fee.",
      "I've worked across the Microsoft stack, PHP/MySQL systems, and Shopify automation. I'm currently supporting business systems at Advani Group of Companies."
    ],
    howIWork: [
      { number: '01', title: 'Observe the process', description: 'Watch how the work actually gets done, including the workarounds.' },
      { number: '02', title: 'Find the constraint', description: 'Identify the step that creates the delay, duplicate, or manual cost.' },
      { number: '03', title: 'Build the smallest reliable system', description: 'Ship the smallest tool that removes the constraint and can be maintained.' },
      { number: '04', title: 'Measure and document it', description: 'Confirm the outcome and leave the team with a process they can run.' }
    ],
    toolbox: [
      { group: 'Build', items: ['C#', '.NET', 'ASP.NET Core', 'Vue.js', 'PHP'] },
      { group: 'Automate', items: ['PowerShell', 'Python', 'Shopify API', 'Azure OCR'] },
      { group: 'Data', items: ['SQL Server', 'T-SQL', 'MySQL', 'MongoDB'] },
      { group: 'Operate', items: ['Dynamics 365 Business Central', 'SAP Business One', 'Network/system support'] }
    ],
    currently: [
      { label: 'Role', value: 'Junior Network and System Administrator' },
      { label: 'Company', value: 'Advani Group of Companies' },
      { label: 'Focus', value: 'Automation and internal systems' },
      { label: 'Education', value: 'BSIT, Cum Laude — STI College Balayan' }
    ]
  },
  experience: [
    {
      role: 'Junior Network and System Administrator',
      company: 'Advani Group of Companies',
      period: 'Nov 2025 — Present',
      summary: 'Support business systems and automate recurring operations.',
      highlights: [
        'Automated Shopify catalog cleanup and barcode generation, reducing a multi-week process to under an hour.',
        'Built an in-house PHP/MySQL timekeeping system that replaced a licensed third-party tool.',
        'Used Whisper AI and Python to convert training transcripts into structured documentation.'
      ]
    },
    {
      role: 'Software Engineer',
      company: 'Elyon Global Technologies Asia Inc.',
      period: 'Oct 2023 — Oct 2025',
      summary: 'Built automation features and responsive web solutions for internal and client projects.',
      highlights: [
        'Integrated OCR for customer identification, reducing queue times and manual data entry.',
        'Developed responsive landing pages and internal tools with Vue.js.',
        'Created reusable components for consistent UI and faster delivery.'
      ]
    }
  ],
  education: {
    degree: 'BSIT, Cum Laude',
    school: 'STI College Balayan',
    period: '2019 — 2023'
  },
  certifications: [
    { name: 'SAP Business One (Basic — Financials and Logistics)' },
    { name: 'SAP Business One (Advanced — Implementation and Support)' },
    { name: 'Tech Talks: AI and Agents' },
    { name: 'Lean Six Sigma Yellow Belt' },
    { name: 'Lean Six Sigma White Belt' }
  ],
  contact: {
    headline: 'Have a process that needs to disappear?',
    email: 'lubugandarwin@gmail.com',
    location: 'Batangas, Philippines',
    timezone: 'GMT+8'
  }
}
```

- [ ] **Step 6: Run the test and verify it passes**

Run: `npm.cmd run test:run -- src/data/portfolio.spec.js`

Expected: 5 tests pass.

- [ ] **Step 7: Commit (only if git is approved)**

```powershell
git add package.json package-lock.json vitest.config.js src/test/setup.js src/data/portfolio.js src/data/portfolio.spec.js
git commit -m "test: add portfolio content model"
```

---

### Task 2: Design tokens, fonts, and global styles

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/layout.css`
- Create: `src/styles/components.css`
- Create: `src/test/tokens.spec.js`
- Modify: `src/main.js` (font imports only; do not switch the old stylesheet yet)

**Interfaces:**
- Produces: CSS custom properties and global classes used by all later components: `.site-shell`, `.container`, `.section`, `.section-heading`, `.hairline`, `.button`, `.button--ink`, `.arrow-link`, `.metric-strip`, `.tag`, `.skip-link`.
- Font families: `var(--font-display)`, `var(--font-body)`, `var(--font-mono)`.

- [ ] **Step 1: Install the fonts and icons**

Run:

```powershell
npm.cmd install @fontsource/newsreader@^5.3.0 @fontsource/ibm-plex-sans@^5.3.0 @fontsource/ibm-plex-mono@^5.3.0 lucide-vue-next@^0.468.0
```

- [ ] **Step 2: Write the failing token test**

Create `src/test/tokens.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const tokens = readFileSync(new URL('../styles/tokens.css', import.meta.url), 'utf8')

describe('design tokens', () => {
  it('defines the approved editorial palette', () => {
    expect(tokens).toContain('--paper: #F4F0E7;')
    expect(tokens).toContain('--paper-deep: #EAE4D7;')
    expect(tokens).toContain('--ink: #171512;')
    expect(tokens).toContain('--muted: #6D675C;')
    expect(tokens).toContain('--line: #D5CDBE;')
    expect(tokens).toContain('--accent: #B4431D;')
  })

  it('defines the three font families', () => {
    expect(tokens).toContain('--font-display:')
    expect(tokens).toContain("'Newsreader'")
    expect(tokens).toContain('--font-body:')
    expect(tokens).toContain("'IBM Plex Sans'")
    expect(tokens).toContain('--font-mono:')
    expect(tokens).toContain("'IBM Plex Mono'")
  })

  it('does not define a gradient token', () => {
    expect(tokens).not.toContain('gradient')
  })
})
```

- [ ] **Step 3: Run the test and verify it fails**

Run: `npm.cmd run test:run -- src/test/tokens.spec.js`

Expected: FAIL because `src/styles/tokens.css` does not exist.

- [ ] **Step 4: Create the token file**

Create `src/styles/tokens.css` with the exact palette from the spec, plus:

```css
:root {
  --paper: #F4F0E7;
  --paper-deep: #EAE4D7;
  --ink: #171512;
  --ink-soft: #3A3630;
  --muted: #6D675C;
  --line: #D5CDBE;
  --accent: #B4431D;
  --accent-soft: #F0DED2;
  --code-bg: #1C1A17;
  --code-text: #EDE7DB;

  --font-display: 'Newsreader', Georgia, 'Times New Roman', serif;
  --font-body: 'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Consolas, monospace;

  --container: 1240px;
  --gutter: 24px;
  --section-space: clamp(4.5rem, 9vw, 8rem);
  --radius: 2px;
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-slow: 600ms;
}
```

- [ ] **Step 5: Create base, layout, and component styles**

Create the three files with these responsibilities. Do not wire them into `main.css` yet.

`src/styles/base.css`:
- Reset margins/padding, `box-sizing: border-box`.
- `html { scroll-behavior: smooth; }`, disabled under reduced motion.
- `body`: paper background, ink text, `font-family: var(--font-body)`, `line-height: 1.7`.
- Headings inherit colors; links inherit color; images block and max-width 100%.
- `section[id] { scroll-margin-top: 6rem; }` so sticky-header anchors clear the header.
- `::selection` with accent-soft.
- `:focus-visible` 2px accent outline with 3px offset.
- `.skip-link` visually hidden until focused; fixed top-left, ink background, paper text.
- `@media (prefers-reduced-motion: reduce)` removes smooth scroll and animation/transition durations.
- `[data-reveal]` starts at opacity 0 / translateY(16px); `[data-reveal].is-visible` resolves. Under reduced motion, `[data-reveal]` is always visible.

`src/styles/layout.css`:
- `.site-shell { overflow-x: clip; }`
- `.container { width: min(100% - (var(--gutter) * 2), var(--container)); margin-inline: auto; }`
- `.section { padding-block: var(--section-space); }`
- `.section--deep { background: var(--paper-deep); }`
- `.hairline { border: 0; border-top: 1px solid var(--line); }`
- `.section-heading` and its eyebrow/title rules using display/mono type.
- `.case-study__grid` 3-column meta rail + 8-column narrative on desktop; stack at ≤1024px.
- `.about__grid` 5/7 split; `.experience__item` two-column date/content; stack at ≤768px.
- `.metric-strip` 3-column rule-separated strip; stack at ≤768px.

`src/styles/components.css`:
- `.button` base: inline-flex, 44px min-height, padding, 2px radius, font 600.
- `.button--ink`: ink background, paper text; hover accent background.
- `.button--ghost`: transparent, 1px ink border.
- `.arrow-link`: inline-flex, underline offset, accent arrow; hover arrow translate.
- `.metric-strip` label/value/description styles using mono and display type.
- `.tag-list` inline list separated by `·` in mono, no pills.
- `.pipeline` grid of 3 steps with numbered mono labels and a connector rule.
- `.case-study` spacing, meta rail, narrative headings, image frame, link note.
- `.toolbox`, `.how-i-work`, `.experience`, `.certifications`, `.contact` styles per spec.
- `.site-header`, `.site-footer`, `.mobile-menu` styles.
- No box-shadow, no gradient, no border-radius above 2px except the portrait frame if desired (keep 2px).

- [ ] **Step 6: Add font imports to `src/main.js`**

Add only font imports now; leave the existing stylesheet imports untouched until Task 9.

```js
import '@fontsource/newsreader/400.css'
import '@fontsource/newsreader/500.css'
import '@fontsource/newsreader/600.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
```

- [ ] **Step 7: Run the token test and build**

Run:

```powershell
npm.cmd run test:run -- src/test/tokens.spec.js
npm.cmd run build
```

Expected: 3 tests pass; build exits 0.

- [ ] **Step 8: Commit (only if git is approved)**

```powershell
git add package.json package-lock.json src/main.js src/styles src/test/tokens.spec.js
git commit -m "feat: add editorial design tokens and typography"
```

---

### Task 3: Shared UI primitives

**Files:**
- Create: `src/components/ui/SectionHeading.vue`
- Create: `src/components/ui/ArrowLink.vue`
- Create: `src/components/ui/MetricStrip.vue`
- Create: `src/components/ui/__tests__/SectionHeading.spec.js`
- Create: `src/components/ui/__tests__/ArrowLink.spec.js`
- Create: `src/components/ui/__tests__/MetricStrip.spec.js`

**Interfaces:**
- `SectionHeading` props: `eyebrow: string` required, `title: string` required, `id?: string`. Renders `<p class="section-heading__eyebrow">`, `<h2 class="section-heading__title">`.
- `ArrowLink` props: `href: string` required, `label: string` required, `external?: boolean` default false. Renders an `<a class="arrow-link">` with the label and a Lucide `ArrowUpRight` icon. External links get `target="_blank"` and `rel="noreferrer"`.
- `MetricStrip` props: `metrics: Array<{ value, label, detail }>` required. Renders a `<dl class="metric-strip">` with one `<div>` per metric: `<dt>` value, `<dd>` label and detail.

- [ ] **Step 1: Write the failing primitive tests**

Create the three test files. Use `mount` from `@vue/test-utils`.

`SectionHeading.spec.js`:

```js
import { mount } from '@vue/test-utils'
import SectionHeading from '../SectionHeading.vue'

it('renders the eyebrow, title, and optional id', () => {
  const wrapper = mount(SectionHeading, {
    props: { eyebrow: 'Selected work', title: 'Work', id: 'work-title' }
  })
  expect(wrapper.get('.section-heading__eyebrow').text()).toBe('Selected work')
  expect(wrapper.get('h2').text()).toBe('Work')
  expect(wrapper.get('h2').attributes('id')).toBe('work-title')
})
```

`ArrowLink.spec.js`:

```js
import { mount } from '@vue/test-utils'
import ArrowLink from '../ArrowLink.vue'

it('renders an internal link with an arrow', () => {
  const wrapper = mount(ArrowLink, { props: { href: '#work', label: 'See selected work' } })
  expect(wrapper.get('a').attributes('href')).toBe('#work')
  expect(wrapper.text()).toContain('See selected work')
  expect(wrapper.find('svg').exists()).toBe(true)
})

it('opens external links in a new tab', () => {
  const wrapper = mount(ArrowLink, {
    props: { href: 'https://github.com/Darwinie', label: 'GitHub', external: true }
  })
  expect(wrapper.get('a').attributes('target')).toBe('_blank')
  expect(wrapper.get('a').attributes('rel')).toBe('noreferrer')
})
```

`MetricStrip.spec.js`:

```js
import { mount } from '@vue/test-utils'
import MetricStrip from '../MetricStrip.vue'

it('renders every metric value, label, and detail', () => {
  const wrapper = mount(MetricStrip, {
    props: {
      metrics: [
        { value: '≈70%', label: 'Less repetitive work', detail: 'Approximate reduction' },
        { value: 'Since 2023', label: 'Building internal tools', detail: 'Software roles' }
      ]
    }
  })
  expect(wrapper.findAll('dt')).toHaveLength(2)
  expect(wrapper.text()).toContain('≈70%')
  expect(wrapper.text()).toContain('Less repetitive work')
  expect(wrapper.text()).toContain('Approximate reduction')
})
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm.cmd run test:run -- src/components/ui/__tests__`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the three components**

Use Vue `<script setup>` with `defineProps`. Use `ArrowUpRight` from `lucide-vue-next` in `ArrowLink.vue`. Use semantic markup exactly as described in the Interfaces block. Do not add scoped styles; the global stylesheet owns presentation.

- [ ] **Step 4: Run the tests and verify they pass**

Run: `npm.cmd run test:run -- src/components/ui/__tests__`

Expected: 4 tests pass.

- [ ] **Step 5: Commit (only if git is approved)**

```powershell
git add src/components/ui
git commit -m "feat: add shared editorial UI primitives"
```

---

### Task 4: Header, footer, and navigation behavior

**Files:**
- Create: `src/components/layout/SiteHeader.vue`
- Create: `src/components/layout/SiteFooter.vue`
- Modify: `src/composables/useMobileMenu.js`
- Create: `src/composables/useScrollSpy.js`
- Create: `src/components/layout/__tests__/SiteHeader.spec.js`
- Create: `src/components/layout/__tests__/SiteFooter.spec.js`

**Interfaces:**
- `SiteHeader` renders `<header class="site-header">`, a wordmark link to `#top`, desktop nav links (`Work`, `About`, `Experience`, `Contact`), a resume link to `portfolio.profile.resumeUrl`, and a mobile menu button.
- Mobile button labels: `Open menu` when closed, `Close menu` when open. It has `aria-expanded="false|true"` and `aria-controls="mobile-menu"`.
- Mobile panel `#mobile-menu` contains the same links plus the resume link and email link.
- The mobile panel closes on Escape, outside click, or link activation. While open, Tab focus stays inside the panel; focus returns to the menu button on close.
- `useMobileMenu()` returns `{ isOpen, toggle, close }`. It closes on Escape, locks body scroll while open, and cleans up on unmount.
- `useScrollSpy(ids: string[])` returns `{ activeSection }` and marks the active nav link `aria-current="true"`. It must no-op when `IntersectionObserver` is unavailable.
- `SiteFooter` renders wordmark, location/timezone, GitHub/LinkedIn/Email/Resume links, and "Built with Vue 3 + Vite".

- [ ] **Step 1: Write the failing header and footer tests**

`SiteHeader.spec.js`:

```js
import { mount } from '@vue/test-utils'
import SiteHeader from '../SiteHeader.vue'

it('renders the primary navigation and resume link', () => {
  const wrapper = mount(SiteHeader)
  expect(wrapper.get('nav').text()).toContain('Work')
  expect(wrapper.get('nav').text()).toContain('About')
  expect(wrapper.get('nav').text()).toContain('Experience')
  expect(wrapper.get('nav').text()).toContain('Contact')
  expect(wrapper.get('a[href="/Lubugan_Darwin_Resume.pdf"]').exists()).toBe(true)
})

it('opens the mobile menu and closes it with Escape', async () => {
  const wrapper = mount(SiteHeader, { attachTo: document.body })
  const button = wrapper.get('button[aria-label="Open menu"]')

  expect(button.attributes('aria-expanded')).toBe('false')
  await button.trigger('click')
  expect(button.attributes('aria-expanded')).toBe('true')
  expect(wrapper.get('#mobile-menu').isVisible()).toBe(true)

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await wrapper.vm.$nextTick()
  expect(button.attributes('aria-expanded')).toBe('false')
  expect(wrapper.find('#mobile-menu').exists()).toBe(false)
})

it('closes the mobile menu on outside click', async () => {
  const wrapper = mount(SiteHeader, { attachTo: document.body })
  await wrapper.get('button[aria-label="Open menu"]').trigger('click')

  document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await wrapper.vm.$nextTick()
  expect(wrapper.get('button[aria-label="Open menu"]').attributes('aria-expanded')).toBe('false')
})
```

`SiteFooter.spec.js`:

```js
import { mount } from '@vue/test-utils'
import SiteFooter from '../SiteFooter.vue'

it('renders footer links and location', () => {
  const wrapper = mount(SiteFooter)
  expect(wrapper.get('a[href="https://github.com/Darwinie"]').text()).toContain('GitHub')
  expect(wrapper.get('a[href="https://www.linkedin.com/in/lubugandarwin05"]').text()).toContain('LinkedIn')
  expect(wrapper.get('a[href="mailto:lubugandarwin@gmail.com"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('Batangas, Philippines')
  expect(wrapper.text()).toContain('GMT+8')
})
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm.cmd run test:run -- src/components/layout/__tests__`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement `useMobileMenu` and `useScrollSpy`**

`useMobileMenu` requirements:
- `isOpen` ref, `toggle`, `close`.
- `watch(isOpen)` sets `document.body.style.overflow = 'hidden'` when open, restores it when closed.
- Document `keydown` listener closes on Escape.
- `onUnmounted` removes the listener and restores body overflow.
- Guard `typeof document === 'undefined'` for tests.

`useScrollSpy` requirements:
- Accept section IDs as a string array.
- If `typeof IntersectionObserver === 'undefined'`, leave `activeSection` as the first ID.
- Observe each element by ID; set `activeSection` to the entry with the largest `intersectionRatio` among intersecting entries.
- Disconnect on unmount.
- The mock in `src/test/setup.js` is a no-op, so tests still render.

- [ ] **Step 4: Implement `SiteHeader.vue`**

Use `Menu` and `X` from `lucide-vue-next`; use `Download` for the resume link. Use `portfolio` data and `SectionHeading` is not needed here. Use `useMobileMenu` and `useScrollSpy(['work', 'about', 'experience', 'contact'])`. Use `aria-current="true"` for the active link. Move focus to the first mobile link when opened and return focus to the menu button when closed (`nextTick` + template refs). Close the panel when the user clicks outside `.site-header` or activates a mobile link. While open, intercept Tab/Shift+Tab to keep focus within the panel's focusable elements.

- [ ] **Step 5: Implement `SiteFooter.vue`**

Use `portfolio.profile` and `portfolio.contact`. No icons required; text links with `ArrowLink` are acceptable. Use a computed year if a copyright line is included.

- [ ] **Step 6: Run the tests and verify they pass**

Run: `npm.cmd run test:run -- src/components/layout/__tests__`

Expected: 4 tests pass.

- [ ] **Step 7: Commit (only if git is approved)**

```powershell
git add src/components/layout src/composables/useMobileMenu.js src/composables/useScrollSpy.js
git commit -m "feat: add site header, footer, and navigation behavior"
```

---

### Task 5: Hero section

**Files:**
- Modify: `src/components/sections/HeroSection.vue`
- Create: `src/components/sections/__tests__/HeroSection.spec.js`

**Interfaces:**
- `HeroSection` imports `portfolio`, `MetricStrip`, and `ArrowLink`.
- Renders `#top` anchor, eyebrow, `<h1>` with `portfolio.profile.headline`, intro paragraph, availability line.
- Actions: `ArrowLink` with `href="#work"` and label `See selected work`; resume `<a>` styled as `.button .button--ink` with `download` and `href="/Lubugan_Darwin_Resume.pdf"`.
- Portrait: `<img>` with `src` from `@/assets/profile.png`, `alt="Darwin M. Lubugan"`, and a mono caption containing `Batangas, Philippines · GMT+8`.
- Metric strip with the three metrics.

- [ ] **Step 1: Write the failing hero test**

```js
import { mount } from '@vue/test-utils'
import HeroSection from '../HeroSection.vue'

it('renders the positioning, actions, portrait, and metrics', () => {
  const wrapper = mount(HeroSection)

  expect(wrapper.get('h1').text()).toContain('I turn repetitive work into reliable systems')
  expect(wrapper.text()).toContain('Software Engineer · Automation')
  expect(wrapper.text()).toContain('Open to software engineering and automation roles')
  expect(wrapper.get('a[href="#work"]').text()).toContain('See selected work')
  expect(wrapper.get('a[href="/Lubugan_Darwin_Resume.pdf"]').text()).toContain('Download CV')
  expect(wrapper.get('img').attributes('alt')).toBe('Darwin M. Lubugan')
  expect(wrapper.text()).toContain('Batangas, Philippines · GMT+8')
  expect(wrapper.text()).toContain('≈70%')
  expect(wrapper.text()).toContain('Weeks → < 1 hour')
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm.cmd run test:run -- src/components/sections/__tests__/HeroSection.spec.js`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement `HeroSection.vue`**

Use `<section id="top" class="hero section">`. Compose the left column and portrait column using the layout classes from Task 2. Import the portrait with `import portrait from '@/assets/profile.png'` for now; Task 10 replaces this with the `vite-imagetools` picture import. Use `MetricStrip` below the two columns.

- [ ] **Step 4: Run the test and verify it passes**

Run: `npm.cmd run test:run -- src/components/sections/__tests__/HeroSection.spec.js`

Expected: PASS.

- [ ] **Step 5: Commit (only if git is approved)**

```powershell
git add src/components/sections/HeroSection.vue src/components/sections/__tests__/HeroSection.spec.js
git commit -m "feat: add editorial hero section"
```

---

### Task 6: Work section, case studies, diagrams, and redacted image

**Files:**
- Create: `src/components/ui/PipelineDiagram.vue`
- Create: `src/components/ui/CaseStudy.vue`
- Create: `src/components/sections/WorkSection.vue`
- Create: `src/components/ui/__tests__/PipelineDiagram.spec.js`
- Create: `src/components/ui/__tests__/CaseStudy.spec.js`
- Create: `src/components/sections/__tests__/WorkSection.spec.js`
- Create: `public/assets/projects/timekeeping-redacted.jpg` (generated crop)
- Move: unsafe project screenshots to `private-assets/project-screenshots/`
- Modify: `.gitignore` (add `private-assets/`)

**Interfaces:**
- `PipelineDiagram` props: `steps: string[]` required. Renders `<ol class="pipeline">` with one `<li>` per step, each with a zero-padded mono number and the step label.
- `CaseStudy` props: `study: object` required. Renders `<article :id="study.slug" class="case-study">` with number, title, outcome, meta rail (Role, Stack, Scope), narrative headings `Context`, `Constraint`, `What I built`, `Result`, the visual, and a link state.
- If `study.link` is null, render `<p class="case-study__note">Internal project · code available on request</p>`. Do not render an `<a href="#">`.
- `WorkSection` renders `<section id="work" class="section">`, `SectionHeading` with eyebrow `Selected work / 01–03` and title `Selected work`, three `CaseStudy` components, and an "Additional work" list with two entries.

- [ ] **Step 1: Create the redacted timekeeping image**

Run this PowerShell from the project root:

```powershell
New-Item -ItemType Directory -Force -Path "private-assets\project-screenshots" | Out-Null
Add-Type -AssemblyName System.Drawing
$source = [System.Drawing.Image]::FromFile("C:\Project\Portfolio-main\public\assets\projects\timekeeping-system.png")
$crop = New-Object System.Drawing.Bitmap(1600, 820)
$graphics = [System.Drawing.Graphics]::FromImage($crop)
$graphics.DrawImage($source, (New-Object System.Drawing.Rectangle(0,0,1600,820)), (New-Object System.Drawing.Rectangle(280,80,1600,820)), [System.Drawing.GraphicsUnit]::Pixel)
$graphics.Dispose()
$source.Dispose()
$crop.Save("C:\Project\Portfolio-main\public\assets\projects\timekeeping-redacted.jpg", [System.Drawing.Imaging.ImageFormat]::Jpeg)
$crop.Dispose()
Move-Item -LiteralPath "public\assets\projects\shopify-automation.png","public\assets\projects\shopify-image-resizer.png","public\assets\projects\ocr-integration.png","public\assets\projects\timekeeping-system.png" -Destination "private-assets\project-screenshots\"
Remove-Item -LiteralPath "public\assets\projects\generate-placeholders.html" -ErrorAction SilentlyContinue
Get-ChildItem -LiteralPath "public\assets\projects" | Select-Object Name, Length
```

Expected: `timekeeping-redacted.jpg` exists and is under 200KB. `public/assets/projects` contains no PNGs. The unsafe originals are in `private-assets/project-screenshots/`. Open the crop with the read tool and confirm the internal system name, URLs, and bookmarks are not visible.

- [ ] **Step 2: Add `private-assets/` to `.gitignore`**

Add the line `private-assets/` so unredacted screenshots are not committed if git is initialized.

- [ ] **Step 3: Write the failing diagram, case-study, and work tests**

`PipelineDiagram.spec.js`:

```js
import { mount } from '@vue/test-utils'
import PipelineDiagram from '../PipelineDiagram.vue'

it('renders numbered steps in order', () => {
  const wrapper = mount(PipelineDiagram, {
    props: { steps: ['Catalog data', 'Dedupe + align', 'Barcodes + Shopify'] }
  })
  const items = wrapper.findAll('li')
  expect(items).toHaveLength(3)
  expect(items[0].text()).toContain('01')
  expect(items[0].text()).toContain('Catalog data')
  expect(items[2].text()).toContain('Barcodes + Shopify')
})
```

`CaseStudy.spec.js`:

```js
import { mount } from '@vue/test-utils'
import CaseStudy from '../CaseStudy.vue'

const study = {
  number: '01',
  slug: 'shopify-catalog-automation',
  title: 'Shopify catalog automation',
  outcome: 'A multi-week catalog cleanup, reduced to under an hour.',
  context: 'Context copy.',
  constraint: 'Constraint copy.',
  built: 'Built copy.',
  result: 'Result copy.',
  role: 'Automation engineer',
  stack: ['PowerShell', 'Python', 'Shopify API'],
  scope: 'Product data',
  visual: { type: 'pipeline', steps: ['Catalog data', 'Dedupe + align', 'Barcodes + Shopify'] },
  link: null
}

it('renders the narrative, meta, diagram, and internal-project note', () => {
  const wrapper = mount(CaseStudy, { props: { study } })
  expect(wrapper.get('article').attributes('id')).toBe('shopify-catalog-automation')
  expect(wrapper.text()).toContain('Shopify catalog automation')
  expect(wrapper.text()).toContain('Context copy.')
  expect(wrapper.text()).toContain('Constraint copy.')
  expect(wrapper.text()).toContain('Built copy.')
  expect(wrapper.text()).toContain('Result copy.')
  expect(wrapper.text()).toContain('Automation engineer')
  expect(wrapper.text()).toContain('PowerShell')
  expect(wrapper.find('.pipeline').exists()).toBe(true)
  expect(wrapper.text()).toContain('Internal project · code available on request')
  expect(wrapper.find('a[href="#"]').exists()).toBe(false)
})
```

`WorkSection.spec.js`:

```js
import { mount } from '@vue/test-utils'
import WorkSection from '../WorkSection.vue'

it('renders three case studies, two diagrams, and additional work', () => {
  const wrapper = mount(WorkSection)
  expect(wrapper.findAll('article.case-study')).toHaveLength(3)
  expect(wrapper.text()).toContain('Shopify catalog automation')
  expect(wrapper.text()).toContain('Timekeeping, rebuilt in-house')
  expect(wrapper.text()).toContain('OCR at the counter')
  expect(wrapper.findAll('.pipeline')).toHaveLength(2)
  expect(wrapper.get('img[src="/assets/projects/timekeeping-redacted.jpg"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('Additional work')
  expect(wrapper.text()).toContain('Shopify image resizer with API tester')
  expect(wrapper.findAll('a[href="#"]')).toHaveLength(0)
})
```

- [ ] **Step 4: Run the tests and verify they fail**

Run: `npm.cmd run test:run -- src/components/ui/__tests__/PipelineDiagram.spec.js src/components/ui/__tests__/CaseStudy.spec.js src/components/sections/__tests__/WorkSection.spec.js`

Expected: FAIL because the components do not exist.

- [ ] **Step 5: Implement the components**

Use semantic markup and the class names from Task 2. `CaseStudy` uses `PipelineDiagram` for `visual.type === 'pipeline'` and an `<img loading="lazy" decoding="async">` for `visual.type === 'image'`. Use `ArrowLink` only if `study.link` exists. `WorkSection` renders the additional-work list as a `<ul>` with title, description, and stack text.

- [ ] **Step 6: Run the tests and verify they pass**

Run: `npm.cmd run test:run -- src/components/ui/__tests__ src/components/sections/__tests__/WorkSection.spec.js`

Expected: all tests pass.

- [ ] **Step 7: Verify no unsafe assets remain in `public`**

Run:

```powershell
Get-ChildItem -Path "public" -Recurse -File | Select-Object FullName
Test-Path -LiteralPath "public\assets\projects\shopify-automation.png"
Test-Path -LiteralPath "public\assets\projects\shopify-image-resizer.png"
Test-Path -LiteralPath "public\assets\projects\ocr-integration.png"
```

Expected: all three `Test-Path` results are `False`.

- [ ] **Step 8: Commit (only if git is approved)**

```powershell
git add .gitignore public/assets/projects src/components/ui src/components/sections/WorkSection.vue src/components/sections/__tests__/WorkSection.spec.js
git commit -m "feat: add case studies and redacted project visuals"
```

---

### Task 7: About, experience, and certifications

**Files:**
- Modify: `src/components/sections/AboutSection.vue`
- Modify: `src/components/sections/ExperienceSection.vue`
- Create: `src/components/sections/CertificationsSection.vue`
- Create: `src/components/sections/__tests__/AboutSection.spec.js`
- Create: `src/components/sections/__tests__/ExperienceSection.spec.js`
- Create: `src/components/sections/__tests__/CertificationsSection.spec.js`

**Interfaces:**
- `AboutSection` renders `#about`, `SectionHeading` with eyebrow `About` and title `About`, two bio paragraphs, a `Currently` list, four how-I-work items, and four toolbox groups. It does not render a second portrait.
- `ExperienceSection` renders `#experience`, `SectionHeading` with eyebrow `Experience` and title `Experience`, two experience entries with dates, roles, companies, summaries, and highlights, plus one education line with `portfolio.education`.
- `CertificationsSection` renders `#certifications`, `SectionHeading` with eyebrow `Certifications` and title `Certifications`, and five certification names. No issuer/date fields.

- [ ] **Step 1: Write the failing section tests**

`AboutSection.spec.js`:

```js
import { mount } from '@vue/test-utils'
import AboutSection from '../AboutSection.vue'

it('renders the bio, currently list, process, and toolbox', () => {
  const wrapper = mount(AboutSection)
  expect(wrapper.get('#about').exists()).toBe(true)
  expect(wrapper.text()).toContain('I build internal tools and automations')
  expect(wrapper.text()).toContain('Observe the process')
  expect(wrapper.text()).toContain('Measure and document it')
  expect(wrapper.text()).toContain('ASP.NET Core')
  expect(wrapper.text()).toContain('Dynamics 365 Business Central')
  expect(wrapper.text()).toContain('BSIT, Cum Laude')
  expect(wrapper.findAll('.toolbox__group')).toHaveLength(4)
  expect(wrapper.findAll('.how-i-work__item')).toHaveLength(4)
})
```

`ExperienceSection.spec.js`:

```js
import { mount } from '@vue/test-utils'
import ExperienceSection from '../ExperienceSection.vue'

it('renders both roles and the education line', () => {
  const wrapper = mount(ExperienceSection)
  expect(wrapper.get('#experience').exists()).toBe(true)
  expect(wrapper.text()).toContain('Junior Network and System Administrator')
  expect(wrapper.text()).toContain('Advani Group of Companies')
  expect(wrapper.text()).toContain('Software Engineer')
  expect(wrapper.text()).toContain('Elyon Global Technologies Asia Inc.')
  expect(wrapper.text()).toContain('BSIT, Cum Laude')
  expect(wrapper.text()).toContain('STI College Balayan')
  expect(wrapper.findAll('.experience__item')).toHaveLength(2)
  expect(wrapper.findAll('.experience__highlight').length).toBeGreaterThanOrEqual(6)
})
```

`CertificationsSection.spec.js`:

```js
import { mount } from '@vue/test-utils'
import CertificationsSection from '../CertificationsSection.vue'

it('renders exactly five certification names without invented metadata', () => {
  const wrapper = mount(CertificationsSection)
  expect(wrapper.get('#certifications').exists()).toBe(true)
  expect(wrapper.findAll('li')).toHaveLength(5)
  expect(wrapper.text()).toContain('SAP Business One (Basic — Financials and Logistics)')
  expect(wrapper.text()).toContain('Lean Six Sigma Yellow Belt')
  expect(wrapper.text()).not.toContain('2024')
})
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `npm.cmd run test:run -- src/components/sections/__tests__/AboutSection.spec.js src/components/sections/__tests__/ExperienceSection.spec.js src/components/sections/__tests__/CertificationsSection.spec.js`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the three sections**

Use `SectionHeading`, `portfolio.about`, `portfolio.experience`, `portfolio.education`, and `portfolio.certifications`. Keep the markup semantic: `<ul>` for lists, `<article>` or `<li>` for experience entries, `<time>` where a period is displayed. Do not add emoji or icons.

- [ ] **Step 4: Run the tests and verify they pass**

Run: `npm.cmd run test:run -- src/components/sections/__tests__/AboutSection.spec.js src/components/sections/__tests__/ExperienceSection.spec.js src/components/sections/__tests__/CertificationsSection.spec.js`

Expected: 3 tests pass.

- [ ] **Step 5: Commit (only if git is approved)**

```powershell
git add src/components/sections/AboutSection.vue src/components/sections/ExperienceSection.vue src/components/sections/CertificationsSection.vue src/components/sections/__tests__
git commit -m "feat: add about, experience, and certifications sections"
```

---

### Task 8: Contact section and clipboard behavior

**Files:**
- Create: `src/composables/useClipboard.js`
- Modify: `src/components/sections/ContactSection.vue`
- Create: `src/components/sections/__tests__/ContactSection.spec.js`

**Interfaces:**
- `useClipboard()` returns `{ copied: Ref<boolean>, copy(text: string): Promise<void> }`.
- `ContactSection` renders `#contact`, `SectionHeading` with eyebrow `Contact` and title `Contact`, the contact headline, a large `mailto:` link, a `Copy email` button, GitHub and LinkedIn text links, and `Batangas, Philippines · GMT+8`.
- The copy confirmation is announced in an element with `role="status"` and `aria-live="polite"`.
- No `<form>` element.

- [ ] **Step 1: Write the failing contact test**

```js
import { mount, flushPromises } from '@vue/test-utils'
import { vi } from 'vitest'
import ContactSection from '../ContactSection.vue'

it('renders real contact paths and copies the email', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText }
  })

  const wrapper = mount(ContactSection)
  expect(wrapper.get('#contact').exists()).toBe(true)
  expect(wrapper.get('a[href="mailto:lubugandarwin@gmail.com"]').exists()).toBe(true)
  expect(wrapper.get('a[href="https://github.com/Darwinie"]').exists()).toBe(true)
  expect(wrapper.get('a[href="https://www.linkedin.com/in/lubugandarwin05"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('Batangas, Philippines · GMT+8')
  expect(wrapper.find('form').exists()).toBe(false)

  await wrapper.get('button').trigger('click')
  await flushPromises()
  expect(writeText).toHaveBeenCalledWith('lubugandarwin@gmail.com')
  expect(wrapper.get('[role="status"]').text()).toContain('Copied')
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm.cmd run test:run -- src/components/sections/__tests__/ContactSection.spec.js`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement `useClipboard`**

Try `navigator.clipboard.writeText(text)` first. If unavailable or rejected, create a temporary `<textarea>`, select it, run `document.execCommand('copy')`, and remove it. Set `copied` true for 2000ms after success. Clean up the timer on unmount.

- [ ] **Step 4: Implement `ContactSection.vue`**

Use `Copy` and `Check` icons from `lucide-vue-next` on the copy button. Use `ArrowLink` for GitHub/LinkedIn with `external`. Keep the email link large and underlined. Add the status element.

- [ ] **Step 5: Run the test and verify it passes**

Run: `npm.cmd run test:run -- src/components/sections/__tests__/ContactSection.spec.js`

Expected: PASS.

- [ ] **Step 6: Commit (only if git is approved)**

```powershell
git add src/composables/useClipboard.js src/components/sections/ContactSection.vue src/components/sections/__tests__/ContactSection.spec.js
git commit -m "feat: add contact section with copy-email behavior"
```

---

### Task 9: App integration, reveal behavior, and legacy cleanup

**Files:**
- Modify: `src/App.vue`
- Modify: `src/main.js`
- Modify: `src/styles/main.css`
- Modify: `src/data/portfolio.js` (remove the legacy `portfolioData` export)
- Create: `src/composables/useReveal.js`
- Create: `src/test/App.spec.js`
- Modify: `src/components/layout/index.js`
- Modify: `src/components/sections/index.js`
- Modify: `src/composables/index.js`
- Delete: old sections, old layout components, old composables, old styles.

**Interfaces:**
- `App.vue` renders a skip link, `SiteHeader`, `<main id="main">` with `HeroSection`, `WorkSection`, `AboutSection`, `ExperienceSection`, `CertificationsSection`, `ContactSection`, and `SiteFooter`.
- `useReveal()` adds `is-visible` to `[data-reveal]` elements via IntersectionObserver. Under `prefers-reduced-motion: reduce`, it adds `is-visible` immediately to all elements. It disconnects on unmount.
- New CSS files are imported through `src/styles/main.css`; old CSS files are deleted.
- Old components, composables, and styles are removed, not left dormant.

- [ ] **Step 1: Write the failing App integration test**

Create `src/test/App.spec.js`:

```js
import { afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

afterEach(() => {
  vi.restoreAllMocks()
})

it('renders the new shell and removes the old sections', () => {
  const wrapper = mount(App, { attachTo: document.body })

  expect(wrapper.get('.skip-link').attributes('href')).toBe('#main')
  expect(wrapper.get('main').attributes('id')).toBe('main')
  expect(wrapper.get('h1').text()).toContain('I turn repetitive work into reliable systems')
  expect(wrapper.find('#work').exists()).toBe(true)
  expect(wrapper.find('#about').exists()).toBe(true)
  expect(wrapper.find('#experience').exists()).toBe(true)
  expect(wrapper.find('#certifications').exists()).toBe(true)
  expect(wrapper.find('#contact').exists()).toBe(true)

  expect(wrapper.text()).not.toContain('Testimonials')
  expect(wrapper.text()).not.toContain('Skills & Technologies')
  expect(wrapper.text()).not.toContain('Send Message')
  expect(wrapper.text()).not.toContain('Tech Stack')
})

it('reveals sections immediately when reduced motion is preferred', async () => {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))

  const wrapper = mount(App, { attachTo: document.body })
  await wrapper.vm.$nextTick()
  expect(wrapper.get('[data-reveal]').classes()).toContain('is-visible')
})
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm.cmd run test:run -- src/test/App.spec.js`

Expected: FAIL because `App.vue` still renders the old sections.

- [ ] **Step 3: Implement `useReveal`**

Requirements:
- Accept no arguments.
- On mount, query `[data-reveal]`.
- If `matchMedia('(prefers-reduced-motion: reduce)').matches`, add `is-visible` to every element and return.
- Otherwise, observe each element; on intersection, add `is-visible` and unobserve.
- Disconnect on unmount.
- Guard when `IntersectionObserver` is unavailable: add `is-visible` to all.

- [ ] **Step 4: Rewrite `App.vue` and `main.js`**

`App.vue` imports the new header, sections, footer, and `useReveal`. Add `data-reveal` to each section wrapper. Include the skip link before the header.

`main.js` imports the font CSS, `./styles/main.css`, and mounts the app. Remove old imports if any.

- [ ] **Step 5: Switch `src/styles/main.css` to the new styles**

Replace its imports with:

```css
@import './tokens.css';
@import './base.css';
@import './layout.css';
@import './components.css';
```

- [ ] **Step 6: Delete legacy files and update barrel exports**

Delete:
- `src/components/TechStackMarquee.vue`
- `src/components/sections/TestimonialsSection.vue`
- `src/components/sections/SkillsSection.vue`
- `src/components/sections/ProjectsSection.vue`
- `src/components/sections/CertificatesSection.vue`
- `src/components/layout/TheNavbar.vue`
- `src/components/layout/TheFooter.vue`
- `src/composables/useTypingAnimation.js`
- `src/composables/useCounterAnimation.js`
- `src/composables/useTheme.js`
- `src/composables/useContactForm.js`
- `src/composables/useScrollAnimation.js`
- Old CSS files under `src/styles/components/` and `src/styles/base/` (`index.css`, `_variables.css`, `_reset.css`, `_animations.css`, `_responsive.css`)

Keep the new files with the same names where they already exist; only delete files that are no longer imported. Do not delete `HeroSection.vue`, `AboutSection.vue`, `ExperienceSection.vue`, or `ContactSection.vue` — Tasks 5, 7, and 8 replaced their contents in place. Remove the legacy `portfolioData` export from `src/data/portfolio.js`; `portfolio` is now the only export. Verify with `grep` before deleting.

Update `src/components/layout/index.js`, `src/components/sections/index.js`, and `src/composables/index.js` to export only the new modules.

- [ ] **Step 7: Run the App test, all tests, and the build**

Run:

```powershell
npm.cmd run test:run
npm.cmd run build
```

Expected: all tests pass; build exits 0.

- [ ] **Step 8: Check for broken imports and leftover references**

Run:

```powershell
Get-ChildItem -Path "src" -Recurse -File | Select-String -Pattern "TheNavbar|TheFooter|TestimonialsSection|SkillsSection|ProjectsSection|CertificatesSection|useTypingAnimation|useCounterAnimation|useTheme|useContactForm|useScrollAnimation|TechStackMarquee|portfolioData|_variables|_reset|_animations"
```

Expected: no matches in source files (docs/spec files are outside `src`).

- [ ] **Step 9: Commit (only if git is approved)**

```powershell
git add src
git commit -m "feat: integrate editorial portfolio shell and remove legacy UI"
```

---

### Task 10: Metadata, favicon, OG image, and image optimization

**Files:**
- Modify: `index.html`
- Create: `public/favicon.svg`
- Create: `public/og-image.png`
- Create: `src/test/metadata.spec.js`
- Modify: `vite.config.js`
- Modify: `src/components/sections/HeroSection.vue`
- Modify: `package.json` / `package-lock.json`

**Interfaces:**
- `index.html` has the approved title, description, canonical URL, Open Graph/Twitter tags, JSON-LD `Person`, and `/favicon.svg`.
- `HeroSection.vue` imports the portrait via `vite-imagetools` `as=picture` and renders `<picture>` with AVIF, WebP, and JPG sources.
- No Google Fonts `<link>` remains.

- [ ] **Step 1: Install `vite-imagetools`**

Use the Vite 5-compatible major:

```powershell
npm.cmd install -D vite-imagetools@^6.2.9
```

- [ ] **Step 2: Write the failing metadata test**

Create `src/test/metadata.spec.js`:

```js
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')

describe('document metadata', () => {
  it('has the approved title and description', () => {
    expect(html).toContain('<title>Darwin M. Lubugan — Software Engineer & Automation</title>')
    expect(html).toContain('Software engineer building internal tools and automations')
  })

  it('has canonical, Open Graph, and Twitter metadata', () => {
    expect(html).toContain('rel="canonical" href="https://darwinlubugan.dev/"')
    expect(html).toContain('property="og:image" content="https://darwinlubugan.dev/og-image.png"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
  })

  it('has Person structured data and no runtime Google Fonts', () => {
    expect(html).toContain('application/ld+json')
    expect(html).toContain('"@type": "Person"')
    expect(html).not.toContain('fonts.googleapis.com')
    expect(html).not.toContain('fonts.gstatic.com')
  })
})
```

- [ ] **Step 3: Run the test and verify it fails**

Run: `npm.cmd run test:run -- src/test/metadata.spec.js`

Expected: FAIL because the old metadata remains.

- [ ] **Step 4: Create the favicon**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="4" fill="#B4431D"/>
  <text x="32" y="43" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#F4F0E7">DL</text>
</svg>
```

- [ ] **Step 5: Create the OG image**

Generate `public/og-image.png` (1200×630) with PowerShell and `System.Drawing`:

```powershell
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(1200,630)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.ColorTranslator]::FromHtml("#F4F0E7"))
$accent = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#B4431D"))
$g.FillRectangle($accent, 0, 0, 14, 630)
$ink = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#171512"))
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#6D675C"))
$display = New-Object System.Drawing.Font("Georgia", 64, [System.Drawing.FontStyle]::Regular)
$body = New-Object System.Drawing.Font("Segoe UI", 26, [System.Drawing.FontStyle]::Regular)
$mono = New-Object System.Drawing.Font("Consolas", 20, [System.Drawing.FontStyle]::Regular)
$g.DrawString("Darwin M. Lubugan", $display, $ink, 72, 120)
$g.DrawString("Software engineer · Automation", $body, $muted, 76, 230)
$g.DrawString("I turn repetitive work into reliable systems.", $body, $ink, 76, 330)
$g.DrawString("darwinlubugan.dev", $mono, $accent, 76, 500)
$g.Dispose()
$bmp.Save("C:\Project\Portfolio-main\public\og-image.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
```

Expected: 1200×630 PNG exists under 100KB.

- [ ] **Step 6: Update `index.html`**

Use:

```html
<title>Darwin M. Lubugan — Software Engineer & Automation</title>
<meta name="description" content="Software engineer building internal tools and automations with C#, .NET, Vue, PowerShell, and Python. Based in Batangas, Philippines.">
<link rel="canonical" href="https://darwinlubugan.dev/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://darwinlubugan.dev/">
<meta property="og:title" content="Darwin M. Lubugan — Software Engineer & Automation">
<meta property="og:description" content="Software engineer building internal tools and automations with C#, .NET, Vue, PowerShell, and Python.">
<meta property="og:image" content="https://darwinlubugan.dev/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Darwin M. Lubugan — Software Engineer & Automation">
<meta name="twitter:description" content="Software engineer building internal tools and automations with C#, .NET, Vue, PowerShell, and Python.">
<meta name="twitter:image" content="https://darwinlubugan.dev/og-image.png">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Darwin M. Lubugan",
  "jobTitle": "Software Engineer",
  "url": "https://darwinlubugan.dev/",
  "email": "mailto:lubugandarwin@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Batangas",
    "addressCountry": "PH"
  },
  "sameAs": [
    "https://github.com/Darwinie",
    "https://www.linkedin.com/in/lubugandarwin05"
  ]
}
</script>
```

Remove the Google Fonts `<link>` tags.

- [ ] **Step 7: Add the imagetools plugin and picture import**

In `vite.config.js`:

```js
import { imagetools } from 'vite-imagetools'

plugins: [vue(), imagetools()]
```

In `HeroSection.vue`, replace the plain portrait import with:

```js
import portrait from '@/assets/profile.png?w=480;960&format=avif;webp;jpg&as=picture'
```

Render:

```html
<picture class="hero__portrait">
  <source
    v-for="(srcset, format) in portrait.sources"
    :key="format"
    :srcset="srcset"
    :type="format === 'jpg' ? 'image/jpeg' : `image/${format}`"
    sizes="(max-width: 768px) 90vw, 420px"
  />
  <img
    :src="portrait.img.src"
    :width="portrait.img.w"
    :height="portrait.img.h"
    :alt="portfolio.profile.portraitAlt"
    loading="eager"
    decoding="async"
  />
</picture>
```

- [ ] **Step 8: Run the metadata test and build**

Run:

```powershell
npm.cmd run test:run -- src/test/metadata.spec.js
npm.cmd run build
```

Expected: 3 metadata tests pass; build emits AVIF, WebP, and JPG portrait variants. Check `dist/assets` for `profile-*` files and confirm no `profile-*.png` at 1.4MB remains.

- [ ] **Step 9: Commit (only if git is approved)**

```powershell
git add index.html package.json package-lock.json vite.config.js public/favicon.svg public/og-image.png src/components/sections/HeroSection.vue src/test/metadata.spec.js
git commit -m "feat: add metadata, social image, and optimized portrait pipeline"
```

---

### Task 11: End-to-end verification and visual QA

**Files:**
- Create: `playwright.config.js`
- Create: `e2e/portfolio.spec.js`
- Create: `test-results/` (generated output; add to `.gitignore`)
- Modify: `.gitignore`
- Modify: styles or components only if the visual review reveals a real defect

**Interfaces:**
- `playwright.config.js` starts `npm.cmd run preview -- --host 127.0.0.1 --port 4173` as the web server.
- E2E tests use accessible roles and text, not implementation classes, except `data-reveal` where needed.

- [ ] **Step 1: Install Playwright**

Run:

```powershell
npm.cmd install -D @playwright/test@^1.64.1
npx.cmd playwright install chromium
```

- [ ] **Step 2: Add the Playwright config**

Create `playwright.config.js`:

```js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm.cmd run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }
  ]
})
```

- [ ] **Step 3: Write the failing E2E test**

Create `e2e/portfolio.spec.js`:

```js
import { test, expect } from '@playwright/test'

test('portfolio is readable, responsive, and free of placeholder content', async ({ page }) => {
  const consoleErrors = []
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I turn repetitive work')
  await expect(page.getByRole('link', { name: /Download CV/i }).first()).toHaveAttribute('href', '/Lubugan_Darwin_Resume.pdf')
  await expect(page.getByText('Testimonials')).toHaveCount(0)
  await expect(page.getByText('Send Message')).toHaveCount(0)
  await expect(page.getByRole('link', { name: /GitHub/i }).first()).toHaveAttribute('href', 'https://github.com/Darwinie')
  await expect(page.getByRole('link', { name: /LinkedIn/i }).first()).toHaveAttribute('href', 'https://www.linkedin.com/in/lubugandarwin05')

  for (const width of [360, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow, `horizontal overflow at ${width}px`).toBe(false)
  }

  expect(consoleErrors).toEqual([])
})

test('mobile menu opens and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const button = page.getByRole('button', { name: /Open menu/i })
  await button.click()
  await expect(page.getByRole('button', { name: /Close menu/i })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: /Open menu/i })).toHaveAttribute('aria-expanded', 'false')
})

test('resume and visual assets resolve', async ({ page, request }) => {
  await page.goto('/')
  const resume = await request.get('/Lubugan_Darwin_Resume.pdf')
  expect(resume.status()).toBe(200)
  expect(resume.headers()['content-type']).toContain('pdf')

  const timekeeping = await request.get('/assets/projects/timekeeping-redacted.jpg')
  expect(timekeeping.status()).toBe(200)

  const portrait = await page.locator('.hero__portrait img').getAttribute('src')
  expect(portrait).toBeTruthy()
  const portraitResponse = await page.request.get(portrait)
  expect(portraitResponse.status()).toBe(200)
})

test('captures review screenshots', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true })
})
```

- [ ] **Step 4: Run the E2E tests and verify failures**

Run: `npx.cmd playwright test`

Expected: tests fail if any placeholder content, overflow, or broken asset remains.

- [ ] **Step 5: Fix defects, then run the full suite**

Run:

```powershell
npm.cmd run test:run
npm.cmd run build
npx.cmd playwright test
```

Expected: all unit and E2E tests pass; build exits 0.

- [ ] **Step 6: Review the screenshots**

Open `test-results/home-desktop.png` and `test-results/home-mobile.png` with the read tool. Check:

- Hero hierarchy is clear; the headline is the first thing you see.
- Portrait crop is not distorted or cropped through the face.
- Case-study rhythm has enough whitespace; meta rail aligns.
- No text collisions, tiny type, or awkward line breaks.
- Mobile nav is usable; no horizontal overflow.
- Accent appears only on links, numbers, focus states, and small marks.
- Fonts render as Newsreader/IBM Plex, not fallback serif/sans.

Fix real visual defects in CSS and rerun the screenshots. Do not redesign during this step.

- [ ] **Step 7: Add test artifacts to `.gitignore`**

Add:

```
test-results/
playwright-report/
```

- [ ] **Step 8: Final verification**

Run:

```powershell
npm.cmd run test:run
npm.cmd run build
npx.cmd playwright test
```

Expected: all pass. Record the final `dist` asset sizes:

```powershell
Get-ChildItem -Path "dist\assets" -File | Sort-Object Length -Descending | Select-Object -First 10 Name, Length
```

Expected: portrait variants are well under 250KB; no 1.4MB PNG is shipped.

- [ ] **Step 9: Commit (only if git is approved)**

```powershell
git add .gitignore playwright.config.js e2e
git commit -m "test: add responsive and visual verification"
```

---

## Self-Review

**Spec coverage**
- Intent/positioning: Task 1 content model, Task 5 hero.
- Audience/success: Task 5 + Task 11 E2E.
- Goals/non-goals/anti-goals: Global constraints; Task 9 deletes legacy UI.
- Editorial direction/palette/type/layout: Task 2 tokens/styles.
- Header, hero, work, about, experience, certifications, contact, footer: Tasks 4–8.
- Three deep case studies and safe visuals: Task 6.
- Education line: Task 7.
- Approximate metrics: Task 1, Task 5.
- Tooling (no Vuetify, Lucide, fonts, imagetools): Tasks 2, 3, 10.
- Metadata/OG/favicon: Task 10.
- Accessibility/reduced motion: Task 4, Task 9, Task 11.
- Performance/image optimization: Task 10, Task 11.
- No fake testimonials/form/dead links: Task 1, Task 8, Task 9.
- No unredacted screenshots: Task 6, Task 11.
- Responsive/no overflow: Task 2, Task 11.

**Type consistency**
- `portfolio` is the single export used everywhere.
- `useMobileMenu` returns `{ isOpen, toggle, close }`.
- `useScrollSpy` returns `{ activeSection }`.
- `useClipboard` returns `{ copied, copy }`.
- `CaseStudy` receives `study`; `PipelineDiagram` receives `steps`; `MetricStrip` receives `metrics`.
- Image path is `/assets/projects/timekeeping-redacted.jpg` in the data test and WorkSection test.
- Resume path is `/Lubugan_Darwin_Resume.pdf` in data, hero, header, footer, and E2E.

**Review Focus tests**
1. 360px overflow: Task 11 viewport loop.
2. Privacy leaks: Task 6 content test and asset check + Task 11 timekeeping-image request.
3. Fake content: Task 1 data test + Task 9 App test + Task 11 E2E text checks.
4. Keyboard/reduced motion: Task 4 Escape test + Task 9 `useReveal` requirement and reduced-motion App test; Task 2 reduced-motion CSS.
5. Broken assets: Task 11 HTTP checks for resume, timekeeping image, and portrait.

**Proportion**
The plan is long because the redesign touches content, design, and behavior. Code blocks are mostly tests and exact data values, not full component bodies. Builders write the CSS and markup from the spec and interfaces.
