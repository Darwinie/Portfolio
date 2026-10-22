<template>
  <ol class="pipeline">
    <li v-for="(step, index) in steps" :key="step">
      <span class="pipeline__number">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="pipeline__label">{{ step }}</span>
    </li>
  </ol>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  }
})
</script>
