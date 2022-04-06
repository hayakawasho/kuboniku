import { WINDOW_RESIZE } from '@/const'
import { eventbus } from '@/foundation'

export default function () {
  const setVh = (wh: number) => {
    const vh = wh * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setVh(window.innerHeight)

  const ro = new ResizeObserver(([entry]) => {
    const rect = entry.contentRect
    const windowH = window.innerHeight

    setVh(windowH)

    eventbus.emit(WINDOW_RESIZE, {
      screenWidth: rect.width,
      screenHeight: rect.height,
      windowHeight: windowH,
    })
  })

  ro.observe(document.getElementById('js-viewportRef') as HTMLElement)
}
