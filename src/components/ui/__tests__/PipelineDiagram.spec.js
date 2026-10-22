import { mount } from '@vue/test-utils'
import PipelineDiagram from '../PipelineDiagram.vue'

it('renders numbered steps in order', () => {
  const wrapper = mount(PipelineDiagram, {
    props: { steps: ['Catalog data', 'Dedupe + align', 'Barcodes + Shopify'] }
  })
  const items = wrapper.findAll('li')
  expect(items).toHaveLength(3)
  expect(items[0].text()).toContain('01')
  expect(items[0].text()).toContain('Catalog data')
  expect(items[2].text()).toContain('Barcodes + Shopify')
})
