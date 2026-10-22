import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const readProjectFile = (path) => readFileSync(resolve(process.cwd(), path), 'utf8')
const html = readProjectFile('index.html')

describe('document metadata', () => {
  it('has the approved title and description', () => {
    expect(html).toContain('<title>Darwin M. Lubugan - Software Engineer & Automation</title>')
    expect(html).toContain('Software engineer building internal tools and automations')
  })

  it('has canonical, Open Graph, and Twitter metadata', () => {
    expect(html).toContain('rel="canonical" href="https://lubugandarwin.netlify.app/"')
    expect(html).toContain('property="og:image" content="https://lubugandarwin.netlify.app/og-image.png"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
    expect(html).toContain('name="robots" content="index, follow"')
  })

  it('has Person structured data and no runtime Google Fonts', () => {
    expect(html).toContain('application/ld+json')
    expect(html).toContain('"@type": "Person"')
    expect(html).toContain('"alternateName": "Darwin Lubugan"')
    expect(html).toContain('"image": "https://lubugandarwin.netlify.app/og-image.png"')
    expect(html).not.toContain('fonts.googleapis.com')
    expect(html).not.toContain('fonts.gstatic.com')
  })
})

describe('search engine discovery', () => {
  it('allows crawling and points to the sitemap', () => {
    const robots = readProjectFile('public/robots.txt')
    expect(robots).toContain('User-agent: *')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain('Sitemap: https://lubugandarwin.netlify.app/sitemap.xml')
  })

  it('lists the canonical homepage in the sitemap', () => {
    const sitemap = readProjectFile('public/sitemap.xml')
    expect(sitemap).toContain('<loc>https://lubugandarwin.netlify.app/</loc>')
    expect(sitemap).toContain('<lastmod>2026-10-22</lastmod>')
  })

  it('publishes the build without redirecting the primary Netlify URL', () => {
    const netlify = readProjectFile('netlify.toml')
    expect(netlify).toContain('publish = "dist"')
    expect(netlify).not.toContain('[[redirects]]')
    expect(netlify).not.toContain('darwinlubugan.dev')
  })
})
