<template>
  <section class="section" id="experience">
    <div class="section-header">
      <p class="section-tag">My Journey</p>
      <h2 class="section-title">Work Experience</h2>
      <p class="section-description">
        A timeline of my professional career and the valuable experiences I've gained.
      </p>
    </div>
    <div class="experience-timeline">
      <div class="experience-item" v-for="job in data.experience" :key="job.title">
        <div class="experience-header">
          <div>
            <h3 class="experience-title">{{ job.title }}</h3>
            <p class="experience-company">{{ job.company }}</p>
          </div>
          <span class="experience-period">{{ job.period }}</span>
        </div>
        <p class="experience-description">{{ job.description }}</p>
        <ul class="experience-list">
          <li v-for="highlight in job.highlights" :key="highlight">{{ highlight }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from '@/data/portfolio'

const data = portfolioData
</script>
