import { q } from './selector'

type RefValue = Set<string>

type ReturnDOMRef<T> = {
  refs: T
}

type DOMRef = <T>(ref: RefValue) => ReturnDOMRef<T>

export function domRefs(refs: RefValue, scope: HTMLElement) {
  const parent = scope

  const reducer = (nodes: HTMLElement[]) => {
    switch (nodes.length) {
      case 1:
        return nodes[0]
      case 0:
        throw new Error('element is not exists')
      default:
        return nodes
    }
  }

  const $ = (query: string) => {
    const nodes = q(`[data-ref="${query}"]`, parent)
    return reducer(nodes)
  }

  const childRefs = [...refs].map(refKey => $(refKey))

  return childRefs
}

export type { RefValue, ReturnDOMRef, DOMRef }
