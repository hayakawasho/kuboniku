export function createComponent(
  Component: any,
  context: {
    el: HTMLElement
    domRefs: HTMLElement[]
  }
) {
  const { el, domRefs, ...props } = context

  Component.init(el, props)

  return Component
}
