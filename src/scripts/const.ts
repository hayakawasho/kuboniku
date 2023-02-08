export const WP_API_BASE = 'http://localhost:8888/wp-json/'

export type Provides = {
  reload:
    | false
    | {
        namespace: string
      }
  glWorld: {
    onResize: (width: number, height: number) => void
    addScene: () => void
    removeScene: () => void
  }
  flush: () => void
}

export type Size = { width: number; height: number }
