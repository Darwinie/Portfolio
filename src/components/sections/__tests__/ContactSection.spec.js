import { mount, flushPromises } from '@vue/test-utils'
import { vi } from 'vitest'
import ContactSection from '../ContactSection.vue'

it('renders real contact paths and copies the email', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText }
  })

  const wrapper = mount(ContactSection)
  expect(wrapper.get('#contact').exists()).toBe(true)
  expect(wrapper.get('a[href="mailto:lubugandarwin@gmail.com"]').exists()).toBe(true)
  expect(wrapper.get('a[href="https://github.com/Darwinie"]').exists()).toBe(true)
  expect(wrapper.get('a[href="https://www.linkedin.com/in/lubugandarwin05"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('Batangas, Philippines · GMT+8')
  expect(wrapper.find('form').exists()).toBe(false)

  await wrapper.get('button').trigger('click')
  await flushPromises()
  expect(writeText).toHaveBeenCalledWith('lubugandarwin@gmail.com')
  expect(wrapper.get('[role="status"]').text()).toContain('Copied')
})
