<template>
  <nav class="navbar" :class="{ 'scrolled': isScrolled }">
    <div class="nav-container">
      <a href="#" class="logo">{{ data.initials }}</a>
      <ul class="nav-links">
        <li v-for="link in data.navLinks" :key="link.href">
          <a :href="link.href">{{ link.label }}</a>
        </li>
        <li>
          <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <span class="theme-icon">{{ isDark ? '☀️' : '🌙' }}</span>
          </button>
        </li>
      </ul>
      <button class="mobile-menu-btn" @click="toggle">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useMobileMenu } from '@/composables'
import { useTheme } from '@/composables/useTheme'
import { portfolioData } from '@/data/portfolio'
import { ref, onMounted, onUnmounted } from 'vue'

const data = portfolioData
const { toggle } = useMobileMenu()
const { isDark, toggleTheme } = useTheme()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
