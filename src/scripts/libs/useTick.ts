import { onMounted } from 'lake'

export function useTick(callback: (delta: number) => void) {
  let then = 0

  onMounted(() => {
    const loop = (timestamp: number) => {
      rafId = requestAnimationFrame(loop)

      const now = timestamp * 0.001

      if (then === 0) {
        then = now
        return
      }

      const delta = now - then
      callback(delta)

      then = now
    }

    let rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
    }
  })
}
