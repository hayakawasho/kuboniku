import { WINDOW_RESIZE } from '@/const'
import { wideQuery, mediaPrint } from '@/env'
import { eventbus } from '@/lib/eventbus'

export default function () {
  const handleBreakpointChange = () => {
    location.reload()
  }

  wideQuery.addEventListener('change', handleBreakpointChange)

  mediaPrint.addEventListener('change', e => {
    if (e.matches) {
      wideQuery.removeEventListener('change', handleBreakpointChange)
    } else {
      wideQuery.addEventListener('change', handleBreakpointChange)
    }
  })

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
        vh: rect.height,
        windowH,
      })
    }
  })

  ro.observe(document.getElementById('js-viewportRef') as HTMLElement)
}
