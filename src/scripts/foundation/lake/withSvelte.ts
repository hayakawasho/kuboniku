import type { SvelteComponent } from 'svelte'

export type FC = {
  init: any
  destroy: any
}

class WithSvelte {
  #app!: SvelteComponent

  constructor(private Svelte: typeof SvelteComponent) {}

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

const withSvelte = (Svelte: typeof SvelteComponent): FC => {
  return new WithSvelte(Svelte)
}

export { withSvelte }
