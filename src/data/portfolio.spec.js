import { describe, it, expect } from 'vitest'
import { portfolio } from './portfolio'

describe('portfolio content model', () => {
  it('has the approved profile and links', () => {
    expect(portfolio.profile.name).toBe('Darwin M. Lubugan')
    expect(portfolio.profile.role).toBe('Software Engineer — Automation')
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
      'Build', 'Automate', 'Data', 'Support', 'Systems', 'Operate'
    ])
  })

  it('presents the Advani official title with IT support expertise', () => {
    const advani = portfolio.experience[0]
    expect(advani.role).toBe('Junior Network and System Administrator')
    expect(advani.company).toBe('Advani Group of Companies (Nyne Beauty Inc.)')
    expect(portfolio.about.currently).toContainEqual({ label: 'Role', value: 'Junior Network and System Administrator' })

    const highlights = advani.highlights.join(' ')
    expect(highlights).toContain('Windows / macOS')
    expect(highlights).toContain('Active Directory')
    expect(highlights).toContain('Hyper-V')
    expect(highlights).toContain('Proxmox')
    expect(highlights).toContain('Linux')
    expect(highlights).toContain('Azure DevOps')
    expect(highlights).toContain('Dynamics 365 Business Central')
    expect(highlights).toContain('IT asset records')
    expect(highlights).toContain('equipment inventory')
    expect(advani.summary).toContain('automation opportunities')

    const systems = portfolio.about.toolbox.find((group) => group.group === 'Systems')
    expect(systems.items).toEqual(expect.arrayContaining(['Hyper-V', 'Proxmox', 'Linux', 'pfSense']))
  })
})
