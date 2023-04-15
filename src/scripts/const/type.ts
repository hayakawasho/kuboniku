import type { TierResult } from 'detect-gpu'

type Env = {
  mq: 'pc' | 'sp'
  gpuTier?: TierResult
}

type GlContext = {
  onResize: (width: number, height: number) => void
  addScene: () => void
  removeScene: () => void
}

// type ScrollContext = {
//   resume: () => void
//   pause: () => void
//   update: () => void
//   scrollTo: (href: string) => void
// }

export type GlobalContext = {
  initialLoad: boolean
  // scrollContext: ScrollContext
  glContext: GlContext
  env: Env
}

export type LoaderProps = {
  onCreated: (props?: Omit<GlobalContext, 'initialLoad'>) => void
  onUpdated: (scope: HTMLElement, props?: Omit<GlobalContext, 'initialLoad'>) => void
  onCleanup: (scope: HTMLElement) => void
}

export type Size = {
  width: number
  height: number
}

export type Point = {
  x: number
  y: number
}
