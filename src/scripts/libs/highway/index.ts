import Highway from '@dogstudio/highway'

export type HighwayPayload = {
  from: {
    page: Document
    view: HTMLElement
  }
  to: {
    page: Document
    view: HTMLElement
  }
  trigger: HTMLElement | string
  location: object
}

export const H = new Highway.Core({
  links: 'a:not([target]):not([href^=\\#]):not([data-pjax-ignore])',
})

export const beforeEnter = (callback: (payload: Omit<HighwayPayload, 'from'>) => void) => {
  H.on('NAVIGATE_IN', callback)
}
