import { API_BASE_URL } from '@/config/api'

const ANALYZE_ENDPOINT = `${API_BASE_URL}/api/TicketTriage/analyze`

const categories = new Set(['Bug', 'FeatureRequest', 'Question', 'Performance', 'General'])
const priorities = new Set(['Low', 'Medium', 'High', 'Urgent'])

export class TicketTriageError extends Error {
  constructor(message, { kind = 'api', status, code, cause } = {}) {
    super(message)
    this.name = 'TicketTriageError'
    this.kind = kind
    this.status = status
    this.code = code

    if (cause) {
      this.cause = cause
    }
  }
}

const hasText = (value) => typeof value === 'string' && value.trim().length > 0

const isTriageResponse = (value) => {
  if (!value || typeof value !== 'object') return false

  const confidenceIsValid = value.confidenceScore === null
    || value.confidenceScore === undefined
    || (Number.isInteger(value.confidenceScore)
      && value.confidenceScore >= 0
      && value.confidenceScore <= 100)

  return categories.has(value.category)
    && priorities.has(value.adjustedPriority)
    && hasText(value.suggestedReply)
    && hasText(value.explanation)
    && typeof value.requiresUrgentCare === 'boolean'
    && confidenceIsValid
}

const readProblemDetails = async (response) => {
  try {
    const problem = await response.json()
    return problem && typeof problem === 'object' ? problem : null
  } catch {
    return null
  }
}

export async function analyzeTicket(payload, { signal } = {}) {
  let response

  try {
    response = await fetch(ANALYZE_ENDPOINT, {
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

    throw new TicketTriageError(
      'Could not reach the triage service. Check that the API is running and try again.',
      { kind: 'network', cause }
    )
  }

  if (!response.ok) {
    const problem = await readProblemDetails(response)
    const detail = typeof problem?.detail === 'string' ? problem.detail : ''
    const title = typeof problem?.title === 'string' ? problem.title : ''
    const code = typeof problem?.code === 'string' ? problem.code : undefined

    throw new TicketTriageError(
      detail || title || `The triage service returned an error (HTTP ${response.status}).`,
      { kind: 'api', status: response.status, code }
    )
  }

  let result

  try {
    result = await response.json()
  } catch (cause) {
    throw new TicketTriageError(
      'The triage service returned an unreadable response.',
      { kind: 'invalid-response', status: response.status, cause }
    )
  }

  if (!isTriageResponse(result)) {
    throw new TicketTriageError(
      'The triage service returned an incomplete triage result.',
      { kind: 'invalid-response', status: response.status }
    )
  }

  return result
}
