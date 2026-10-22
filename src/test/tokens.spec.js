import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const tokens = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8')

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
