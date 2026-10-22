# Portfolio Redesign — Design

**Owner:** Darwin M. Lubugan
**Date:** 2026-10-22
**Status:** Draft for approval

## 1. Intent

Replace the current generic dark/gradient portfolio with a professional, editorial
single-page site that positions Darwin as a software engineer who builds
automation and internal systems for business operations.

The current site looks like the default output of a "modern developer portfolio"
prompt: indigo-violet gradient, animated typing, particles, counters, emoji
icons, percentage skill bars, and a nine-section checklist. It is competent but
interchangeable. The redesign must make the work — not the template — the
memorable part.

The site should feel like a working notebook from a thoughtful engineer: quiet,
specific, well-made, and confident enough to leave things out.

## 2. Audience and success

**Primary audience:** hiring managers, technical leads, and recruiters evaluating
Darwin for software engineering, automation engineering, or internal-tools roles,
both in the Philippines and remote/international.

**Secondary audience:** colleagues and potential collaborators who want a quick
sense of what he does and how to reach him.

**Success looks like:**

- A recruiter understands the positioning within five seconds.
- A technical reviewer finds three credible, specific case studies with outcomes.
- The resume is one click away.
- The contact path is real and frictionless.
- The site loads fast and works well on a phone.
- Nobody mistakes it for a template.

## 3. Goals, non-goals, anti-goals

### Goals

- Establish a distinctive visual identity that does not rely on the default
  indigo/violet gradient, glassmorphism, or Material Design.
- Lead with outcomes: less manual work, faster processing, removed licensing
  costs, more reliable operations.
- Present three deep case studies instead of five shallow project cards.
- Make the content scannable for a non-technical recruiter and rewarding for a
  technical reviewer.
- Keep the stack small, fast, and maintainable.
- Make the site accessible and mobile-first.
- Preserve the real content: work history, education, photo, resume, links, and
  sourced metrics. Mark estimates as approximate.

### Non-goals

- No blog, CMS, authentication, or database.
- No multi-page case-study routing in this version. The three case studies live
  on the single page.
- No theme toggle in v1. The light editorial palette is the identity.
- No contact form. Email is the primary contact action.
- No testimonials unless real, attributable quotes are supplied.
- No skill percentages or proficiency bars.
- No animated counters, typing headline, particle field, or infinite marquee.

### Anti-goals

- Looking like a SaaS landing page or an admin dashboard.
- Looking like a generic AI-generated portfolio with swapped colors.
- Sacrificing readability for animation or novelty.
- Inventing testimonials, metrics, dates, or credentials.
- Shipping dead links or a form that only shows an alert.

## 4. Constraints

- Existing app is Vue 3 + Vite with plain CSS and no router.
- The content lives in `src/data/portfolio.js`; the redesign will restructure it.
- The new resume is `public/Lubugan_Darwin_Resume.pdf`; keep it downloadable.
- The profile photo is `src/assets/profile.png`; Darwin replaces this file to
  update the photo. Build-time processing must keep that workflow.
- Project screenshots exist for the image resizer, timekeeping system, Shopify
  automation, and OCR integration, but two do not depict the claimed work and
  several expose internal URLs, system names, or browser bookmarks. They cannot
  ship unredacted. `mho-system.png` is missing. The default plan uses custom
  diagrams and a safe timekeeping crop.
- No backend is available for a contact form.
- The site is deployed as static files from `dist/`.
- The current content includes unverifiable or placeholder items (generic
  testimonials, certificate issuers/dates, `#` project links). These must be
  removed or replaced with honest content, not dressed up.

## 5. Approaches considered

### A. Editorial case-study portfolio — chosen

Warm paper background, ink text, one oxide accent, a serif display face with
monospace metadata, asymmetric grid, hairline rules, and three long-form case
studies. The visual language borrows from engineering notebooks and editorial
design rather than SaaS dashboards.

**Why it wins:** It is distinctive without being gimmicky. It supports the
specific content (process, constraints, measured outcomes) and reads well to both
recruiters and engineers. It can be built with the existing Vue/Vite stack and a
small dependency set.

### B. Technical workbench

Dark graphite, monospace type, pipeline diagrams, code excerpts, and an
"automation log" motif. Strong thematic fit, but it risks becoming a costume,
reduces scanability for non-technical readers, and makes the site feel like a
developer tool rather than a professional portfolio. Rejected for v1.

### C. Refined minimal corporate

White background, navy/blue accent, clean cards, standard sections. Safe and
polished, but still close to the current site and still common. Rejected because
it does not solve the distinctiveness problem.

### Tooling decision

Keep **Vite** and **Vue 3**. Do **not** add Vuetify. Vuetify imposes Material
Design patterns, which would recreate the dashboard/template feel the redesign
is trying to escape. Add only:

- `lucide-vue-next` for a consistent, lightweight icon set.
- Self-hosted webfonts through `@fontsource` packages.
- `vite-imagetools` for build-time responsive/optimized images.

No animation library, router, state manager, or CSS framework is needed.

## 6. Design direction

### Principles

1. **Specific over impressive.** Real outcomes, named systems, plain language.
2. **Structure through typography and rules, not cards and shadows.**
3. **One accent, used like a red pencil.**
4. **Whitespace is part of the design.**
5. **Motion confirms, never performs.**
6. **Every element must be real or removed.**

### Color

Light, warm, paper-like. No gradients.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F4F0E7` | Page background |
| `--paper-deep` | `#EAE4D7` | Alternating bands, image mats |
| `--ink` | `#171512` | Primary text, buttons |
| `--ink-soft` | `#3A3630` | Secondary headings |
| `--muted` | `#6D675C` | Body secondary text, metadata |
| `--line` | `#D5CDBE` | Hairline rules and borders |
| `--accent` | `#B4431D` | Links, section numbers, focus ring, small marks |
| `--accent-soft` | `#F0DED2` | Selected states, code highlights |
| `--code-bg` | `#1C1A17` | Code/terminal blocks |
| `--code-text` | `#EDE7DB` | Code text |

Contrast target: WCAG AA for all text. The accent is for non-body text and
interactive states; body copy uses ink/muted.

### Typography

Self-hosted via `@fontsource`; no Google Fonts request at runtime.

- **Display:** Newsreader (variable), weights 400–600. Used for the hero
  headline, section titles, case-study titles, and large pull quotes.
- **Body/UI:** IBM Plex Sans, weights 400/500/600. Used for paragraphs, nav,
  buttons, and labels.
- **Metadata/code:** IBM Plex Mono, weights 400/500. Used for section numbers,
  dates, stack lists, captions, and code.

Type scale:

- Hero: `clamp(3rem, 7vw, 6.5rem)`, line-height `0.95`, letter-spacing `-0.03em`.
- Section title: `clamp(2rem, 4vw, 3.5rem)`, line-height `1.05`.
- Case-study title: `clamp(1.75rem, 3vw, 2.75rem)`.
- Body: `1rem` / `1.7`.
- Lead paragraph: `clamp(1.125rem, 1.5vw, 1.375rem)` / `1.6`.
- Label/metadata: `0.75rem`, uppercase, letter-spacing `0.12em`, mono.

No Inter. No gradient text. No all-caps body copy.

### Layout and grid

- Max content width: `1240px`.
- 12-column grid with `24px` gutters.
- Section padding: `clamp(4.5rem, 9vw, 8rem)` vertical, `24px` horizontal.
- Hairline rules separate major sections and case-study metadata.
- Asymmetric compositions: hero uses a 7/5 split; case studies use a sticky
  3-column meta rail and a 8-column narrative column; about uses a 5/7 split.
- Corners are square or `2px`; no large rounded cards.
- No drop shadows. Depth comes from rules, spacing, and background shifts.

### Imagery

- Portrait: natural color, 4:5 crop, thin ink border, small mono caption
  ("Batangas, Philippines · GMT+8"). No duotone gimmick.
- Project screenshots: 16:10 or 4:3, framed by a 1px line, no browser chrome
  unless the screenshot already includes it.
- Code/terminal blocks: only where they add proof (e.g., the Shopify automation
  pipeline). Keep excerpts short; never paste walls of code.
- Diagrams: simple 3-step pipeline drawn with HTML/CSS, not stock illustrations.
- No emoji as UI icons. Lucide icons only where an icon clarifies an action.

### Motion

- Hero: a single staggered fade/translate on load (60ms increments).
- Sections: fade/translate 16px when entering the viewport, once.
- Links/buttons: underline draw or 2px arrow shift; 150–200ms.
- Images: scale to `1.02` on hover, 300ms.
- Respect `prefers-reduced-motion: reduce`: no transforms, no reveals, no
  smooth scrolling.
- No typing effect, counters, particles, parallax, or marquee.

### Voice

First person, plain, specific. Short sentences. No "passionate", "innovative",
"cutting-edge", "bringing ideas to life", or "I believe in continuous learning".

Example hero copy:

> **Software engineer · Automation**
>
> # I turn repetitive work into reliable systems.
>
> I build internal tools and automations for business operations — C#, .NET,
> Vue, PowerShell, Python, SQL. Currently keeping business systems running at
> Advani Group of Companies.
>
> [See selected work →] [Download CV]

## 7. Page structure and content

### 7.1 Header

- Left: wordmark `Darwin Lubugan` in IBM Plex Sans 600, with a small accent
  square before the name. No gradient monogram.
- Center/right: `Work`, `About`, `Experience`, `Contact`.
- Right: `Resume` text link with a download icon, separated by a hairline.
- Sticky, `72px` tall, paper background, 1px bottom border appears after 24px
  scroll. No blur/glass.
- Active section indicated by a short accent underline (IntersectionObserver).
- Mobile: wordmark + menu button; opening reveals a full-width paper panel with
  large serif links, email, and resume. Escape/outside click closes; focus is
  moved into and returned from the panel.

### 7.2 Hero

Layout: left 7 columns, right 5 columns.

Left:
- Eyebrow: `Software engineer · Automation` in mono.
- Headline: `I turn repetitive work into reliable systems.`
- Lead: the paragraph above.
- Actions: `See selected work` (arrow link) and `Download CV` (solid ink button).
- Small availability line: `Open to software engineering and automation roles · Remote-friendly`.

Right:
- Portrait in a 4:5 frame with a thin border and mono caption.
- Optionally a small "Currently" note: `Advani Group of Companies · 2025—`.

Below both, a full-width proof strip separated by hairlines:

- `≈70%` — less repetitive work (approximate, per existing resume wording)
- `Weeks → < 1 hour` — catalog cleanup
- `Since 2023` — building internal tools

Each item has a mono label and a short plain-language caption. No animated
counters.

### 7.3 Selected work

Section label: `Selected work` / `01—03`.

Three case studies, each a full-width block with a sticky meta rail on desktop:

**01 — Shopify catalog automation**
- Outcome: `A multi-week catalog cleanup, reduced to under an hour.`
- Meta: Role `Automation engineer`; Stack `PowerShell · Python · Shopify API`;
  Scope `Product data, deduplication, barcode generation`.
- Narrative:
  - Context: product data across stores was inconsistent, duplicated, and slow
    to reconcile; barcode generation was manual.
  - Constraint: no third-party licensing; the process had to fit existing store
    operations.
  - What I built: a set of scripts for data alignment, deduplication, and
    barcode generation against the Shopify API.
  - Result: repeatable cleanup in under an hour instead of weeks of manual work.
- Visual: a three-step pipeline diagram (catalog data → dedupe/align → barcode
  generation). Do not use the existing `shopify-automation.png`; it shows a
  settings screen for a different app and exposes an internal store URL.

**02 — Timekeeping, rebuilt in-house**
- Outcome: `Replaced a licensed timesheet system with a custom PHP/MySQL app.`
- Meta: Role `Full-stack developer`; Stack `PHP · MySQL · Vue.js`;
  Scope `Timekeeping, records, reporting`.
- Narrative:
  - Context: manual timesheets and recurring third-party licensing fees.
  - What I built: an internal timekeeping system covering entry, records, and
    reporting.
  - Result: eliminated licensing fees and manual timesheet handling.
- Visual: a redacted/cropped timekeeping screenshot (remove the internal system
  name and any URL), or a simple dashboard mockup if a clean crop is not
  possible.

**03 — OCR at the counter**
- Outcome: `Customer identification ≈70% faster, with no manual typing.`
- Meta: Role `Software engineer`; Stack `Azure OCR · Vue.js · C#`;
  Scope `Customer identification, data entry`.
- Narrative:
  - Context: manual customer identification created queues and typing errors.
  - What I built: an OCR integration that reads customer information and feeds
    it into the existing workflow.
  - Result: ≈70% faster processing and less manual data entry.
- Visual: a three-step OCR flow diagram (capture → extract → prefill the
  existing workflow). Do not use `ocr-integration.png`; it is an Azure AI
  Services marketing page, not the integration itself.

**Screenshot policy (approved):** use custom pipeline diagrams for cases 01 and
03, and a cropped/redacted timekeeping dashboard for case 02. None of the current
project screenshots ship unredacted.
`shopify-automation.png` shows a different app's settings screen, an internal
store URL, an access-token field, and a password form. `shopify-image-resizer.png`
shows `localhost`, an internal uploader path, and browser bookmarks containing
client/production links. `timekeeping-system.png` shows the internal system name.
`ocr-integration.png` is a generic Azure portal page. Use custom pipeline
diagrams for cases 01 and 03. Use a tightly cropped, redacted timekeeping
dashboard only if Darwin confirms it is safe and representative; otherwise use a
neutral dashboard mockup. No real customer data, store URLs, bookmarks, or
internal system names may be visible.

Each case study ends with an honest link state:
- If a public demo/code exists: `View code ↗` or `View demo ↗`.
- If internal: `Internal project · code available on request` (not a dead link).

Below the three studies, a compact "Additional work" list:
- Shopify image resizer with API tester — Python, Shopify API, Pillow.
- Municipal Health Office information system — C#, .NET, SQL Server (capstone).
No images required; each is one line with a stack label.

### 7.4 About, capabilities, and how I work

Layout: portrait or a smaller square portrait on the left; narrative on the
right.

Copy direction:

> I'm Darwin, a software engineer based in Batangas, Philippines. I build
> internal tools and automations for business operations — the kind of work that
> removes a manual step, a spreadsheet, or a licensing fee. I've worked across
> the Microsoft stack, PHP/MySQL systems, and Shopify automation, and I'm
> currently supporting business systems at Advani Group of Companies.

**How I work** — four numbered steps in a 2×2 grid or a single row:
1. Observe the process.
2. Find the constraint.
3. Build the smallest reliable system.
4. Measure and document it.

**Toolbox** — grouped text lists, no percentages:
- Build: C#, .NET, ASP.NET Core, Vue.js, PHP
- Automate: PowerShell, Python, Shopify API, Azure OCR
- Data: SQL Server, T-SQL, MySQL, MongoDB
- Operate: Dynamics 365 Business Central, SAP Business One, network/system support

No emoji icons. Group labels in mono; technologies as plain text separated by
middots or commas.

### 7.5 Experience

A compact two-column list, not a decorative timeline.

- Left rail: dates in mono.
- Right: role, company, one-line scope, and 2–3 outcome bullets.
- Hairline rule between entries.
- Keep current role first: Junior Network and System Administrator, Advani Group
  of Companies, Nov 2025—Present.
- Previous: Software Engineer, Elyon Global Technologies Asia Inc., Oct 2023—Oct
  2025.
- Bullets should emphasize outcomes already supported by the existing data:
  automation reducing a multi-week process to under an hour; in-house
  timekeeping replacing licensing; OCR reducing manual entry; documentation
  automation with Whisper AI/Python. No invented numbers.
- Add one compact education line after the experience list: `BSIT, Cum Laude —
  STI College Balayan, 2019–2023`. This is a real differentiator for an early-
  career engineer and should not be dropped silently.

### 7.6 Certifications

A quiet index list, not trophy cards:
- SAP Business One (Basic — Financials and Logistics)
- SAP Business One (Advanced — Implementation and Support)
- Tech Talks: AI and Agents
- Lean Six Sigma Yellow Belt
- Lean Six Sigma White Belt

Display names only. Do not invent issuers or dates. If Darwin supplies them
later, add a muted issuer/date column.

### 7.7 Contact

Large editorial closing block:

> **Have a process that needs to disappear?**
>
> Email me at [lubugandarwin@gmail.com](mailto:lubugandarwin@gmail.com).

- Primary action: email link styled as a large underlined link.
- A small `Copy email` button with copied confirmation.
- Links: GitHub, LinkedIn. Facebook optional in the footer only.
- Location and timezone: `Batangas, Philippines · GMT+8`.
- No contact form. No "available for freelance" claim unless Darwin confirms it.

### 7.8 Footer

Minimal:
- `Darwin Lubugan` wordmark.
- `Batangas, Philippines · GMT+8`.
- GitHub, LinkedIn, Email, Resume.
- `Built with Vue 3 + Vite` in mono, small.
- No back-to-top gimmick; the sticky nav covers navigation.

## 8. Technical architecture

### Stack

- Vue 3 + Vite (existing).
- `lucide-vue-next` for icons.
- `@fontsource-variable/newsreader`, `@fontsource/ibm-plex-sans`,
  `@fontsource/ibm-plex-mono` (exact package names verified during
  implementation; fall back to static weights if a variable package is not
  available).
- `vite-imagetools` for responsive image imports.
- Native APIs for scroll reveal, scroll spy, clipboard, and mobile menu.
- No Vuetify, router, Pinia, GSAP, or Tailwind.

### File structure

```
src/
  App.vue
  main.js
  assets/
    profile.png                 # replaceable source photo
  components/
    layout/
      SiteHeader.vue
      SiteFooter.vue
    sections/
      HeroSection.vue
      WorkSection.vue
      AboutSection.vue
      ExperienceSection.vue
      CertificationsSection.vue
      ContactSection.vue
    ui/
      ArrowLink.vue
      CaseStudy.vue
      MetricStrip.vue
      SectionHeading.vue
  composables/
    useScrollSpy.js
    useReveal.js
    useClipboard.js
    useMobileMenu.js
  data/
    portfolio.js
  styles/
    tokens.css
    base.css
    layout.css
    components.css
```

Delete `TechStackMarquee.vue`, `TestimonialsSection.vue`, `SkillsSection.vue`,
`ProjectsSection.vue`, `useTypingAnimation.js`, `useCounterAnimation.js`,
`useTheme.js`, `useContactForm.js`, and their unused styles. Rename/replace
`CertificatesSection.vue` with `CertificationsSection.vue`.

### Data model

Restructure `src/data/portfolio.js` into:

```js
export const portfolio = {
  profile: {
    name, role, location, timezone, email, availability, headline, intro,
    portrait, resumeUrl, links: [{ label, url, icon }]
  },
  metrics: [{ value, label, detail }],
  caseStudies: [{
    number, slug, title, outcome, context, constraint, built, result,
    role, stack: [], scope, image, imageAlt, link: { label, url } | null
  }],
  additionalWork: [{ title, description, stack }],
  about: { bio, howIWork: [], toolbox: [{ group, items: [] }] },
  experience: [{ role, company, period, summary, highlights: [] }],
  certifications: [{ name }],
  contact: { headline, email, location, timezone }
}
```

No testimonials, no skill proficiency values, no fake `demoUrl`/`codeUrl`.

### Components

- `SiteHeader`: sticky nav, active section, mobile panel, resume link.
- `HeroSection`: headline, intro, actions, portrait, proof strip.
- `WorkSection`: case-study list and additional-work list.
- `CaseStudy`: sticky meta rail, narrative sections, visual, link state.
- `AboutSection`: bio, how-I-work steps, toolbox.
- `ExperienceSection`: compact date/role list.
- `CertificationsSection`: index list.
- `ContactSection`: email link, copy button, social links.
- `SiteFooter`: minimal links and metadata.
- `ArrowLink`, `SectionHeading`, `MetricStrip` for repeated UI.
- `useReveal`: adds `is-visible` once per element, respects reduced motion.
- `useScrollSpy`: active nav section from IntersectionObserver.
- `useClipboard`: copy email with success state and fallback.
- `useMobileMenu`: open/close, Escape, focus management, body scroll lock.

### CSS architecture

- `tokens.css`: colors, type scale, spacing, radii, shadows (none by default),
  motion durations, container widths.
- `base.css`: reset, document defaults, focus-visible, selection, reduced motion.
- `layout.css`: page shell, section spacing, grids, rules.
- `components.css`: shared UI primitives (buttons, links, labels, tags, images,
  code blocks) plus section-specific styles.
- Keep the CSS plain and global; no preprocessor. Avoid dumping component styles
  into the reset file.
- Use logical properties where practical (`margin-inline`, `padding-block`).
- No `!important` except a documented accessibility fallback.

### Image strategy

- `profile.png` remains the replaceable source. Use `vite-imagetools` to emit
  AVIF/WebP at 480w and 960w, with a PNG fallback; render via `<picture>` with
  width/height to prevent layout shift.
- Optimize project screenshots to WebP where possible; keep originals in
  `public/assets/projects/` if they are referenced by absolute URL. Better:
  import them from `src/assets/projects/` so Vite fingerprints them and
  `vite-imagetools` can process them.
- Target: profile under 250KB at the largest displayed size; project images
  under 200KB each.
- All images have explicit dimensions and meaningful `alt`.

### SEO and metadata

- Update `index.html` title and description to match the new positioning.
- Keep Open Graph/Twitter tags; create a branded `og-image.png` (1200×630) with
  the wordmark, role, and paper/accent palette.
- Replace the text favicon with a small SVG monogram using the accent and ink.
- Add JSON-LD `Person` with name, job title, location, sameAs links, and URL.
- Canonical URL: keep the existing `https://darwinlubugan.dev/` and deploy at
  the domain root. If the final host or path changes, update the canonical URL,
  Open Graph URL, and Vite `base` in one place. This is a configuration detail,
  not a design decision.
- Ensure `lang="en"` and a single H1.

### Accessibility

- Skip link to `#main`.
- Semantic landmarks: header, nav, main, section with accessible names, footer.
- Heading order: one H1, H2 per section, H3 per case study.
- Keyboard: all actions reachable; visible `:focus-visible` ring; mobile menu
  focus trap and return.
- `aria-current="page"` or `aria-current="true"` on active nav links.
- Icon-only buttons have accessible names.
- Images have alt text; decorative rules are CSS, not images.
- Contrast AA; do not use accent for body text.
- `prefers-reduced-motion` respected by CSS and JS reveal.
- Copy-email confirmation announced with `aria-live="polite"`.

### Performance

- Self-hosted fonts, latin subset, `font-display: swap`, preload the display
  font used above the fold.
- No runtime Google Fonts request.
- No JS animation library.
- Lazy-load below-the-fold images; eager-load the portrait.
- Target Lighthouse Performance/Accessibility/Best Practices/SEO ≥ 95 on
  mobile.
- Build output should stay well under 300KB JS gzipped (current is ~37KB).

## 9. Content and asset changes

- Remove fake testimonials; remove the testimonials section.
- Remove the contact form and `useContactForm`; use a mailto link and copy
  button.
- Remove percentage skill bars; replace with grouped toolbox lists.
- Remove the tech marquee, particles, typing headline, and counter animation.
- Remove `#` demo/code links; use honest internal-project labels.
- Remove the MHO project card if no screenshot exists; list it under additional
  work without an image.
- Add the compact education line: BSIT, Cum Laude, STI College Balayan,
  2019–2023.
- Replace unsafe screenshots with custom diagrams; use a redacted or cropped
  timekeeping dashboard. Never ship internal URLs, store names, customer data,
  or bookmarks.
- Keep the updated resume link and PDF.
- Keep the profile photo workflow: replace `src/assets/profile.png`, rebuild,
  and the new photo is picked up with a hashed URL.
- Create a real OG image and SVG favicon.
- Keep the canonical URL `https://darwinlubugan.dev/` unless the deployment
  changes.
- If real testimonials or certificate issuers/dates are supplied later, add them
  as a small, honest addition; do not invent them.

## 10. Responsive behavior

- Mobile-first CSS.
- `≤ 1024px`: hero stacks (text first, portrait second); case-study meta rail
  becomes a horizontal metadata row above the narrative; about stacks.
- `≤ 768px`: nav becomes wordmark + menu; section padding reduces; type scale
  clamps; proof strip becomes a 3-row list or 1-column stack; case-study visuals
  full width.
- `≤ 480px`: single-column everything; buttons full width where appropriate;
  headline remains large but fits; touch targets ≥ 44px.
- Test at 360, 768, 1024, 1440, and 1920 widths.
- No horizontal overflow at any width.

## 11. Acceptance criteria

- The hero states the positioning and shows the portrait, two actions, and three
  sourced proof points; estimates are marked with `≈`.
- There are exactly three deep case studies, each with context, constraint,
  what was built, result, role, stack, and a visual or honest link state.
- No testimonials, no fake contact form, no `#` links, no percentage bars, no
  emoji UI icons, no gradient text, no particles, no typing animation, no
  marquee.
- The site uses the editorial palette and the Newsreader / IBM Plex pairing.
- The light theme is the only theme; there is no theme toggle.
- Resume download works and points to the updated PDF.
- `src/assets/profile.png` remains the replaceable photo source and is
  optimized at build time.
- Contact section has a working mailto link, copy-email control, GitHub, and
  LinkedIn.
- Header navigation works on desktop and mobile, including keyboard and focus
  management.
- `prefers-reduced-motion` disables non-essential motion.
- Build passes with `npm.cmd run build`.
- Lighthouse mobile scores ≥ 95 for Performance, Accessibility, Best Practices,
  and SEO, or any shortfall is documented with a reason.
- No console errors.
- All content is honest: no invented metrics, dates, issuers, or testimonials.
- No internal store URLs, customer data, browser bookmarks, or internal system
  names are visible in any shipped image.

## 12. Risks and open questions

- **Positioning vs current title:** the site positions Darwin as a software
  engineer focused on automation, while his current title is Junior Network and
  System Administrator. The experience section states the title accurately; the
  hero focuses on the work. If he wants to target sysadmin roles instead, the
  hero copy and case-study order change.
- **Real testimonials:** none are verifiable. They are removed. If Darwin can
  supply real quotes, they can be added later outside this scope.
- **Certificate metadata:** issuers/dates are unknown. Names only for v1.
- **Public project links:** internal projects have no public code. The site uses
  an honest "code available on request" state rather than dead links.
- **Screenshots and internal data (resolved):** the existing screenshots are not
  safe or representative as-is. Darwin chose custom pipeline diagrams for cases
  01 and 03, plus a redacted/cropped timekeeping dashboard for case 02. No
  unredacted screenshot ships.
- **Canonical URL:** `https://darwinlubugan.dev/` is assumed from the existing
  metadata. If the site is deployed to a GitHub Pages subpath or another domain,
  the canonical URL and Vite base must be updated.
- **Photo quality:** the current PNG is 1.4MB. Build-time optimization will fix
  delivery; if the source is low-resolution, the portrait may look soft at 960w.
- **Dark mode:** intentionally omitted in v1. Adding it later means a second
  palette and re-testing contrast, not a toggle-only change.
- **No git repository:** the design doc cannot be committed. It is saved in the
  project for approval and implementation.

## 13. What's left to the builder

- Exact wording of case-study paragraphs, within the voice and facts above.
- Exact font package names/weights and the `vite-imagetools` configuration.
- Exact spacing and type-scale tuning after visual review.
- The exact labels and layout of the three pipeline diagrams.
- Whether to include a short terminal/code excerpt in case study 01 and what it
  contains.
- Final OG image composition and favicon geometry.
- Any minor responsive adjustments discovered during implementation.

These are implementation decisions that do not change the design direction.
