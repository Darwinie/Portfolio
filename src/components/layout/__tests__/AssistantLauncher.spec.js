import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { Bot } from 'lucide-vue-next'
import AssistantLauncher from '../AssistantLauncher.vue'

const OriginalIntersectionObserver = globalThis.IntersectionObserver

let observers = []

class IntersectionObserverMock {
  constructor(callback, options) {
    this.callback = callback
    this.options = options
    this.observed = []
    this.disconnected = false
    observers.push(this)
  }

  observe(element) {
    this.observed.push(element)
  }

  unobserve() {}

  disconnect() {
    this.disconnected = true
  }
}

beforeEach(() => {
  observers = []
  globalThis.IntersectionObserver = IntersectionObserverMock
  document.body.innerHTML = '<section id="assistant"></section>'
})

afterEach(() => {
  globalThis.IntersectionObserver = OriginalIntersectionObserver
  document.body.innerHTML = ''
})

it('links to the assistant section with an encouraging robot label', () => {
  const wrapper = mount(AssistantLauncher)
  const link = wrapper.get('a')

  expect(link.attributes('href')).toBe('#assistant')
  expect(link.attributes('aria-label')).toContain('Ask my AI assistant')
  expect(link.text()).toContain('Ask my AI assistant')
  expect(link.text()).toContain('Find out more about me')
  expect(wrapper.findComponent(Bot).exists()).toBe(true)
})

it('hides while the assistant section is in view and shows again when it leaves', async () => {
  const wrapper = mount(AssistantLauncher)
  await flushPromises()

  const observer = observers[0]
  const section = document.getElementById('assistant')
  const link = wrapper.get('a')

  expect(observer).toBeDefined()
  expect(observer.observed).toContain(section)
  expect(link.classes()).not.toContain('assistant-launcher--hidden')

  observer.callback([{ isIntersecting: true, target: section }])
  await nextTick()
  expect(link.classes()).toContain('assistant-launcher--hidden')

  observer.callback([{ isIntersecting: false, target: section }])
  await nextTick()
  expect(link.classes()).not.toContain('assistant-launcher--hidden')
})

it('stays visible when the assistant section is absent', async () => {
  document.body.innerHTML = ''

  const wrapper = mount(AssistantLauncher)
  await flushPromises()

  expect(observers).toHaveLength(0)
  expect(wrapper.get('a').classes()).not.toContain('assistant-launcher--hidden')
})

it('disconnects its observer when unmounted', async () => {
  const wrapper = mount(AssistantLauncher)
  await flushPromises()

  const observer = observers[0]
  wrapper.unmount()

  expect(observer.disconnected).toBe(true)
})
