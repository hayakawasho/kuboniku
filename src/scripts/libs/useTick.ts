import { onMounted } from 'lake'

const FPS_60_SEC = 1000 / 60

export function useTick(callback: (timeRetio: number) => void) {
  let then = 0

  onMounted(() => {
    const loop = (timestamp: number) => {
      rafId = requestAnimationFrame(loop)

      const now = timestamp

      if (then === 0) {
        then = now
        return
      }

      const dTime = now - then
      const timeRetio = Math.round((dTime / FPS_60_SEC) * 10000) * 0.0001

      callback(timeRetio)

      then = now
    }

    let rafId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId)
    }
  })
}
