import { nextTick, onMounted, onUnmounted, ref } from 'vue'

export function useSectionVisibility(id) {
  const isInView = ref(false)
  let observer = null

  onMounted(async () => {
    if (typeof IntersectionObserver === 'undefined') return

    await nextTick()
    const element = document.getElementById(id)
    if (!element) return

    observer = new IntersectionObserver((entries) => {
      isInView.value = entries.some((entry) => entry.isIntersecting)
    }, {
      threshold: 0.01
    })

    observer.observe(element)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return {
    isInView
  }
}
