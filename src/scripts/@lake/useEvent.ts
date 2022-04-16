import { onDestroy } from 'svelte'

type Options = boolean | AddEventListenerOptions

export function useEvent<
  T extends HTMLElement = HTMLElement,
  U extends keyof HTMLElementEventMap = keyof HTMLElementEventMap
>(
  target: T,
  eventType: U,
  handler: EventListenerOrEventListenerObject,
  options?: Options
) {
  target.addEventListener(eventType, handler, options)

  onDestroy(() => {
    console.log('destroy')
    target.removeEventListener(eventType, handler, options)
  })
}
