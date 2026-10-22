import { mount } from '@vue/test-utils'
import CaseStudy from '../CaseStudy.vue'

const study = {
  number: '01',
  slug: 'shopify-catalog-automation',
  title: 'Shopify catalog automation',
  outcome: 'A multi-week catalog cleanup, reduced to under an hour.',
  context: 'Context copy.',
  constraint: 'Constraint copy.',
  built: 'Built copy.',
  result: 'Result copy.',
  role: 'Automation engineer',
  stack: ['PowerShell', 'Python', 'Shopify API'],
  scope: 'Product data',
  visual: { type: 'pipeline', steps: ['Catalog data', 'Dedupe + align', 'Barcodes + Shopify'] },
  link: null
}

it('renders the narrative, meta, diagram, and internal-project note', () => {
  const wrapper = mount(CaseStudy, { props: { study } })
  expect(wrapper.get('article').attributes('id')).toBe('shopify-catalog-automation')
  expect(wrapper.text()).toContain('Shopify catalog automation')
  expect(wrapper.text()).toContain('Context copy.')
  expect(wrapper.text()).toContain('Constraint copy.')
  expect(wrapper.text()).toContain('Built copy.')
  expect(wrapper.text()).toContain('Result copy.')
  expect(wrapper.text()).toContain('Automation engineer')
  expect(wrapper.text()).toContain('PowerShell')
  expect(wrapper.find('.pipeline').exists()).toBe(true)
  expect(wrapper.text()).toContain('Internal project — code available on request')
  expect(wrapper.find('a[href="#"]').exists()).toBe(false)
})
