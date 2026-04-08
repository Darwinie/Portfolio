<template>
  <section class="section" id="projects">
    <div class="section-header">
      <p class="section-tag">My Work</p>
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-description">
        Here are some of my recent projects that showcase my skills and experience.
      </p>
    </div>
    
    <div class="project-filters">
      <button 
        class="filter-btn" 
        :class="{ active: activeFilter === 'all' }"
        @click="activeFilter = 'all'"
      >
        All Projects
      </button>
      <button 
        class="filter-btn" 
        v-for="tag in allTags" 
        :key="tag"
        :class="{ active: activeFilter === tag }"
        @click="activeFilter = tag"
      >
        {{ tag }}
      </button>
    </div>

    <transition-group name="project" tag="div" class="projects-grid">
      <div 
        class="project-card" 
        v-for="project in filteredProjects" 
        :key="project.title"
      >
        <div class="project-image">
          <img 
            v-if="project.image" 
            :src="project.image" 
            :alt="project.title"
            class="project-screenshot"
            loading="lazy"
          >
          <div class="project-overlay">
            <a :href="project.demoUrl" class="project-link" title="View Demo" @click.stop>▶</a>
            <a :href="project.codeUrl" class="project-link" title="View Code" @click.stop>⌨</a>
          </div>
          <div class="project-impact" v-if="project.impact">
            <span class="impact-badge">{{ project.impact }}</span>
          </div>
        </div>
        <div class="project-content">
          <div class="project-tags">
            <span class="project-tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
          </div>
          <h3 class="project-title">{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
        </div>
      </div>
    </transition-group>
  </section>
</template>

<script setup>
import { portfolioData } from '@/data/portfolio'
import { ref, computed } from 'vue'

const data = portfolioData
const activeFilter = ref('all')

const allTags = computed(() => {
  const tags = new Set()
  data.projects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).slice(0, 8)
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return data.projects
  }
  return data.projects.filter(project => 
    project.tags.includes(activeFilter.value)
  )
})
</script>
