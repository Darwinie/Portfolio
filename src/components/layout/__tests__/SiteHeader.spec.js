import { mount } from '@vue/test-utils'
import SiteHeader from '../SiteHeader.vue'

it('renders the primary navigation and resume link', () => {
  const wrapper = mount(SiteHeader)
  expect(wrapper.get('nav').text()).toContain('Work')
  expect(wrapper.get('nav').text()).toContain('About')
  expect(wrapper.get('nav').text()).toContain('Experience')
  expect(wrapper.get('nav').text()).toContain('AI demo')
  expect(wrapper.get('nav').text()).toContain('Ask AI')
  expect(wrapper.get('nav').text()).toContain('Contact')
  expect(wrapper.get('a[href="#assistant"]').text()).toBe('Ask AI')
  expect(wrapper.get('a[href="/Lubugan_Darwin_Resume.pdf"]').exists()).toBe(true)
})

it('opens the mobile menu and closes it with Escape', async () => {
  const wrapper = mount(SiteHeader, { attachTo: document.body })
  const button = wrapper.get('button[aria-label="Open menu"]')

  expect(button.attributes('aria-expanded')).toBe('false')
  await button.trigger('click')
  expect(button.attributes('aria-expanded')).toBe('true')
  expect(wrapper.get('#mobile-menu').isVisible()).toBe(true)

  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await wrapper.vm.$nextTick()
  expect(button.attributes('aria-expanded')).toBe('false')
  expect(wrapper.find('#mobile-menu').exists()).toBe(false)
})

it('closes the mobile menu on outside click', async () => {
  const wrapper = mount(SiteHeader, { attachTo: document.body })
  await wrapper.get('button[aria-label="Open menu"]').trigger('click')

  document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await wrapper.vm.$nextTick()
  expect(wrapper.get('button[aria-label="Open menu"]').attributes('aria-expanded')).toBe('false')
})
