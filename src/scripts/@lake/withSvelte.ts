import type { SvelteComponent } from 'svelte'
import type { IComponent } from './types'
import { q } from './util/selector'

type SvelteAppType = typeof SvelteComponent

class WithSvelte implements IComponent {
  #app!: SvelteComponent

  private el!: HTMLElement

  constructor(private SvelteApp: SvelteAppType) {}

  init(element: HTMLElement, props = {}) {
    const target = (this.el = element)
    const useDOMRef = this.$.bind(this)

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

  $(query: string, context?: any) {
    const classIndex = query.indexOf('.')
    const idIndex = query.indexOf('#')
    const attrIndex = query.indexOf('[')

    const indexes = [classIndex, idIndex, attrIndex].filter(
      index => index != -1
    )

    let index: any = false
    let name = query
    let more = ''
    let parent = this.el

    if (indexes.length) {
      index = Math.min(...indexes)
      name = query.slice(0, index)
      more = query.slice(index)
    }

    if (typeof context == 'object') {
      parent = context
    }

    return q(`[data-ref="${name}"]` + more)
  }

  // #on(eventName: string, modUid: string, func: () => void, id: string) {
  // }

  //#off() {
  //}
}

function withSvelte(Svelte: SvelteAppType): IComponent {
  return new WithSvelte(Svelte)
}

export { withSvelte }
