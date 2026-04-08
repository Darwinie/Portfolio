import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const elementRefs = ref([])
  const observers = ref([])

  const observe = (el, options = {}) => {
    const {
      threshold = 0.1,
      rootMargin = '0px 0px -50px 0px',
      animationClass = 'animate-on-scroll'
    } = options

    if (!el) return

    el.classList.add(animationClass)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    observers.value.push(observer)
    elementRefs.value.push(el)
  }

  onUnmounted(() => {
    observers.value.forEach((observer) => observer.disconnect())
    observers.value = []
    elementRefs.value = []
  })

  return { observe }
}
