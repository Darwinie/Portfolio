<template>
  <section id="certifications" class="section" aria-labelledby="certifications-title">
    <div class="container">
      <SectionHeading
        id="certifications-title"
        eyebrow="Certifications"
        title="Certifications"
      />

      <ol class="certifications__list">
        <li
          v-for="(certification, index) in portfolio.certifications"
          :key="certification.name"
          class="certifications__item"
        >
          <span class="certifications__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="certifications__name">{{ certification.name }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { portfolio } from '@/data/portfolio'
</script>
