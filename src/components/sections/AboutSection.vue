<template>
  <section class="section" id="about">
    <div class="section-header">
      <p class="section-tag">Get To Know</p>
      <h2 class="section-title">About Me</h2>
      <p class="section-description">
        Here you'll find more information about me, what I do, and my current skills.
      </p>
    </div>
    <div class="about-grid">
      <div class="about-image-wrapper">
        <div class="about-image">
          <div class="about-image-content">👨‍💻</div>
        </div>
      </div>
      <div class="about-content">
        <h3>{{ data.about.title }}</h3>
        <p>{{ data.about.bio }}</p>
        <p>{{ data.about.secondaryBio }}</p>
        <div class="about-highlights">
          <div class="highlight-item" v-for="item in data.about.highlights" :key="item.label">
            <div class="highlight-icon">{{ item.icon }}</div>
            <div class="highlight-text">
              <strong>{{ item.label }}</strong>
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from '@/data/portfolio'

const data = portfolioData
</script>
