<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading id="experience-title" eyebrow="Experience" title="Experience" />

      <div class="experience__list">
        <article
          v-for="job in portfolio.experience"
          :key="`${job.company}-${job.period}`"
          class="experience__item"
        >
          <p class="experience__period">
            <time>{{ job.period }}</time>
          </p>

          <div>
            <h3 class="experience__role">{{ job.role }}</h3>
            <p class="experience__company">{{ job.company }}</p>
            <p class="experience__summary">{{ job.summary }}</p>
            <ul class="experience__highlights">
              <li
                v-for="highlight in job.highlights"
                :key="highlight"
                class="experience__highlight"
              >
                {{ highlight }}
              </li>
            </ul>
          </div>
        </article>
      </div>

      <div class="education">
        <span class="education__degree">{{ portfolio.education.degree }}</span>
        <span class="education__meta">
          {{ portfolio.education.school }} · {{ portfolio.education.period }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { portfolio } from '@/data/portfolio'
</script>
