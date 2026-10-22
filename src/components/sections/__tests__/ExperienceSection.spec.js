import { mount } from '@vue/test-utils'
import ExperienceSection from '../ExperienceSection.vue'

it('renders both roles and the education line', () => {
  const wrapper = mount(ExperienceSection)
  expect(wrapper.get('#experience').exists()).toBe(true)
  expect(wrapper.text()).toContain('Advani Group of Companies (Nyne Beauty Inc.)')
  expect(wrapper.text()).toContain('Elyon Global Technologies Asia Inc.')
  expect(wrapper.text()).toContain('BSIT, Cum Laude')
  expect(wrapper.text()).toContain('STI College Balayan')
  expect(wrapper.findAll('.experience__item')).toHaveLength(2)
  expect(wrapper.findAll('.experience__highlight').length).toBeGreaterThanOrEqual(9)
})

it('shows the Advani official title with IT support responsibilities', () => {
  const wrapper = mount(ExperienceSection)
  const advani = wrapper.findAll('.experience__item')[0]

  expect(advani.get('.experience__role').text()).toBe('Junior Network and System Administrator')
  expect(advani.text()).toContain('Windows / macOS')
  expect(advani.text()).toContain('Active Directory')
  expect(advani.text()).toContain('Hyper-V')
  expect(advani.text()).toContain('Proxmox')
  expect(advani.text()).toContain('Azure DevOps')
  expect(advani.text()).toContain('Dynamics 365 Business Central')
})
