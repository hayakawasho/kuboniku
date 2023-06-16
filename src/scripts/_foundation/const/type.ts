import type { TierResult } from 'detect-gpu'
import type { OGLRenderingContext, Transform } from 'ogl'

// type GlContext = {
//   onResize: (width: number, height: number) => void
//   addScene: () => void
//   removeScene: () => void
// }

// type ScrollContext = {
//   resume: () => void
//   pause: () => void
//   update: () => void
//   scrollTo: (href: string) => void
// }

export type GlobalContext = {
  initialLoad: boolean
  current?: string
  // scrollContext: ScrollContext
  glContext: {
    gl: OGLRenderingContext
    addScene: (scene: Transform) => void
    removeScene: (scene: Transform) => void
  }
  env: {
    mq: 'pc' | 'sp'
    gpuTier?: TierResult
  }
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
