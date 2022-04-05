import { match } from 'ts-pattern'
import { q } from './selector'

type RefValue = {
  [key: string]: null
}

type ReturnDOMRef<T> = {
  refs: T
}

type DOMRef = <T>(ref: RefValue) => ReturnDOMRef<T>

export function domRefs(refs: RefValue, scope: HTMLElement) {
  const parent = scope

  const $ = (query: string) => {
    const nodes = q(`[data-ref="${query}"]`, parent)

    return match(nodes.length)
      .when(
        v => v === 1,
        () => nodes[0]
      )
      .when(
        v => v > 1,
        () => nodes
      )
      .otherwise(() => {
        throw new Error('element is not exists')
      })
  }

  const childRefs = Object.keys(refs).map(refKey => $(refKey))

  return childRefs
}

export type { RefValue, ReturnDOMRef, DOMRef }
