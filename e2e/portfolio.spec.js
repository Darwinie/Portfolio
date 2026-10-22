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

test('search discovery files resolve', async ({ page, request }) => {
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain('Sitemap: https://darwinlubugan.dev/sitemap.xml')

  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  expect(await sitemap.text()).toContain('<loc>https://darwinlubugan.dev/</loc>')

  await page.goto('/')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://darwinlubugan.dev/')
  const person = await page.locator('script[type="application/ld+json"]').textContent()
  expect(JSON.parse(person)).toMatchObject({
    '@type': 'Person',
    name: 'Darwin M. Lubugan',
    alternateName: 'Darwin Lubugan'
  })
})

test('captures review screenshots', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })

  const capture = async (width, height, path) => {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    const lazyImage = page.locator('.case-study__image')
    await lazyImage.scrollIntoViewIfNeeded()
    await expect(lazyImage).toHaveJSProperty('complete', true)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path, fullPage: true })
  }

  await capture(1440, 1000, 'test-results/home-desktop.png')
  await capture(390, 844, 'test-results/home-mobile.png')
})
