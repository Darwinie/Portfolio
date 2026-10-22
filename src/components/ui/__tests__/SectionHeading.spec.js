import { mount } from '@vue/test-utils'
import SectionHeading from '../SectionHeading.vue'

it('renders the eyebrow, title, and optional id', () => {
  const wrapper = mount(SectionHeading, {
    props: { eyebrow: 'Selected work', title: 'Work', id: 'work-title' }
  })
  expect(wrapper.get('.section-heading__eyebrow').text()).toBe('Selected work')
  expect(wrapper.get('h2').text()).toBe('Work')
  expect(wrapper.get('h2').attributes('id')).toBe('work-title')
})
