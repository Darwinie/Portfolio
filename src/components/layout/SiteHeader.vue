<template>
  <header ref="headerRef" class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="container site-header__inner">
      <a class="wordmark" href="#top">Darwin Lubugan</a>

      <nav class="site-nav" aria-label="Primary">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="site-nav__link"
          :aria-current="activeSection === item.id ? 'true' : undefined"
        >
          {{ item.label }}
        </a>
      </nav>

      <a class="site-header__resume" :href="portfolio.profile.resumeUrl" download>
        <Download aria-hidden="true" />
        <span>Resume</span>
      </a>

      <button
        ref="menuButton"
        class="menu-toggle"
        type="button"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isOpen ? 'true' : 'false'"
        aria-controls="mobile-menu"
        @click="toggle"
      >
        <X v-if="isOpen" aria-hidden="true" />
        <Menu v-else aria-hidden="true" />
      </button>
    </div>

    <div
      v-if="isOpen"
      id="mobile-menu"
      ref="panelRef"
      class="mobile-menu"
      @keydown="trapFocus"
    >
      <nav class="mobile-menu__nav" aria-label="Mobile">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="mobile-menu__link"
          @click="close"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="mobile-menu__meta">
        <a :href="portfolio.profile.resumeUrl" download @click="close">Resume</a>
        <a :href="`mailto:${portfolio.profile.email}`" @click="close">Email</a>
        <span>{{ portfolio.profile.location }} · {{ portfolio.profile.timezone }}</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Download, Menu, X } from 'lucide-vue-next'
import { portfolio } from '@/data/portfolio'
import { useMobileMenu } from '@/composables/useMobileMenu'
import { useScrollSpy } from '@/composables/useScrollSpy'

const navItems = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'AI demo', href: '#triage', id: 'triage' },
  { label: 'Ask AI', href: '#assistant', id: 'assistant' },
  { label: 'Contact', href: '#contact', id: 'contact' }
]

const { isOpen, toggle, close } = useMobileMenu()
const { activeSection } = useScrollSpy(['work', 'about', 'experience', 'triage', 'assistant', 'contact'])
const isScrolled = ref(false)
const headerRef = ref(null)
const menuButton = ref(null)
const panelRef = ref(null)

const focusableInPanel = () => (
  Array.from(panelRef.value?.querySelectorAll('a[href], button:not([disabled])') ?? [])
)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 24
}

const handleDocumentClick = (event) => {
  if (!isOpen.value) return

  const clickedInsideHeader = event.composedPath?.().includes(headerRef.value)
    || headerRef.value?.contains(event.target)

  if (!clickedInsideHeader) {
    close()
  }
}

const trapFocus = (event) => {
  if (event.key !== 'Tab' || !isOpen.value) return

  const focusable = focusableInPanel()
  if (!focusable.length) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

watch(isOpen, async (open) => {
  await nextTick()

  if (open) {
    focusableInPanel()[0]?.focus()
  } else {
    menuButton.value?.focus()
  }
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleDocumentClick)
})
</script>
