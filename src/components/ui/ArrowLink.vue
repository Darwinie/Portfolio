<template>
  <a
    :href="href"
    class="arrow-link"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noreferrer' : undefined"
  >
    <span>{{ label }}</span>
    <ArrowUpRight aria-hidden="true" />
  </a>
</template>

<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

defineProps({
  href: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  external: {
    type: Boolean,
    default: false
  }
})
</script>
