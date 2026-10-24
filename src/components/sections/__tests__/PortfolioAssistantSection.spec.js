import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import PortfolioAssistantSection from '../PortfolioAssistantSection.vue'
import { suggestedQuestions } from '@/data/portfolioAssistant'
import { API_BASE_URL } from '@/config/api'

const successResponse = {
  answer: 'Darwin currently works as a Software Developer at NOUS AV IT Solutions.',
  foundInKnowledgeBase: true,
  disclaimer: 'AI-generated answer based on the portfolio knowledge base.'
}

const jsonResponse = (body, { ok = true, status = 200 } = {}) => ({
  ok,
  status,
  json: vi.fn().mockResolvedValue(body)
})

describe('PortfolioAssistantSection', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the chat shell, suggestions, accessible input, and AI disclaimer', () => {
    const wrapper = mount(PortfolioAssistantSection)

    expect(wrapper.get('#assistant').exists()).toBe(true)
    expect(wrapper.get('#assistant-title').text()).toBe('Ask My AI Portfolio Assistant')
    expect(wrapper.text()).toContain('grounded in a curated portfolio knowledge base')
    expect(wrapper.get('label[for="assistant-question"]').text()).toContain('Ask about Darwin')
    expect(wrapper.get('#assistant-question').attributes('required')).toBeDefined()
    expect(wrapper.get('#assistant-question').attributes('maxlength')).toBe('2000')
    expect(wrapper.findAll('.assistant__suggestion')).toHaveLength(suggestedQuestions.length)
    expect(wrapper.get('.assistant__suggestion').text()).toContain('current role')
    expect(wrapper.get('.assistant__messages').attributes('role')).toBe('log')
    expect(wrapper.get('.assistant__messages').attributes('aria-live')).toBe('polite')
    expect(wrapper.get('.assistant__empty').text()).toContain('Start a conversation')
    expect(wrapper.get('.assistant__reset').attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('AI-generated answers may need confirmation')
  })

  it('blocks empty submissions with an accessible validation error', async () => {
    const wrapper = mount(PortfolioAssistantSection, { attachTo: document.body })

    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(globalThis.fetch).not.toHaveBeenCalled()
    expect(wrapper.get('#assistant-question-error').attributes('role')).toBe('alert')
    expect(wrapper.get('#assistant-question-error').text()).toContain('Enter a question')
    expect(wrapper.get('#assistant-question').attributes('aria-invalid')).toBe('true')
    expect(document.activeElement).toBe(wrapper.get('#assistant-question').element)
  })

  it('submits a question, shows loading, and renders the grounded answer', async () => {
    let resolveRequest
    globalThis.fetch.mockReturnValue(new Promise((resolve) => {
      resolveRequest = resolve
    }))

    const wrapper = mount(PortfolioAssistantSection, { attachTo: document.body })
    await wrapper.get('#assistant-question').setValue('Where does Darwin currently work?')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    const [url, options] = globalThis.fetch.mock.calls[0]
    expect(url).toBe(`${API_BASE_URL}/api/PortfolioAssistant/chat`)
    expect(options.method).toBe('POST')
    expect(JSON.parse(options.body)).toEqual({
      question: 'Where does Darwin currently work?',
      history: []
    })

    expect(wrapper.get('.assistant__chat').attributes('aria-busy')).toBe('true')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
    expect(wrapper.get('button[type="submit"]').text()).toContain('Thinking')
    expect(wrapper.get('.assistant__bubble--typing').text()).toContain('Looking through')

    resolveRequest(jsonResponse(successResponse))
    await flushPromises()

    expect(wrapper.get('.assistant__chat').attributes('aria-busy')).toBe('false')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeUndefined()
    expect(wrapper.get('.assistant__message--user').text()).toContain('Where does Darwin currently work?')
    expect(wrapper.get('.assistant__message--assistant').text()).toContain(successResponse.answer)
    expect(wrapper.get('.assistant__reset').attributes('disabled')).toBeUndefined()
    expect(wrapper.get('#assistant-question').element.value).toBe('')
    expect(document.activeElement).toBe(wrapper.get('#assistant-question').element)
  })

  it('submits a suggested recruiter question', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse(successResponse))
    const wrapper = mount(PortfolioAssistantSection)

    await wrapper.findAll('.assistant__suggestion')[0].trigger('click')
    await flushPromises()

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    expect(JSON.parse(globalThis.fetch.mock.calls[0][1].body)).toEqual({
      question: suggestedQuestions[0],
      history: []
    })
    expect(wrapper.get('.assistant__message--assistant').text()).toContain(successResponse.answer)
  })

  it('sends on Enter and leaves Shift+Enter for a new line', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse(successResponse))
    const wrapper = mount(PortfolioAssistantSection)
    const input = wrapper.get('#assistant-question')

    await input.setValue('What are Darwin’s strongest skills?')
    await input.trigger('keydown', { key: 'Enter', shiftKey: true })
    expect(globalThis.fetch).not.toHaveBeenCalled()

    await input.trigger('keydown', { key: 'Enter' })
    await flushPromises()

    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })

  it('shows a network error without losing the conversation', async () => {
    globalThis.fetch.mockRejectedValue(new TypeError('Failed to fetch'))
    const wrapper = mount(PortfolioAssistantSection)

    await wrapper.get('#assistant-question').setValue('Tell me about Darwin’s projects.')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const error = wrapper.get('.assistant__error')
    expect(error.attributes('role')).toBe('alert')
    expect(error.text()).toContain('Could not reach the portfolio assistant')
    expect(wrapper.get('.assistant__message--user').text()).toContain('Tell me about Darwin’s projects.')
    expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeUndefined()
  })

  it('shows safe API error details and the error code', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse({
      title: 'AI provider quota exceeded.',
      detail: 'The AI provider quota has been exhausted. Please try again later.',
      code: 'ai_provider_rate_limited'
    }, { ok: false, status: 503 }))

    const wrapper = mount(PortfolioAssistantSection)
    await wrapper.get('#assistant-question').setValue('Tell me about Darwin.')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const error = wrapper.get('.assistant__error')
    expect(error.text()).toContain('The AI provider quota has been exhausted')
    expect(error.text()).toContain('ai_provider_rate_limited')
  })

  it('marks answers that fall outside the portfolio knowledge base', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse({
      ...successResponse,
      answer: 'I do not have that information in Darwin’s portfolio.',
      foundInKnowledgeBase: false
    }))

    const wrapper = mount(PortfolioAssistantSection)
    await wrapper.get('#assistant-question').setValue('What is Darwin’s favorite food?')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.get('.assistant__not-found').text()).toContain('outside the portfolio knowledge base')
  })

  it('does not repopulate a reset chat when an older response arrives late', async () => {
    let resolveRequest
    globalThis.fetch.mockReturnValue(new Promise((resolve) => {
      resolveRequest = resolve
    }))

    const wrapper = mount(PortfolioAssistantSection)
    await wrapper.get('#assistant-question').setValue('Tell me about Darwin.')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.get('.assistant__chat').attributes('aria-busy')).toBe('true')

    await wrapper.get('.assistant__reset').trigger('click')
    await flushPromises()

    expect(wrapper.get('.assistant__empty').exists()).toBe(true)
    expect(wrapper.get('.assistant__reset').attributes('disabled')).toBeDefined()

    resolveRequest(jsonResponse(successResponse))
    await flushPromises()

    expect(wrapper.get('.assistant__empty').exists()).toBe(true)
    expect(wrapper.find('.assistant__message--assistant').exists()).toBe(false)
  })

  it('sends prior conversation as bounded history and resets the chat', async () => {
    globalThis.fetch.mockResolvedValue(jsonResponse(successResponse))
    const wrapper = mount(PortfolioAssistantSection)

    await wrapper.get('#assistant-question').setValue('Where does Darwin work?')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    await wrapper.get('#assistant-question').setValue('What does he do there?')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    const secondPayload = JSON.parse(globalThis.fetch.mock.calls[1][1].body)
    expect(secondPayload.history).toEqual([
      { role: 'user', content: 'Where does Darwin work?' },
      { role: 'assistant', content: successResponse.answer }
    ])

    await wrapper.get('.assistant__reset').trigger('click')
    await flushPromises()

    expect(wrapper.find('.assistant__message--user').exists()).toBe(false)
    expect(wrapper.get('.assistant__empty').text()).toContain('Start a conversation')
    expect(wrapper.get('.assistant__reset').attributes('disabled')).toBeDefined()
    expect(wrapper.get('#assistant-question').element.value).toBe('')
  })
})
