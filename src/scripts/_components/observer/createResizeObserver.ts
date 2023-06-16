import { debounce } from '@/_libs'
import { viewportMutators } from '@/_states/viewport'
import type { RefElement } from 'lake'

export const createResizeObserver = (el: RefElement) => {
  new ResizeObserver(
    debounce(([entry]) => {
      const { width, height } = entry.contentRect
      viewportMutators({ height, width })
    }, 200)
  ).observe(el)
}
