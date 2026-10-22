<template>
  <div class="section-heading">
    <p class="section-heading__eyebrow">{{ eyebrow }}</p>
    <h2 :id="id" class="section-heading__title">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: undefined
  }
})
</script>
