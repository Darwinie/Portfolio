<template>
  <a
    class="assistant-launcher"
    :class="{ 'assistant-launcher--hidden': isInView }"
    href="#assistant"
    aria-label="Ask my AI assistant to find out more about Darwin"
  >
    <span class="assistant-launcher__icon" aria-hidden="true">
      <Bot />
      <span class="assistant-launcher__status"></span>
    </span>
    <span class="assistant-launcher__copy">
      <span class="assistant-launcher__label">Ask my AI assistant</span>
      <span class="assistant-launcher__hint">Find out more about me</span>
    </span>
    <ArrowUpRight class="assistant-launcher__arrow" aria-hidden="true" />
  </a>
</template>

<script setup>
import { ArrowUpRight, Bot } from 'lucide-vue-next'
import { useSectionVisibility } from '@/composables/useSectionVisibility'

const { isInView } = useSectionVisibility('assistant')
</script>
