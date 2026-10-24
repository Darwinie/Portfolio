<template>
  <section id="assistant" class="section assistant" aria-labelledby="assistant-title">
    <div class="container">
      <SectionHeading
        id="assistant-title"
        eyebrow="AI representative / Live"
        :title="assistantIntro.heading"
      />

      <div class="assistant__intro">
        <p>{{ assistantIntro.description }}</p>
        <p class="assistant__intro-note">
          <LockKeyhole aria-hidden="true" />
          Requests go through the API. Gemini credentials stay on the server and are
          never sent to this browser.
        </p>
      </div>

      <div class="assistant__layout">
        <aside class="assistant__sidebar" aria-labelledby="assistant-suggestions-title">
          <h3 id="assistant-suggestions-title">Suggested recruiter questions</h3>
          <p class="assistant__sidebar-copy">
            Start with a prompt, or write your own question about Darwin’s background.
          </p>

          <ul class="assistant__suggestions">
            <li v-for="question in suggestedQuestions" :key="question">
              <button
                type="button"
                class="assistant__suggestion"
                :disabled="isLoading"
                @click="askSuggestion(question)"
              >
                <span>{{ question }}</span>
                <ArrowUpRight aria-hidden="true" />
              </button>
            </li>
          </ul>

          <div class="assistant__sidebar-note">
            <ShieldCheck aria-hidden="true" />
            <div>
              <h4>Grounded in the portfolio</h4>
              <p>
                Answers use only the approved portfolio knowledge source. If the
                source does not cover a question, the assistant will say so.
              </p>
            </div>
          </div>
        </aside>

        <div
          class="assistant__chat"
          :aria-busy="isLoading ? 'true' : 'false'"
        >
          <div class="assistant__chat-topline">
            <span class="assistant__badge">
              <Bot aria-hidden="true" />
              AI portfolio assistant
            </span>
            <button
              type="button"
              class="assistant__reset"
              :disabled="!hasConversation"
              @click="reset"
            >
              <RotateCcw aria-hidden="true" />
              Reset conversation
            </button>
          </div>

          <div
            ref="messagesRef"
            class="assistant__messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Conversation with the AI portfolio assistant"
            tabindex="0"
          >
            <div v-if="messages.length === 0" class="assistant__empty">
              <MessageCircle class="assistant__empty-icon" aria-hidden="true" />
              <h3>Start a conversation</h3>
              <p>
                Ask about Darwin’s experience, technical skills, projects, education,
                certifications, or availability.
              </p>
              <p class="assistant__empty-note">
                Chat history stays in this browser session and is cleared when you
                reset the conversation.
              </p>
            </div>

            <ol v-else class="assistant__message-list">
              <li
                v-for="message in messages"
                :key="message.id"
                class="assistant__message"
                :class="`assistant__message--${message.role}`"
              >
                <p class="assistant__message-role">
                  {{ message.role === 'user' ? 'You' : 'AI assistant' }}
                </p>
                <div class="assistant__bubble">
                  <p>{{ message.content }}</p>
                  <p
                    v-if="message.role === 'assistant' && message.foundInKnowledgeBase === false"
                    class="assistant__not-found"
                  >
                    This answer is outside the portfolio knowledge base.
                  </p>
                </div>
              </li>

              <li v-if="isLoading" class="assistant__message assistant__message--assistant">
                <p class="assistant__message-role">AI assistant</p>
                <div class="assistant__bubble assistant__bubble--typing" role="status">
                  <LoaderCircle class="assistant__spinner" aria-hidden="true" />
                  <span>Looking through Darwin’s portfolio…</span>
                </div>
              </li>
            </ol>
          </div>

          <div v-if="error" class="assistant__error" role="alert">
            <TriangleAlert class="assistant__error-icon" aria-hidden="true" />
            <div>
              <h4>{{ error.title }}</h4>
              <p>{{ error.message }}</p>
              <p v-if="error.code" class="assistant__error-meta">
                Error code: <code>{{ error.code }}</code>
              </p>
              <p v-else-if="error.status" class="assistant__error-meta">
                HTTP status: {{ error.status }}
              </p>
              <p class="assistant__error-note">
                Your conversation stays here, so you can try again.
              </p>
            </div>
          </div>

          <form class="assistant__composer" novalidate @submit.prevent="submit">
            <div class="assistant__field">
              <label for="assistant-question">Ask about Darwin</label>
              <p id="assistant-question-hint" class="assistant__hint">
                Enter to send. Use Shift+Enter for a new line.
              </p>
              <textarea
                id="assistant-question"
                ref="questionFieldRef"
                v-model="question"
                name="question"
                rows="3"
                maxlength="2000"
                required
                aria-required="true"
                :aria-invalid="questionError ? 'true' : 'false'"
                :aria-describedby="questionError
                  ? 'assistant-question-hint assistant-question-count assistant-question-error'
                  : 'assistant-question-hint assistant-question-count'"
                placeholder="e.g. What automation experience does Darwin have?"
                @input="handleInput"
                @keydown.enter.exact="handleEnter"
              />
              <div class="assistant__field-meta">
                <p id="assistant-question-count" class="assistant__count">
                  {{ question.length.toLocaleString() }} / 2,000 characters
                </p>
                <p
                  v-if="questionError"
                  id="assistant-question-error"
                  class="assistant__field-error"
                  role="alert"
                >
                  {{ questionError }}
                </p>
              </div>
            </div>

            <div class="assistant__actions">
              <button
                class="button button--ink assistant__send"
                type="submit"
                :disabled="isLoading"
                :aria-busy="isLoading ? 'true' : 'false'"
              >
                <LoaderCircle
                  v-if="isLoading"
                  class="assistant__spinner"
                  aria-hidden="true"
                />
                <Send v-else aria-hidden="true" />
                <span>{{ isLoading ? 'Thinking…' : 'Send question' }}</span>
              </button>
              <p class="assistant__disclaimer">
                <TriangleAlert aria-hidden="true" />
                AI-generated answers may need confirmation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref } from 'vue'
import {
  ArrowUpRight,
  Bot,
  LoaderCircle,
  LockKeyhole,
  MessageCircle,
  RotateCcw,
  Send,
  ShieldCheck,
  TriangleAlert
} from 'lucide-vue-next'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { assistantIntro, suggestedQuestions } from '@/data/portfolioAssistant'
import {
  buildConversationHistory,
  chatWithPortfolioAssistant
} from '@/services/portfolioAssistant'

const MAX_QUESTION_CHARS = 2000

const question = ref('')
const questionError = ref('')
const error = ref(null)
const isLoading = ref(false)
const messages = ref([])
const messagesRef = ref(null)
const questionFieldRef = ref(null)

let activeController = null
let nextMessageId = 0

const hasConversation = computed(() => messages.value.length > 0 || isLoading.value)

const createId = () => `assistant-message-${++nextMessageId}`

const handleInput = () => {
  questionError.value = ''
}

const handleEnter = (event) => {
  if (event.isComposing) return
  event.preventDefault()
  submit()
}

const askSuggestion = (suggestion) => {
  if (isLoading.value) return
  question.value = suggestion
  submit()
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

const submit = async () => {
  if (isLoading.value) return

  const trimmed = question.value.trim()

  if (!trimmed) {
    questionError.value = 'Enter a question before sending.'
    error.value = null
    await nextTick()
    questionFieldRef.value?.focus()
    return
  }

  if (trimmed.length > MAX_QUESTION_CHARS) {
    questionError.value = `Keep your question to ${MAX_QUESTION_CHARS.toLocaleString()} characters or fewer.`
    await nextTick()
    questionFieldRef.value?.focus()
    return
  }

  const history = buildConversationHistory(messages.value)

  messages.value.push({
    id: createId(),
    role: 'user',
    content: trimmed
  })

  question.value = ''
  questionError.value = ''
  error.value = null
  isLoading.value = true
  await scrollToBottom()

  const controller = new AbortController()
  activeController = controller

  try {
    const response = await chatWithPortfolioAssistant(
      { question: trimmed, history },
      { signal: controller.signal }
    )

    if (controller.signal.aborted) return

    messages.value.push({
      id: createId(),
      role: 'assistant',
      content: response.answer,
      foundInKnowledgeBase: response.foundInKnowledgeBase
    })
  } catch (reason) {
    if (reason?.name === 'AbortError' || controller.signal.aborted) return

    error.value = {
      title: reason?.kind === 'network'
        ? 'Could not reach the portfolio assistant'
        : reason?.kind === 'invalid-response'
          ? 'The portfolio assistant returned an unexpected response'
          : 'The portfolio assistant could not complete the request',
      message: reason?.message || 'The portfolio assistant request failed.',
      code: reason?.code,
      status: reason?.status
    }
  } finally {
    if (activeController === controller) {
      isLoading.value = false
      activeController = null
      await scrollToBottom()
      questionFieldRef.value?.focus()
    }
  }
}

const reset = async () => {
  activeController?.abort()
  activeController = null
  messages.value = []
  question.value = ''
  questionError.value = ''
  error.value = null
  isLoading.value = false
  await nextTick()
  questionFieldRef.value?.focus()
}

onUnmounted(() => {
  activeController?.abort()
  activeController = null
})
</script>
