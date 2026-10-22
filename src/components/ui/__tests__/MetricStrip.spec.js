import { mount } from '@vue/test-utils'
import MetricStrip from '../MetricStrip.vue'

it('renders every metric value, label, and detail', () => {
  const wrapper = mount(MetricStrip, {
    props: {
      metrics: [
        { value: '≈70%', label: 'Less repetitive work', detail: 'Approximate reduction' },
        { value: 'Since 2023', label: 'Building internal tools', detail: 'Software roles' }
      ]
    }
  })
  expect(wrapper.findAll('dt')).toHaveLength(2)
  expect(wrapper.text()).toContain('≈70%')
  expect(wrapper.text()).toContain('Less repetitive work')
  expect(wrapper.text()).toContain('Approximate reduction')
})
