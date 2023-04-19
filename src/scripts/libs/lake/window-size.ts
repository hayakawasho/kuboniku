import { useWatch } from './watch'
import { viewportRef } from '@/states/viewport'

export const useWindowSize = (
  callback: (payload: { ww: number; wh: number; aspect: number }) => void
) => {
  useWatch(viewportRef, payload => {
    const aspect = payload.width / payload.height

    callback({
      ww: payload.width,
      wh: payload.height,
      aspect,
    })
  })
}
