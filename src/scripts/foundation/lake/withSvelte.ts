import type { SvelteComponent } from 'svelte'
import type { IComponent } from './type'

type SvelteAppType = typeof SvelteComponent

class WithSvelte implements IComponent {
  #app!: SvelteComponent

  constructor(private Svelte: SvelteAppType) {}

  init(el: HTMLElement, props = {}) {
    this.#app = new this.Svelte({
      target: el,
      props,
    })
  }

  destroy() {
    this.#app.$destroy()
  }
}

const withSvelte = (Svelte: SvelteAppType): IComponent => {
  return new WithSvelte(Svelte)
}

export { withSvelte }
