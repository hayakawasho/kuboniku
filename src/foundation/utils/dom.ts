export const byId = (id: string) => {
  return document.getElementById(id)
}

export const qs = (selector: string, el: Document | Element = document) => {
  return el.querySelector(selector)
}

export const qsa = (selector: string, el: Document | Element = document) => {
  return Array.from(el.querySelectorAll(selector))
}

export const prependChild = (parent: Element, el: Element) => {
  parent.insertBefore(el, parent.firstChild)
}
