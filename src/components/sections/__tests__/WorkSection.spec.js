import { mount } from '@vue/test-utils'
import WorkSection from '../WorkSection.vue'

it('renders three case studies, two diagrams, and additional work', () => {
  const wrapper = mount(WorkSection)
  expect(wrapper.findAll('article.case-study')).toHaveLength(3)
  expect(wrapper.text()).toContain('Shopify catalog automation')
  expect(wrapper.text()).toContain('Timekeeping, rebuilt in-house')
  expect(wrapper.text()).toContain('OCR at the counter')
  expect(wrapper.findAll('.pipeline')).toHaveLength(2)
  expect(wrapper.get('img[src="/assets/projects/timekeeping-redacted.jpg"]').exists()).toBe(true)
  expect(wrapper.text()).toContain('Additional work')
  expect(wrapper.text()).toContain('Shopify image resizer with API tester')
  expect(wrapper.findAll('a[href="#"]')).toHaveLength(0)
})
