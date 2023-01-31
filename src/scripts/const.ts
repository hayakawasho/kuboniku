export const WP_API_BASE = 'http://localhost:8888/wp-json/'

export type Provides = {
  REBOOT: boolean
  GL: {
    onResize: (width: number, height: number) => void
    addScene: () => void
    removeScene: () => void
  }
}
