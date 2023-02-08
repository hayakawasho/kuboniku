import { useUnmount } from 'lake'
import { H, type HighwayPayload } from '../highway'

export const useOnEnter = (callback: (payload: HighwayPayload) => void) => {
  H.on('NAVIGATE_END', callback)

  useUnmount(() => {
    H.off('NAVIGATE_END', callback)
  })
}

export const useOnLeave = (callback: (payload: Omit<HighwayPayload, 'to'>) => void) => {
  H.on('NAVIGATE_OUT', callback)

  useUnmount(() => {
    H.off('NAVIGATE_OUT', callback)
  })
}
