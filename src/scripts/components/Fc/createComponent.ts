export function createComponent(
  Component: any,
  context: {
    el: HTMLElement
  }
) {
  const { el, ...props } = context

  Component.init(el, props)

  return Component
}
