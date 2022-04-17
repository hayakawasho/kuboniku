import { assert } from './assert'
import type { IComponent, DOMNode } from './types'

const COMPONENTS_IMPLEMENTATION_MAP = new Map<string, IComponent>()
const DOM_COMPONENT_INSTANCE_PROPERTY = new WeakMap<DOMNode, IComponent>()

function bindDOMNodeToComponentObject(node: DOMNode, Component: IComponent) {
  DOM_COMPONENT_INSTANCE_PROPERTY.set(node, Component)
}

function defineComponent({ setup, cleanup }: IComponent) {
  return {
    setup,
    cleanup,
  }
}

function mountComponent(el: DOMNode, props: object, componentName: string) {
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(componentName)) {
    return
  }

  const component = COMPONENTS_IMPLEMENTATION_MAP.get(
    componentName
  ) as IComponent

  bindDOMNodeToComponentObject(el, component)

  component.setup(el, props)

  return component
}

function unmount(targets: DOMNode[]) {
  return targets.map(el => {
    if (!DOM_COMPONENT_INSTANCE_PROPERTY.has(el)) {
      return
    }

    ;(DOM_COMPONENT_INSTANCE_PROPERTY.get(el) as IComponent).cleanup()

    return el
  })
}

function register(name: string, Component: IComponent) {
  assert(
    !COMPONENTS_IMPLEMENTATION_MAP.has(name),
    `${name} was already registered`
  )

  COMPONENTS_IMPLEMENTATION_MAP.set(name, Component)
}

export { defineComponent, mountComponent, unmount, register }
