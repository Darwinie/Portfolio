import { ref, watch, onMounted } from 'vue'

export function useCounterAnimation(targetValue, duration = 2000, suffix = '') {
  const currentValue = ref(0)
  const hasAnimated = ref(false)
  let observer = null

  const animate = () => {
    if (hasAnimated.value) return
    
    const start = 0
    const end = parseFloat(targetValue)
    const startTime = performance.now()

    const update = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased
      
      currentValue.value = Number.isInteger(end) ? Math.round(current) : current.toFixed(0)

      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        currentValue.value = end
        hasAnimated.value = true
      }
    }

    requestAnimationFrame(update)
  }

  const setupObserver = (element) => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate()
          observer.unobserve(element)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(element)
  }

  onMounted(() => {
    // Will be called by the component with the element ref
  })

  return { currentValue, animate, setupObserver, hasAnimated }
}
