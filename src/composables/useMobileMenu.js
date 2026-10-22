import { onMounted, onUnmounted, ref, watch } from 'vue'

export function useMobileMenu() {
  const isOpen = ref(false)
  let previousOverflow = ''

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const close = () => {
    isOpen.value = false
  }

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      close()
    }
  }

  watch(isOpen, (open) => {
    if (typeof document === 'undefined') return

    if (open) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow
    }
  })

  onMounted(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', handleKeydown)
    }
  })

  onUnmounted(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', handleKeydown)
      document.body.style.overflow = previousOverflow
    }
  })

  return {
    isOpen,
    toggle,
    close
  }
}
