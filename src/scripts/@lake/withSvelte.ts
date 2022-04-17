import type { SvelteComponent } from 'svelte'
import { getContext } from 'svelte'
import { defineComponent } from './core'
import { domRefs } from './domRefs'
import type { Context$ } from './types'

function withSvelte(SvelteApp: typeof SvelteComponent) {
  const app$ = new WeakMap<object, SvelteComponent>()
  const symbol = {} as const

  return defineComponent({
    setup(rootRef, props) {
      const context = new Map<'$', Context$>()

      context.set('$', {
        rootRef,
        useDOMRef: (...ref) => ({
          refs: domRefs(new Set(ref), rootRef),
        }),
      })

      const app = new SvelteApp({
        target: rootRef,
        props,
        context,
      })

      app$.set(symbol, app)
    },

    cleanup() {
      app$.get(symbol)?.$destroy()
    },
  })
}

function getContext$() {
  return getContext<Context$>('$')
}

export { withSvelte, getContext$ }
