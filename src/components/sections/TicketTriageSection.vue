<template>
  <section id="triage" class="section triage" aria-labelledby="triage-title">
    <div class="container">
      <SectionHeading
        id="triage-title"
        eyebrow="AI demo / Live"
        title="AI-Powered Ticket Triage & System Integration"
      />

      <div class="triage__intro">
        <p>
          An interactive demo integrating Vue 3, ASP.NET Core Web API (.NET 10),
          and Google Gemini AI to analyze support tickets, categorize issues,
          recommend priorities, and generate suggested responses.
        </p>
        <p class="triage__intro-note">
          Requests go through the API. Gemini credentials stay on the server and are
          never sent to this browser.
        </p>
      </div>

      <div class="triage__grid">
        <form class="triage__form" novalidate @submit.prevent="submit">
          <fieldset class="triage__examples">
            <legend class="triage__legend">Fictional examples</legend>
            <p class="triage__examples-note">
              Select an example to fill the form, or write your own fictional issue.
            </p>

            <div class="triage__example-list">
              <button
                v-for="example in triageExamples"
                :key="example.id"
                type="button"
                class="triage__example"
                :class="{ 'triage__example--selected': selectedExampleId === example.id }"
                :data-triage-example="example.id"
                :aria-pressed="selectedExampleId === example.id ? 'true' : 'false'"
                @click="selectExample(example)"
              >
                <span class="triage__example-label">{{ example.label }}</span>
                <span class="triage__example-description">{{ example.description }}</span>
              </button>
            </div>
          </fieldset>

          <div class="triage__field">
            <label for="triage-ticket-text">Issue description</label>
            <p id="triage-ticket-hint" class="triage__hint">
              Describe the problem, request, or question. Use fictional details only.
            </p>
            <textarea
              id="triage-ticket-text"
              ref="ticketFieldRef"
              v-model="form.ticketText"
              name="ticketText"
              rows="7"
              maxlength="8000"
              required
              aria-required="true"
              :aria-invalid="ticketError ? 'true' : 'false'"
              :aria-describedby="ticketError
                ? 'triage-ticket-hint triage-ticket-count triage-ticket-error'
                : 'triage-ticket-hint triage-ticket-count'"
              placeholder="e.g. A customer cannot complete checkout and sees an error."
              @input="handleTicketInput"
            />
            <div class="triage__field-meta">
              <p id="triage-ticket-count" class="triage__count">
                {{ form.ticketText.length.toLocaleString() }} / 8,000 characters
              </p>
              <p
                v-if="ticketError"
                id="triage-ticket-error"
                class="triage__field-error"
                role="alert"
              >
                {{ ticketError }}
              </p>
            </div>
          </div>

          <div class="triage__field">
            <label for="triage-context">
              Additional context <span>(optional)</span>
            </label>
            <p id="triage-context-hint" class="triage__hint">
              Customer tier, product area, environment, or anything that changes urgency.
            </p>
            <textarea
              id="triage-context"
              v-model="form.context"
              name="context"
              rows="3"
              maxlength="2000"
              aria-describedby="triage-context-hint"
              placeholder="e.g. Production, premium customer, first report."
              @input="handleFieldInput"
            />
          </div>

          <div class="triage__field">
            <label for="triage-priority">
              Requested priority <span>(optional)</span>
            </label>
            <p id="triage-priority-hint" class="triage__hint">
              The priority stated in the ticket. The model may recommend a different one.
            </p>
            <select
              id="triage-priority"
              v-model="form.requestedPriority"
              name="requestedPriority"
              aria-describedby="triage-priority-hint"
              @change="handleFieldInput"
            >
              <option
                v-for="option in priorityOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="triage__actions">
            <button
              class="button button--ink triage__submit"
              type="submit"
              :disabled="isLoading"
              :aria-busy="isLoading ? 'true' : 'false'"
            >
              <LoaderCircle
                v-if="isLoading"
                class="triage__spinner"
                aria-hidden="true"
              />
              <Sparkles v-else aria-hidden="true" />
              <span>{{ isLoading ? 'Analyzing…' : 'Analyze ticket' }}</span>
            </button>
            <p class="triage__privacy">
              <LockKeyhole aria-hidden="true" />
              AI-generated suggestions require human review.
            </p>
          </div>
        </form>

        <div class="triage__output" role="region" aria-label="Triage result">
          <div
            v-if="isLoading"
            class="triage__state triage__state--loading"
            role="status"
          >
            <LoaderCircle class="triage__state-icon triage__spinner" aria-hidden="true" />
            <h3>Analyzing ticket…</h3>
            <p>Reading the issue and preparing a suggestion. This can take a few seconds.</p>
          </div>

          <div
            v-else-if="error"
            class="triage__state triage__state--error"
            role="alert"
          >
            <TriangleAlert class="triage__state-icon" aria-hidden="true" />
            <h3>{{ error.title }}</h3>
            <p>{{ error.message }}</p>
            <p v-if="error.code" class="triage__error-code">
              Error code: <code>{{ error.code }}</code>
            </p>
            <p v-else-if="error.status" class="triage__error-code">
              HTTP status: {{ error.status }}
            </p>
            <p class="triage__state-note">
              Your text stays in this form, so you can try again.
            </p>
          </div>

          <article v-else-if="result" class="triage__result">
            <div class="triage__result-topline">
              <span class="triage__result-badge">
                <Bot aria-hidden="true" />
                AI-generated suggestion
              </span>
              <span v-if="hasConfidence" class="triage__confidence">
                Model-estimated confidence: {{ result.confidenceScore }}%
              </span>
            </div>

            <h3 id="triage-result-title" ref="resultHeadingRef" tabindex="-1">
              Suggested triage
            </h3>

            <dl class="triage__result-meta">
              <div>
                <dt>Category</dt>
                <dd>{{ formatCategory(result.category) }}</dd>
              </div>
              <div>
                <dt>Recommended priority</dt>
                <dd>{{ result.adjustedPriority }}</dd>
              </div>
            </dl>

            <div
              class="triage__escalation"
              :class="{ 'triage__escalation--urgent': result.requiresUrgentCare }"
            >
              <component
                :is="result.requiresUrgentCare ? ShieldAlert : ShieldCheck"
                aria-hidden="true"
              />
              <div>
                <h4>
                  {{ result.requiresUrgentCare
                    ? 'Human escalation recommended'
                    : 'No urgent escalation flagged' }}
                </h4>
                <p>
                  {{ result.requiresUrgentCare
                    ? 'This ticket may need immediate human attention.'
                    : 'The model did not flag this ticket for urgent human intervention.' }}
                </p>
              </div>
            </div>

            <div class="triage__result-section">
              <h4>Why this classification</h4>
              <p>{{ result.explanation }}</p>
            </div>

            <div class="triage__result-section">
              <h4>Suggested reply</h4>
              <blockquote class="triage__reply">{{ result.suggestedReply }}</blockquote>
            </div>

            <p class="triage__disclaimer">
              <TriangleAlert aria-hidden="true" />
              <span>
                <strong>AI-generated suggestion.</strong>
                This requires human review before sending or acting on it.
              </span>
            </p>
          </article>

          <div v-else class="triage__state">
            <Sparkles class="triage__state-icon" aria-hidden="true" />
            <h3>Triage output</h3>
            <p>
              Submit an issue to see the category, priority, explanation, draft reply,
              and escalation recommendation.
            </p>
            <p class="triage__state-note">
              Only fictional examples are provided. Do not paste real customer data.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onUnmounted, reactive, ref } from 'vue'
import {
  Bot,
  LoaderCircle,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TriangleAlert
} from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import {
  formatCategory,
  priorityOptions,
  triageExamples
} from '@/data/ticketTriage'
import { analyzeTicket } from '@/services/ticketTriage'

const MAX_TICKET_CHARS = 8000

const form = reactive({
  ticketText: '',
  context: '',
  requestedPriority: ''
})

const isLoading = ref(false)
const result = ref(null)
const error = ref(null)
const ticketError = ref('')
const selectedExampleId = ref('')
const ticketFieldRef = ref(null)
const resultHeadingRef = ref(null)

let activeController = null

const hasConfidence = computed(() => Number.isInteger(result.value?.confidenceScore))

const handleTicketInput = () => {
  selectedExampleId.value = ''
  ticketError.value = ''
}

const handleFieldInput = () => {
  selectedExampleId.value = ''
}

const selectExample = (example) => {
  form.ticketText = example.ticketText
  form.context = example.context
  form.requestedPriority = example.requestedPriority
  selectedExampleId.value = example.id
  ticketError.value = ''
  error.value = null
  result.value = null
}

const submit = async () => {
  if (isLoading.value) return

  const ticketText = form.ticketText.trim()

  if (!ticketText) {
    ticketError.value = 'Enter an issue description before analyzing.'
    error.value = null
    result.value = null
    await nextTick()
    ticketFieldRef.value?.focus()
    return
  }

  if (ticketText.length > MAX_TICKET_CHARS) {
    ticketError.value = `Keep the issue description to ${MAX_TICKET_CHARS.toLocaleString()} characters or fewer.`
    await nextTick()
    ticketFieldRef.value?.focus()
    return
  }

  const payload = { ticketText }
  const context = form.context.trim()

  if (context) {
    payload.context = context
  }

  if (form.requestedPriority) {
    payload.requestedPriority = form.requestedPriority
  }

  ticketError.value = ''
  error.value = null
  result.value = null
  isLoading.value = true

  const controller = new AbortController()
  activeController = controller

  let nextResult

  try {
    nextResult = await analyzeTicket(payload, { signal: controller.signal })
  } catch (reason) {
    if (reason?.name === 'AbortError') return

    error.value = {
      title: reason?.kind === 'network'
        ? 'Could not reach the triage service'
        : reason?.kind === 'invalid-response'
          ? 'The triage service returned an unexpected response'
          : 'The triage service could not complete the request',
      message: reason?.message || 'The triage request failed.',
      code: reason?.code,
      status: reason?.status
    }
    return
  } finally {
    isLoading.value = false
    activeController = null
  }

  result.value = nextResult
  await nextTick()
  resultHeadingRef.value?.focus()
}

onUnmounted(() => {
  activeController?.abort()
})
</script>
