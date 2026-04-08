import { ref } from 'vue'

export function useContactForm() {
  const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const reset = () => {
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  }

  const submit = () => {
    alert('Thank you for your message! I will get back to you soon.')
    reset()
  }

  return {
    formData,
    reset,
    submit
  }
}
