export function useDOMRef<T>(ref: any): T {
  const domRef = ref
  return domRef
}

export type DOMRef = typeof useDOMRef
