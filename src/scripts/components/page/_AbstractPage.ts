import type { IScene } from '@/client/sceneManager'
import { createComponent, components } from '@/components/Fc'
import { selector as $$ } from '@/foundation'

export default abstract class implements IScene {
  scope!: HTMLElement
  $$!: typeof $$
  #children!: any[]

  static exec: () => IScene

  /**
   * DO NOT OVERWRITE
   */
  enter = async (scope = document.body) => {
    const children = $$('[data-component]', scope).map(el => {
      const componentName = el.dataset.component
      const props = el.dataset.props ?? '{}'
      const json = JSON.parse(props)

      return createComponent(components[componentName as any], {
        ...json,
        el,
      })
    })

    this.scope = scope
    this.$$ = $$
    this.#children = children

    this.init()
  }

  /**
   * DO NOT OVERWRITE
   */
  leave = async () => {
    this.#children.forEach(c => c.destroy())

    this.destroy()
  }

  protected init() {} // eslint-disable-line @typescript-eslint/no-empty-function
  protected destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
