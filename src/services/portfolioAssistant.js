import { API_BASE_URL } from '@/config/api'

const CHAT_ENDPOINT = `${API_BASE_URL}/api/PortfolioAssistant/chat`

export const MAX_HISTORY_MESSAGES = 10
export const MAX_HISTORY_CHARACTERS = 8000

export function buildConversationHistory(messages) {
  if (!Array.isArray(messages)) return []

  const eligible = messages.filter((message) => (
    message
    && (message.role === 'user' || message.role === 'assistant')
    && hasText(message.content)
  ))

  const history = []
  let totalCharacters = 0

  for (let index = eligible.length - 1; index >= 0; index -= 1) {
    if (history.length >= MAX_HISTORY_MESSAGES) break

    const message = eligible[index]
    const content = message.content.trim()

    if (totalCharacters + content.length > MAX_HISTORY_CHARACTERS) break

    history.unshift({ role: message.role, content })
    totalCharacters += content.length
  }

  return history
}

export class PortfolioAssistantError extends Error {
  constructor(message, { kind = 'api', status, code, cause } = {}) {
    super(message)
    this.name = 'PortfolioAssistantError'
    this.kind = kind
    this.status = status
    this.code = code

    if (cause) {
      this.cause = cause
    }
  }
}

const hasText = (value) => typeof value === 'string' && value.trim().length > 0

const isAssistantResponse = (value) => (
  Boolean(value)
  && typeof value === 'object'
  && hasText(value.answer)
  && typeof value.foundInKnowledgeBase === 'boolean'
  && (value.disclaimer === undefined || typeof value.disclaimer === 'string')
)

const readProblemDetails = async (response) => {
  try {
    const problem = await response.json()
    return problem && typeof problem === 'object' ? problem : null
  } catch {
    return null
  }
}

export async function chatWithPortfolioAssistant(payload, { signal } = {}) {
  let response

  try {
    response = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload),
      signal
    })
  } catch (cause) {
    if (cause?.name === 'AbortError') {
      throw cause
    }

    throw new PortfolioAssistantError(
      'Could not reach the portfolio assistant. Check that the API is running and try again.',
      { kind: 'network', cause }
    )
  }

  if (!response.ok) {
    const problem = await readProblemDetails(response)
    const detail = typeof problem?.detail === 'string' ? problem.detail : ''
    const title = typeof problem?.title === 'string' ? problem.title : ''
    const code = typeof problem?.code === 'string' ? problem.code : undefined

    throw new PortfolioAssistantError(
      detail || title || `The portfolio assistant returned an error (HTTP ${response.status}).`,
      { kind: 'api', status: response.status, code }
    )
  }

  let result

  try {
    result = await response.json()
  } catch (cause) {
    throw new PortfolioAssistantError(
      'The portfolio assistant returned an unreadable response.',
      { kind: 'invalid-response', status: response.status, cause }
    )
  }

  if (!isAssistantResponse(result)) {
    throw new PortfolioAssistantError(
      'The portfolio assistant returned an incomplete answer.',
      { kind: 'invalid-response', status: response.status }
    )
  }

  return result
}
