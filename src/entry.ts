import 'virtual:windi.css'
import 'ress'
import q from 'bianco.query'
import factory, { withSvelte } from 'lake'
import Cursor from '@/_components/cursor/index.svelte'
import Hover from '@/_components/hover/hover'
import Loader from '@/_components/loader'
import type { LoaderProps } from '@/_foundation/const'
import type { IComponent, ComponentContext } from 'lake'
import Menu from '@/_components/menu/index.svelte'
import Noop from '@/_components/noop.svelte'
import Profile from '@/_components/profile'
import Sns from '@/_components/sns.svelte'
import Works from '@/_components/works'
import WorksDetail from '@/_components/works/[slug]'

function bootstrap() {
  const { component, unmount } = factory()

  const table: Record<string, IComponent> = {
    Cursor: withSvelte(Cursor, 'Cursor'),
    Hover,
    Menu: withSvelte(Menu, 'Menu'),
    Noop: withSvelte(Noop),
    Profile,
    Sns: withSvelte(Sns, 'Sns'),
    Works,
    WorksDetail,
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
    onCleanup: (scope: Parameters<LoaderProps['onCleanup']>[0]) =>
      unmount(q(`[data-component]`, scope)),
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
