export const WP_API_BASE = 'http://localhost:8888/wp-json/'

export type Provides = {
  initialLoad: boolean
  glContext: {
    onResize: (width: number, height: number) => void
    addScene: () => void
    removeScene: () => void
  }
}

export type Size = { width: number; height: number }
