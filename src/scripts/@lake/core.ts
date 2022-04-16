import { assert } from './assert'
import type { IComponent } from './types'

const DEFINETATIONS = new Map<string, IComponent>()

const DOM_COMPONENT_INSTANCE = new WeakMap<HTMLElement, IComponent>()

function bindNodeToComponent(node: HTMLElement, Component: IComponent) {
  DOM_COMPONENT_INSTANCE.set(node, Component)
}

function defineComponent({ setup, cleanup }: IComponent) {
  return {
    setup,
    cleanup,
  }
}

function mount(targets: HTMLElement[]) {
  return targets.map(el => {
    const { component, props: _ } = el.dataset
    const context = DEFINETATIONS.get(component as string)
    const props = {}

    assert(context, `${component} was already registered`)

    bindNodeToComponent(el, context)
    context.setup(el, props)

    return el
  })
}

function unmount(targets: HTMLElement[]) {
  return targets.map(el => {
    const context = DOM_COMPONENT_INSTANCE.get(el)
    context?.cleanup()

    return el
  })
}

function register(name: string, Component: IComponent) {
  assert(!DEFINETATIONS.has(name), `${name} was already registered`)
  DEFINETATIONS.set(name, Component)
}

function unregister(name: string) {
  assert(DEFINETATIONS.has(name), `${name} was never registered`)
  DEFINETATIONS.delete(name)
}

function createSubComponents(components = {}) {
  return Object.entries(components).reduce<any>((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})
}

export {
  defineComponent,
  mount,
  unmount,
  register,
  unregister,
  createSubComponents,
}
