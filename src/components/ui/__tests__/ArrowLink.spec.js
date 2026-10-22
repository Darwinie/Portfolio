import { mount } from '@vue/test-utils'
import ArrowLink from '../ArrowLink.vue'

it('renders an internal link with an arrow', () => {
  const wrapper = mount(ArrowLink, { props: { href: '#work', label: 'See selected work' } })
  expect(wrapper.get('a').attributes('href')).toBe('#work')
  expect(wrapper.text()).toContain('See selected work')
  expect(wrapper.find('svg').exists()).toBe(true)
})

it('opens external links in a new tab', () => {
  const wrapper = mount(ArrowLink, {
    props: { href: 'https://github.com/Darwinie', label: 'GitHub', external: true }
  })
  expect(wrapper.get('a').attributes('target')).toBe('_blank')
  expect(wrapper.get('a').attributes('rel')).toBe('noreferrer')
})
