type Def = {
  id: string
  fn: any
}

export function create() {
  const defaults = {
    component: '[data-component]',
    ref: '[data-ref]',
    props: '[data-props]',
  }

  function defineConfig(config: {
    component?: string
    ref?: string
    props?: string
  }) {
    return {
      ...defaults,
      ...config,
    }
  }

  const definitions: {
    [id: string]: Def
  } = {} as const

  // const instances = {};

  function define<T>(id: string, fn: T) {
    definitions[id] = {
      id,
      fn: fn as T,
    }
  }

  function require(id: string) {
    return definitions[id]
  }

  return {
    defaults,
    definitions,
    defineConfig,
    define,
    require,
  }
}

const ___ = create()

const lake = ___.definitions
const config = ___.defaults
const defineConfig = ___.defineConfig
const define = ___.define
const require = ___.require

export { lake, config, defineConfig, define, require }
