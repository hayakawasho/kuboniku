export class SplitText {
  public spans: HTMLElement[] = []

  constructor(target: HTMLElement) {
    this.#setSplit(target)
  }

  #setSplit = (line: HTMLElement) => {
    const content = line.textContent!
    const chars = content.split('')

    const decorated = chars.map((char, _i) => {
      const span = document.createElement('span')
      span.textContent = char

      span.style.display = 'inline-block'
      span.style.opacity = '1'
      span.style.transform = 'translate3d(0,0,0)'
      span.setAttribute('aria-hidden', 'true')

      return span
    })

    const fragment = document.createDocumentFragment()

    for (const span of decorated.flat()) {
      fragment.appendChild(span)
      this.spans.push(span)
    }

    line.textContent = ''
    line.appendChild(fragment)

    const srOnly = document.createElement('div')
    srOnly.classList.add('sr-only')
    srOnly.textContent = content

    line.appendChild(srOnly)
  }

  // #createSpan() {}
  //
  // #chars() {}
  //
  // #words() {}
  //
  // #lines() {}
}

/*
const spanWrapText = (target: HTMLElement): string => {
  const nodes: Node[] = Array.from(target.childNodes)
  let returnText = ''

  for (const node of nodes) {
    if (node.nodeType == Node.TEXT_NODE) {
      const text: string = (node.textContent || '').replace(/\r?\n/g, '')
      const splitText: string[] = text.split('')

      for (const char of splitText) {
        returnText += `<span>${char}</span>`
      }
    } else {
      returnText += (node as Element).outerHTML
    }
  }
  return returnText
}
*/
