<template>
  <section class="hero" id="home">
    <div class="hero-bg">
      <div class="hero-particles">
        <div class="particle" v-for="n in 20" :key="n" :style="particleStyle(n)"></div>
      </div>
    </div>
    <div class="hero-content">
      <p class="greeting fade-in-up">👋 {{ data.personal.greeting }}</p>
      <h1 class="hero-title fade-in-up fade-in-up-delay-1">
        {{ data.personal.name }}<br>
        <span class="title-gradient typing-container">
          <span class="typed-text">{{ currentText }}</span>
          <span class="cursor" :class="{ 'typing': currentText.length < maxTitleLength }">|</span>
        </span>
      </h1>
      <p class="hero-description fade-in-up fade-in-up-delay-2">
        {{ data.personal.description }}
      </p>
      <div class="hero-buttons fade-in-up fade-in-up-delay-3">
        <a href="#projects" class="btn btn-primary">
          <span class="btn-icon">🚀</span> View My Work
        </a>
        <a href="#contact" class="btn btn-secondary">
          <span class="btn-icon">💬</span> Get In Touch
        </a>
        <a href="/Resume_LubuganDarwin.pdf" class="btn btn-outline" download>
          <span class="btn-icon">📄</span> Download Resume
        </a>
      </div>
      <div class="hero-stats fade-in-up fade-in-up-delay-3">
        <div class="stat-item" v-for="(stat, index) in data.stats" :key="stat.label">
          <div class="stat-number">
            <span>{{ counterValues[index] }}</span>
            <span class="stat-suffix">{{ stat.suffix }}</span>
          </div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from '@/data/portfolio'
import { useTypingAnimation } from '@/composables/useTypingAnimation'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const data = portfolioData

const maxTitleLength = computed(() => {
  return Math.max(...data.personal.typingTitles.map(t => t.length))
})

const { currentText } = useTypingAnimation(
  data.personal.typingTitles,
  100,
  50,
  2000
)

// Counter animation - all in one place, no composable misuse
const counterValues = ref(data.stats.map(() => 0))
const hasAnimated = ref(false)
let observer = null

const animateCounters = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  data.stats.forEach((stat, index) => {
    const target = parseInt(stat.number)
    const duration = 2000
    const startTime = performance.now()

    const update = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      counterValues.value[index] = Math.round(target * eased)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        counterValues.value[index] = target
      }
    }

    requestAnimationFrame(update)
  })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters()
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )

  const statsEl = document.querySelector('.hero-stats')
  if (statsEl) {
    observer.observe(statsEl)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const particleStyle = (n) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 10 + 10
  const opacity = Math.random() * 0.3 + 0.1

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity
  }
}
</script>
