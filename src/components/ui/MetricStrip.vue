<template>
  <dl class="metric-strip">
    <div v-for="metric in metrics" :key="metric.label">
      <dt>{{ metric.value }}</dt>
      <dd>
        <span class="metric-strip__label">{{ metric.label }}</span>
        <span class="metric-strip__detail">{{ metric.detail }}</span>
      </dd>
    </div>
  </dl>
</template>

<script setup>
defineProps({
  metrics: {
    type: Array,
    required: true
  }
})
</script>
