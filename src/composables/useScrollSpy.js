import { nextTick, onMounted, onUnmounted, ref } from 'vue'

export function useScrollSpy(ids) {
  const activeSection = ref(ids[0] ?? '')
  let observer = null

  onMounted(async () => {
    if (typeof IntersectionObserver === 'undefined') return

    await nextTick()
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!elements.length) return

    observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
      if (!visible.length) return

      const current = visible.reduce((best, entry) => (
        entry.intersectionRatio >= best.intersectionRatio ? entry : best
      ))

      activeSection.value = current.target.id
    }, {
      rootMargin: '-18% 0px -58% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 1]
    })

    elements.forEach((element) => observer.observe(element))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    activeSection
  }
}
