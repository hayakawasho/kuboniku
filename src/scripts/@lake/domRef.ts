interface IRefValue {
  [key: string]: string
}

export function useDOMRef<T>(ref: any): { refs: T } {
  const domRefs = ref

  return {
    refs: domRefs,
  }
}

export type DOMRef = typeof useDOMRef
