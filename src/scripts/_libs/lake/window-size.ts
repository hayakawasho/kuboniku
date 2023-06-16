import { ref, readonly, useUnmount } from 'lake'
import { viewport } from '@/_states/viewport'

export const useWindowSize = (
  callback: (payload: { windowWidth: number; windowHeight: number; aspect: number }) => void
) => {
  const { width, height } = viewport.get()
  const state = {
    wh: ref(height),
    ww: ref(width),
  }

  const unbind = viewport.listen(({ width, height }) => {
    const aspect = width / height

    callback({
      aspect,
      windowHeight: height,
      windowWidth: width,
    })

    state.ww.value = width
    state.wh.value = height
  })

  useUnmount(() => {
    unbind()
  })

  return {
    windowHeight: readonly(state.wh),
    windowWidth: readonly(state.ww),
  }
}
