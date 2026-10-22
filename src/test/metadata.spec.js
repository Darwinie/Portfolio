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
    expect(html).toContain('rel="canonical" href="https://darwinlubugan.dev/"')
    expect(html).toContain('property="og:image" content="https://darwinlubugan.dev/og-image.png"')
    expect(html).toContain('name="twitter:card" content="summary_large_image"')
    expect(html).toContain('name="robots" content="index, follow"')
    expect(html).not.toContain('netlify.app')
  })

  it('has Person structured data and no runtime Google Fonts', () => {
    expect(html).toContain('application/ld+json')
    expect(html).toContain('"@type": "Person"')
    expect(html).toContain('"alternateName": "Darwin Lubugan"')
    expect(html).toContain('"image": "https://darwinlubugan.dev/og-image.png"')
    expect(html).not.toContain('fonts.googleapis.com')
    expect(html).not.toContain('fonts.gstatic.com')
  })
})

describe('search engine discovery', () => {
  it('allows crawling and points to the sitemap', () => {
    const robots = readProjectFile('public/robots.txt')
    expect(robots).toContain('User-agent: *')
    expect(robots).toContain('Allow: /')
    expect(robots).toContain('Sitemap: https://darwinlubugan.dev/sitemap.xml')
  })

  it('lists the canonical homepage in the sitemap', () => {
    const sitemap = readProjectFile('public/sitemap.xml')
    expect(sitemap).toContain('<loc>https://darwinlubugan.dev/</loc>')
    expect(sitemap).toContain('<lastmod>2026-10-22</lastmod>')
  })

  it('redirects the Netlify subdomain and www host to the canonical domain', () => {
    const netlify = readProjectFile('netlify.toml')
    expect(netlify).toContain('publish = "dist"')
    expect(netlify).toContain('from = "https://lubugandarwin.netlify.app/*"')
    expect(netlify).toContain('to = "https://darwinlubugan.dev/:splat"')
    expect(netlify).toContain('from = "https://www.darwinlubugan.dev/*"')
    expect(netlify).toContain('status = 301')
  })
})
