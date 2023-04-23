import { ref, readonly, useUnmount } from 'lake'
import { viewport } from '@/states/viewport'

export const useWindowSize = (
  callback: (payload: { windowWidth: number; windowHeight: number; aspect: number }) => void
) => {
  const { width, height } = viewport.get()
  const state = {
    windowWidth: ref(width),
    windowHeight: ref(height),
  }

  const unbind = viewport.listen(({ width, height }) => {
    const aspect = width / height

    callback({
      windowWidth: width,
      windowHeight: height,
      aspect,
    })

    state.windowWidth.value = width
    state.windowHeight.value = height
  })

  useUnmount(() => {
    unbind()
  })

  return {
    windowWidth: readonly(state.windowWidth),
    windowHeight: readonly(state.windowHeight),
  }
}
