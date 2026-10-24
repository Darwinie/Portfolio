import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TicketTriageSection from '../TicketTriageSection.vue'
import { API_BASE_URL } from '@/config/api'

const successResponse = {
  category: 'Bug',
  suggestedReply: 'Thanks for reporting this. Our team is investigating the checkout failure.',
  adjustedPriority: 'Urgent',
  explanation: 'The checkout failure blocks a customer from completing an order.',
  requiresUrgentCare: true,
  confidenceScore: 94
}

const jsonResponse = (body, { ok = true, status = 200 } = {}) => ({
  ok,
  status,
  json: vi.fn().mockResolvedValue(body)
})

describe('TicketTriageSection', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the accessible form, priority options, and fictional examples', () => {
    const wrapper = mount(TicketTriageSection)

    expect(wrapper.get('#triage').exists()).toBe(true)
    expect(wrapper.get('#triage-title').text()).toBe('AI-Powered Ticket Triage & System Integration')
    expect(wrapper.text()).toContain('An interactive demo integrating Vue 3, ASP.NET Core Web API (.NET 10), and Google Gemini AI')
    expect(wrapper.get('label[for="triage-ticket-text"]').text()).toContain('Issue description')
    expect(wrapper.get('#triage-ticket-text').attributes('required')).toBeDefined()
    expect(wrapper.get('#triage-ticket-text').attributes('maxlength')).toBe('8000')
    expect(wrapper.get('#triage-context').attributes('maxlength')).toBe('2000')
    expect(wrapper.get('#triage-priority').findAll('option')).toHaveLength(5)
    expect(wrapper.findAll('[data-triage-example]')).toHaveLength(3)
    expect(wrapper.get('.triage__form').text()).toContain('Fictional examples')
    expect(wrapper.text()).toContain('AI-generated')
    expect(wrapper.text()).toContain('human review')
  })

  it('populates the form from a fictional example', async () => {
    const wrapper = mount(TicketTriageSection)
    const example = wrapper.get('[data-triage-example="checkout-error"]')

    await example.trigger('click')

    expect(wrapper.get('#triage-ticket-text').element.value).toContain('checkout')
    expect(wrapper.get('#triage-context').element.value).toContain('Fictional')
    expect(wrapper.get('#triage-priority').element.value).toBe('High')
    expect(example.attributes('aria-pressed')).toBe('true')
  })

  it('blocks empty submissions with an accessible validation error', async () => {
    const wrapper = mount(TicketTriageSection)

    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(globalThis.fetch).not.toHaveBeenCalled()
    expect(wrapper.get('#triage-ticket-error').attributes('role')).toBe('alert')
    expect(wrapper.get('#triage-ticket-error').text()).toContain('Enter an issue description')
    expect(wrapper.get('#triage-ticket-text').attributes('aria-invalid')).toBe('true')
  })

  it('submits the request, shows loading, and renders the AI result', async () => {
    let resolveRequest
    globalThis.fetch.mockReturnValue(new Promise((resolve) => {
      resolveRequest = resolve
    }))

    const wrapper = mount(TicketTriageSection, { attachTo: document.body })
    await wrapper.get('#triage-ticket-text').setValue('The checkout page fails for a customer.')
    await wrapper.get('#triage-context').setValue('Fictional example — online store')
    await wrapper.get('#triage-priority').setValue('High')
    await wrapper.get('form').trigger('submit')

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    const [url, options] = globalThis.fetch.mock.calls[0]
    expect(url).toBe(`${API_BASE_URL}/api/TicketTriage/analyze`)
    expect(options.method).toBe('POST')
    expect(options.headers).toEqual({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
    expect(JSON.parse(options.body)).toEqual({
      ticketText: 'The checkout page fails for a customer.',
      context: 'Fictional example — online store',
      requestedPriority: 'High'
    })

    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('.triage__state--loading').text()).toContain('Analyzing')

    resolveRequest(jsonResponse(successResponse))
    await flushPromises()

    const result = wrapper.get('.triage__result')
    expect(result.text()).toContain('Suggested triage')
    expect(result.text()).toContain('Bug')
    expect(result.text()).toContain('Urgent')
    expect(result.text()).toContain(successResponse.explanation)
    expect(result.text()).toContain(successResponse.suggestedReply)
    expect(result.text()).toContain('Human escalation recommended')
    expect(result.text()).toContain('AI-generated suggestion')
    expect(result.text()).toContain('human review')
    expect(wrapper.get('#triage-result-title').attributes('tabindex')).toBe('-1')
    expect(document.activeElement).toBe(wrapper.get('#triage-result-title').element)
  })

  it('shows a network error when the API cannot be reached', async () => {
    globalThis.fetch.mockRejectedValue(new TypeError('Failed to fetch'))
    const wrapper = mount(TicketTriageSection)

    await wrapper.get('#triage-ticket-text').setValue('The checkout page fails for a customer.')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const error = wrapper.get('.triage__state--error')
    expect(error.attributes('role')).toBe('alert')
    expect(error.text()).toContain('Could not reach the triage service')
    expect(wrapper.find('.triage__result').exists()).toBe(false)
  })

  it('shows the safe API error detail and error code', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse({
      title: 'AI provider quota exceeded.',
      detail: 'The AI provider quota has been exhausted. Please try again later.',
      code: 'ai_provider_rate_limited'
    }, { ok: false, status: 503 }))

    const wrapper = mount(TicketTriageSection)
    await wrapper.get('#triage-ticket-text').setValue('The checkout page fails for a customer.')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const error = wrapper.get('.triage__state--error')
    expect(error.attributes('role')).toBe('alert')
    expect(error.text()).toContain('The AI provider quota has been exhausted')
    expect(error.text()).toContain('ai_provider_rate_limited')
  })
})
