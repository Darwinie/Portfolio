import { mount } from '@vue/test-utils'
import ExperienceSection from '../ExperienceSection.vue'

it('renders all roles and the education line', () => {
  const wrapper = mount(ExperienceSection)
  expect(wrapper.get('#experience').exists()).toBe(true)
  expect(wrapper.text()).toContain('NOUS AV IT Solutions')
  expect(wrapper.text()).toContain('Advani Group of Companies (Nyne Beauty Inc.)')
  expect(wrapper.text()).toContain('Elyon Global Technologies Asia Inc.')
  expect(wrapper.text()).toContain('BSIT, Cum Laude')
  expect(wrapper.text()).toContain('STI College Balayan')
  expect(wrapper.findAll('.experience__item')).toHaveLength(3)
  expect(wrapper.findAll('.experience__highlight').length).toBeGreaterThanOrEqual(12)
})

it('shows the Advani official title with IT support responsibilities', () => {
  const wrapper = mount(ExperienceSection)
  const advani = wrapper
    .findAll('.experience__item')
    .find((item) => item.text().includes('Advani Group of Companies'))

  expect(advani).toBeTruthy()
  expect(advani.get('.experience__role').text()).toBe('Junior Network and System Administrator')
  expect(advani.text()).toContain('Nov 2025 — Sept 25, 2026')
  expect(advani.text()).toContain('Windows / macOS')
  expect(advani.text()).toContain('Active Directory')
  expect(advani.text()).toContain('Hyper-V')
  expect(advani.text()).toContain('Proxmox')
  expect(advani.text()).toContain('Azure DevOps')
  expect(advani.text()).toContain('Dynamics 365 Business Central')
})

it('shows the current NOUS AV part-time role and resume work', () => {
  const wrapper = mount(ExperienceSection)
  const nous = wrapper
    .findAll('.experience__item')
    .find((item) => item.text().includes('NOUS AV IT Solutions'))

  expect(nous).toBeTruthy()
  expect(nous.get('.experience__role').text()).toBe('Software Developer (Part-time)')
  expect(nous.text()).toContain('Mar 2026 — Present')
  expect(nous.text()).toContain('travel agency website')
  expect(nous.text()).toContain('timekeeping and payroll')
  expect(nous.text()).toContain('PHP, MySQL, Apache')
})
