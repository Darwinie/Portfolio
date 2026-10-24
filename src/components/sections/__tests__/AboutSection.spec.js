import { mount } from '@vue/test-utils'
import AboutSection from '../AboutSection.vue'

it('renders the bio, currently list, process, and toolbox', () => {
  const wrapper = mount(AboutSection)
  expect(wrapper.get('#about').exists()).toBe(true)
  expect(wrapper.text()).toContain('I build internal tools and automations')
  expect(wrapper.text()).toContain('NOUS AV IT Solutions')
  expect(wrapper.text()).toContain('TypeScript')
  expect(wrapper.text()).toContain('Cloud & DevOps')
  expect(wrapper.text()).toContain('Observe the process')
  expect(wrapper.text()).toContain('Measure and document it')
  expect(wrapper.text()).toContain('ASP.NET Core')
  expect(wrapper.text()).toContain('Dynamics 365 Business Central')
  expect(wrapper.text()).toContain('BSIT, Cum Laude')
  expect(wrapper.text()).toContain('Active Directory')
  expect(wrapper.text()).toContain('Hyper-V')
  expect(wrapper.text()).toContain('Proxmox')
  expect(wrapper.findAll('.toolbox__group')).toHaveLength(7)
  expect(wrapper.findAll('.how-i-work__item')).toHaveLength(4)
})
