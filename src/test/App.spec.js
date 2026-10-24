import { afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

afterEach(() => {
  vi.restoreAllMocks()
})

it('renders the new shell and removes the old sections', () => {
  const wrapper = mount(App, { attachTo: document.body })

  expect(wrapper.get('.skip-link').attributes('href')).toBe('#main')
  expect(wrapper.get('main').attributes('id')).toBe('main')
  expect(wrapper.get('h1').text()).toContain('I turn repetitive work into reliable systems')
  expect(wrapper.find('#work').exists()).toBe(true)
  expect(wrapper.find('#about').exists()).toBe(true)
  expect(wrapper.find('#experience').exists()).toBe(true)
  expect(wrapper.find('#certifications').exists()).toBe(true)
  expect(wrapper.find('#triage').exists()).toBe(true)
  expect(wrapper.find('#assistant').exists()).toBe(true)
  expect(wrapper.find('#contact').exists()).toBe(true)
  expect(wrapper.get('.assistant-launcher').attributes('href')).toBe('#assistant')

  expect(wrapper.text()).not.toContain('Testimonials')
  expect(wrapper.text()).not.toContain('Skills & Technologies')
  expect(wrapper.text()).not.toContain('Send Message')
  expect(wrapper.text()).not.toContain('Tech Stack')
})

it('reveals sections immediately when reduced motion is preferred', async () => {
  vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query === '(prefers-reduced-motion: reduce)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))

  const wrapper = mount(App, { attachTo: document.body })
  await wrapper.vm.$nextTick()
  expect(wrapper.get('[data-reveal]').classes()).toContain('is-visible')
})
