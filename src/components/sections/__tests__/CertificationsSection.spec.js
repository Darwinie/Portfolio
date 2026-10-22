import { mount } from '@vue/test-utils'
import CertificationsSection from '../CertificationsSection.vue'

it('renders exactly five certification names without invented metadata', () => {
  const wrapper = mount(CertificationsSection)
  expect(wrapper.get('#certifications').exists()).toBe(true)
  expect(wrapper.findAll('li')).toHaveLength(5)
  expect(wrapper.text()).toContain('SAP Business One (Basic — Financials and Logistics)')
  expect(wrapper.text()).toContain('Lean Six Sigma Yellow Belt')
  expect(wrapper.text()).not.toContain('2024')
})
