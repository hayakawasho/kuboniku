import { selector as $$ } from '@/foundation'
// import { match } from 'ts-pattern'

type Def = {
  id: string
  fn: any
}

// const COMPONENT_PROPS = 'data-props'
// const DOM_REF = 'data-ref'

export function create() {
  // const defaults = {
  //   component: '[data-component]',
  //   ref: '[data-ref]',
  //   props: '[data-props]',
  // }

  // function defineConfig(config: {
  //   component?: string
  //   ref?: string
  //   props?: string
  // }) {
  //   return {
  //     ...defaults,
  //     ...config,
  //   }
  // }

  const definitions = new Map<string, Def>()

  const instances = {}

  function define<T>(id: string, fn: T) {
    definitions.set(id, {
      id,
      fn: fn as T,
    })
  }

  function require(id: string) {
    return definitions.get(id)
  }

  function onInit() {
    const moduleEls = $$('[data-component]')
    const matches = moduleEls
      .filter(el => definitions.has(el.dataset.component ?? 'UNKNOWN'))
      .forEach(el => {
        const module = definitions.get(el.dataset.component ?? '')
      })
  }

  function onDestroy(scope = document.body) {
    // const moduleEls = $$(`[${COMPONENT}]`, scope)
    // const matches = moduleEls.filter(el => el.getAttribute(COMPONENT))
    // matches.forEach(el => {
    //
    // })
  }

  return {
    definitions,
    define,
    require,
    onInit,
    onDestroy,
  }
}
