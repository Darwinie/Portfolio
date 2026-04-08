import { ref } from 'vue'

export function useMobileMenu() {
  const isOpen = ref(false)

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const close = () => {
    isOpen.value = false
  }

  return {
    isOpen,
    toggle,
    close
  }
}
