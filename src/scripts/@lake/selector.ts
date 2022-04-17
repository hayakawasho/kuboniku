import type { DOMNode } from './types'

export const q = <T extends DOMNode>(query: string, scope?: DOMNode) => {
  const nodes: T[] = Array.from((scope ?? document).querySelectorAll(query))
  return nodes
}
