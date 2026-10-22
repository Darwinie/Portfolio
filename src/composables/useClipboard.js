import { onUnmounted, ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  let resetTimer = null

  const markCopied = () => {
    copied.value = true
    window.clearTimeout(resetTimer)
    resetTimer = window.setTimeout(() => {
      copied.value = false
    }, 2000)
  }

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()

    let succeeded = false
    try {
      succeeded = document.execCommand('copy')
    } catch {
      succeeded = false
    }

    document.body.removeChild(textarea)
    return succeeded
  }

  const copy = async (text) => {
    let succeeded = false

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text)
        succeeded = true
      } catch {
        succeeded = false
      }
    }

    if (!succeeded) {
      succeeded = fallbackCopy(text)
    }

    if (succeeded) {
      markCopied()
    }
  }

  onUnmounted(() => {
    window.clearTimeout(resetTimer)
  })

  return {
    copied,
    copy
  }
}
