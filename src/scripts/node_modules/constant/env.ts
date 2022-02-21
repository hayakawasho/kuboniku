const narrowQuery = window.matchMedia('(max-width: 639px)')
const wideQuery = window.matchMedia('(min-width: 640px)')
const mediaPrint = window.matchMedia('print')

function canUseWebP() {
  const canvas = document.createElement('canvas')

  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0
  }

  return false
}

const g = ((window as any).__KUBONIKU__ = (window as any).__KUBONIKU__ || {})

export { narrowQuery, wideQuery, mediaPrint, g, canUseWebP }
