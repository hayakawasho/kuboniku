import 'virtual:windi.css'
import Cursor from '@/components/cursor/index.svelte'
import Gl from '@/components/gl'
import Load from '@/components/load'
import $ from 'bianco.query'
import factory, { withSvelte, type IComponent, type ComponentContext } from 'lake'
import Menu from '@/components/menu/index.svelte'
import Noop from '@/components/noop'
import Observer from '@/components/observer/index.svelte'
import Profile from '@/components/profile'
import Sns from '@/components/sns/sns.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'

function init() {
  const { component, unmount } = factory()

  const table: Record<string, IComponent> = {
    Noop,
    Sns: withSvelte(Sns),
    Cursor: withSvelte(Cursor),
    Menu: withSvelte(Menu),
    Observer: withSvelte(Observer),
    Works,
    WorksDetail,
    Profile,
  }

  const glWorld = component(Gl)(document.getElementById('js-gl')!)

  const bootstrap = (scope: HTMLElement, initialLoad = true) => {
    return $<HTMLElement>(`[data-component]`, scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(
          mount(el, {
            initialLoad,
            glContext: glWorld.current,
          })
        )
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  const html = document.documentElement

  component(Load)(html, {
    componentDidMount: () => bootstrap(html),
    componentDidUpdate: (scope: HTMLElement) => bootstrap(scope, false),
    cleanup: (scope: HTMLElement) => unmount($(`[data-component]`, scope)),
    glContext: glWorld.current,
  })
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init, false)
}
