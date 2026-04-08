import { ref, onMounted, onUnmounted } from 'vue'

export function useTypingAnimation(titles = [], typingSpeed = 100, deletingSpeed = 50, pauseDuration = 2000) {
  const currentText = ref('')
  const currentIndex = ref(0)
  const isDeleting = ref(false)
  const isPaused = ref(false)
  let timeout = null

  const type = () => {
    const title = titles[currentIndex.value]
    if (!title) return

    if (isPaused.value) {
      isPaused.value = false
      isDeleting.value = true
      timeout = setTimeout(type, deletingSpeed)
      return
    }

    if (isDeleting.value) {
      currentText.value = title.substring(0, currentText.value.length - 1)
      
      if (currentText.value === '') {
        isDeleting.value = false
        currentIndex.value = (currentIndex.value + 1) % titles.length
        timeout = setTimeout(type, typingSpeed)
      } else {
        timeout = setTimeout(type, deletingSpeed)
      }
    } else {
      currentText.value = title.substring(0, currentText.value.length + 1)
      
      if (currentText.value === title) {
        isPaused.value = true
        timeout = setTimeout(type, pauseDuration)
      } else {
        timeout = setTimeout(type, typingSpeed)
      }
    }
  }

  onMounted(() => {
    if (titles.length > 0) {
      timeout = setTimeout(type, typingSpeed)
    }
  })

  onUnmounted(() => {
    if (timeout) clearTimeout(timeout)
  })

  return { currentText }
}
