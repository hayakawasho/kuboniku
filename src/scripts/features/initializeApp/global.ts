import { eventbus } from '@/lib'
import { WINDOW_RESIZE } from 'constant/const'

export default function () {
  const setVh = (wh: number) => {
    const vh = wh * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  setVh(window.innerHeight)

  const ro = new ResizeObserver(entries => {
    for (const entry of entries) {
      const rect = entry.contentRect
      const windowH = window.innerHeight

      setVh(windowH)

      eventbus.emit(WINDOW_RESIZE, {
        screenW: rect.width,
        screenH: rect.height,
        windowH,
      })
    }
  })

  ro.observe(document.getElementById('js-viewportRef') as HTMLElement)
}
