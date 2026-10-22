import { mount } from '@vue/test-utils'
import SiteFooter from '../SiteFooter.vue'

it('renders footer links and location', () => {
  const wrapper = mount(SiteFooter)
  expect(wrapper.get('a[href="https://github.com/Darwinie"]').text()).toContain('GitHub')
  expect(wrapper.get('a[href="https://www.linkedin.com/in/lubugandarwin05"]').text()).toContain('LinkedIn')
  expect(wrapper.get('a[href="mailto:lubugandarwin@gmail.com"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('Batangas, Philippines')
  expect(wrapper.text()).toContain('GMT+8')
})
