import { mount } from '@vue/test-utils'
import HeroSection from '../HeroSection.vue'
import MetricStrip from '@/components/ui/MetricStrip.vue'

it('renders the positioning headline, actions, portrait, and metrics', () => {
  const wrapper = mount(HeroSection)

  expect(wrapper.get('h1').text()).toContain('I turn repetitive work into reliable systems')
  expect(wrapper.text()).toContain('Software Engineer — Automation')
  expect(wrapper.text()).toContain('Open to software engineering and automation roles')
  expect(wrapper.get('a[href="#work"]').text()).toContain('See selected work')
  expect(wrapper.get('a[href="/Lubugan_Darwin_Resume.pdf"]').text()).toContain('Download CV')
  expect(wrapper.get('img').attributes('alt')).toBe('Darwin M. Lubugan')
  expect(wrapper.text()).toContain('Batangas, Philippines · GMT+8')
  expect(wrapper.text()).toContain('≈70%')
  expect(wrapper.text()).toContain('Weeks → < 1 hour')
  expect(wrapper.findComponent(MetricStrip).exists()).toBe(true)
})
