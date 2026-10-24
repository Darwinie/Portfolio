import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { API_BASE_URL, DEFAULT_API_BASE_URL } from '@/config/api'
import {
  analyzeTicket,
  TicketTriageError
} from '../ticketTriage'

const successResponse = {
  category: 'Question',
  suggestedReply: 'You can update your billing contact from the account settings page.',
  adjustedPriority: 'Low',
  explanation: 'The customer is asking for account information.',
  requiresUrgentCare: false,
  confidenceScore: null
}

const jsonResponse = (body, { ok = true, status = 200 } = {}) => ({
  ok,
  status,
  json: vi.fn().mockResolvedValue(body)
})

describe('ticket triage API client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('uses the local API URL by default', () => {
    expect(DEFAULT_API_BASE_URL).toBe('http://localhost:5176')
  })

  it('posts the triage payload and returns the parsed result', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse(successResponse))

    const result = await analyzeTicket({
      ticketText: 'How do I update the billing contact?',
      requestedPriority: 'Low'
    })

    expect(result).toEqual(successResponse)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/TicketTriage/analyze`,
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          ticketText: 'How do I update the billing contact?',
          requestedPriority: 'Low'
        })
      })
    )
  })

  it('wraps network failures in a safe error', async () => {
    globalThis.fetch.mockRejectedValue(new TypeError('Failed to fetch'))

    await expect(analyzeTicket({ ticketText: 'Help' })).rejects.toMatchObject({
      name: 'TicketTriageError',
      kind: 'network',
      message: expect.stringContaining('Could not reach the triage service')
    })
  })

  it('surfaces safe API problem details and the error code', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse({
      title: 'AI provider timed out.',
      detail: 'The AI provider request timed out.',
      code: 'ai_provider_timeout'
    }, { ok: false, status: 504 }))

    const error = await analyzeTicket({ ticketText: 'Help' }).catch((reason) => reason)

    expect(error).toBeInstanceOf(TicketTriageError)
    expect(error).toMatchObject({
      kind: 'api',
      status: 504,
      code: 'ai_provider_timeout',
      message: 'The AI provider request timed out.'
    })
  })

  it('rejects an incomplete triage response', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse({
      category: 'Bug',
      suggestedReply: 'We are looking into it.'
    }))

    await expect(analyzeTicket({ ticketText: 'Help' })).rejects.toMatchObject({
      kind: 'invalid-response',
      message: expect.stringContaining('incomplete triage result')
    })
  })
})
