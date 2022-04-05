import type { SvelteComponent } from 'svelte'
import { useDOMRef } from './domRef'
import type { IComponent } from './types'

type SvelteAppType = typeof SvelteComponent

class WithSvelte implements IComponent {
  #app!: SvelteComponent

  constructor(private SvelteApp: SvelteAppType) {}

  init(element: HTMLElement, props = {}) {
    const target = element
    const newProps = {
      ...props,
      useDOMRef,
    }

    this.#app = new this.SvelteApp({
      target,
      props: newProps,
    })
  }

  destroy() {
    this.#app.$destroy()
  }
}

function withSvelte(Svelte: SvelteAppType): IComponent {
  return new WithSvelte(Svelte)
}

export { withSvelte }
