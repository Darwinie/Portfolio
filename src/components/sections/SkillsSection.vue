<template>
  <section class="section" id="skills">
    <div class="section-header">
      <p class="section-tag">What I Know</p>
      <h2 class="section-title">Skills & Technologies</h2>
      <p class="section-description">
        Here are the technologies and tools I work with to bring ideas to life.
      </p>
    </div>
    <div class="skills-grid">
      <div class="skill-card" v-for="skill in data.skills" :key="skill.title">
        <div class="skill-icon">{{ skill.icon }}</div>
        <h3>{{ skill.title }}</h3>
        <p>{{ skill.description }}</p>
        <div class="skill-tags">
          <span class="skill-tag" v-for="tag in skill.tags" :key="tag">{{ tag }}</span>
        </div>
        <div class="skill-proficiency">
          <div class="proficiency-bar">
            <div class="proficiency-fill" :style="{ width: skill.proficiency + '%' }">
              <span class="proficiency-text">{{ skill.proficiency }}%</span>
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
