import { assert } from './assert'
import type { IComponent, DOMNode } from './types'

const COMPONENTS_IMPLEMENTATION_MAP = new Map<string, IComponent>()
const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<DOMNode, IComponent>()

function bindDOMNodeToComponentObject(node: DOMNode, component: IComponent) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, component)
}

const defineComponent = (options: IComponent) => options

function mountComponent(el: DOMNode, props: object, componentName: string) {
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(componentName)) {
    return
  }

  const component = COMPONENTS_IMPLEMENTATION_MAP.get(componentName) as IComponent

  bindDOMNodeToComponentObject(el, component)

  component.setup(el, props)
}

function unmount(targets: DOMNode[]) {
  return targets
    .filter(el => DOM_COMPONENT_INSTANCE_PROPERTY.has(el))
    .forEach(el => (DOM_COMPONENT_INSTANCE_PROPERTY.get(el) as IComponent).cleanup())
}

function registerComponent(name: string, component: IComponent) {
  assert(!COMPONENTS_IMPLEMENTATION_MAP.has(name), `${name} was already registered`)
  COMPONENTS_IMPLEMENTATION_MAP.set(name, component)
  return COMPONENTS_IMPLEMENTATION_MAP
}

export { defineComponent, mountComponent, unmount, registerComponent }
