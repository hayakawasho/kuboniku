import type { SvelteComponent } from 'svelte'

export class WithSvelte {
  #app!: SvelteComponent

  private constructor(private Svelte: typeof SvelteComponent) {}

  static connect(Svelte: typeof SvelteComponent) {
    return new WithSvelte(Svelte)
  }

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
