import { match } from 'ts-pattern'
import { getNodeDataType } from './util/html'
import { selector as $$ } from './util/selector'

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
    const initEls = $$('[data-component]')
    const matches = initEls.filter(el =>
      definitions.has(el.dataset.component ?? 'UNKNOWN')
    )

    console.log(matches)
    // .forEach(el => {
    //   check(el)
    //   // const module = definitions.get(el.dataset.component ?? '')
    // })
  }

  function onDestroy(scope = document.body) {
    console.log(definitions)

    // const destroyEls = $$(`[${COMPONENT}]`, scope)
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
