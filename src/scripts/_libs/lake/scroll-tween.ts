import { lerp } from '@/_foundation/math'
import { scrollPosYGetters, scrollRunningGetters } from '@/_states/scroll'
import { useTick } from './tick'

export const useScrollTween = (
  callback: (payload: { target: number; current: number }) => void
) => {
  let current = 0

  useTick(() => {
    if (scrollRunningGetters() === false) {
      return
    }

    const target = scrollPosYGetters()
    current = lerp(target, current, 0.1)

    callback({ current, target })
  })
}
