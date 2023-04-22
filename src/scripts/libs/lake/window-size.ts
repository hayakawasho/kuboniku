import { ref, readonly } from 'lake'
import { viewport } from '@/states/viewport'

export const useWindowSize = (
  callback: (payload: { windowWidth: number; windowHeight: number; aspect: number }) => void
) => {
  const { width, height } = viewport.get()
  const state = {
    windowWidth: ref(width),
    windowHeight: ref(height),
  }

  viewport.listen(({ width, height }) => {
    const aspect = width / height

    callback({
      windowWidth: width,
      windowHeight: height,
      aspect,
    })

    state.windowWidth.value = width
    state.windowHeight.value = height
  })

  return {
    windowWidth: readonly(state.windowWidth),
    windowHeight: readonly(state.windowHeight),
  }
}
