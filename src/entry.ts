import 'virtual:windi.css'
import 'ress'
import Cursor from '@/components/cursor/index.svelte'
import q from 'bianco.query'
import Loader from '@/components/loader'
import type { IComponent, ComponentContext } from 'lake'
import Menu from '@/components/menu/index.svelte'
import factory, { withSvelte } from 'lake'
import Noop from '@/components/noop.svelte'
import Profile from '@/components/profile'
import Sns from '@/components/sns/sns.svelte'
import Works from '@/components/works'
import WorksDetail from '@/components/works/[slug]'
import type { LoaderProps } from '@/const'

function bootstrap() {
  const { component, unmount } = factory()

  const table: Record<string, IComponent> = {
    Noop: withSvelte(Noop),
    Sns: withSvelte(Sns, 'Sns'),
    Cursor: withSvelte(Cursor, 'Cursor'),
    Menu: withSvelte(Menu, 'Menu'),
    Works,
    WorksDetail,
    Profile,
  } as const

  const mountComponents = (scope: HTMLElement, props: Record<string, unknown>) => {
    return q<HTMLElement>(`[data-component]`, scope).reduce<ComponentContext[]>((acc, el) => {
      const name = el.dataset.component || 'Noop'
      try {
        const mount = component(table[`${name}`])
        acc.push(mount(el, props))
      } catch (error) {
        console.error(error)
      }
      return acc
    }, [])
  }

  const html = document.documentElement

  component(Loader)(html, {
    onCreated: (GlobalContext?: Parameters<LoaderProps['onCreated']>[0]) =>
      mountComponents(html, {
        ...GlobalContext,
        initialLoad: true,
      }),
    onUpdated: (
      scope: Parameters<LoaderProps['onUpdated']>[0],
      GlobalContext: Parameters<LoaderProps['onUpdated']>[1]
    ) =>
      mountComponents(scope, {
        ...GlobalContext,
        initialLoad: false,
      }),
    onCleanup: (scope: Parameters<LoaderProps['onCleanup']>[0]) =>
      unmount(q(`[data-component]`, scope)),
  })
}

if (document.readyState !== 'loading') {
  bootstrap()
} else {
  document.addEventListener('DOMContentLoaded', bootstrap, false)
}

if (process.env.NODE_ENV === 'development') {
  const Stats = await ((await import('https://cdn.skypack.dev/stats.js')) as any).default
  const stats = new Stats()
  stats.showPanel(0)

  document.body.appendChild(stats.dom)

  const loop = () => {
    stats.update()
    requestAnimationFrame(loop)
  }

  loop()
}
