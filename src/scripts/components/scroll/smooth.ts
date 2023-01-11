const easeOutCirc = (t: number, b: number, c: number, d: number): number =>
  c * Math.sqrt(1 - (t = t / d - 1) * t) + b

const duration = 300

export class Smooth {
  currentPos = 0
  targetPos = 0
  el!: HTMLElement

  #lastScrollTime = 0 // イージングに利用された時間
  #elapsedEasingTime = 0 // 最後にscrollイベントを取得した時間

  constructor() {
    this.#addEvent()
  }

  init(element: HTMLElement) {
    Object.assign(element.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      transform: 'translate3d(0, 0, 0)',
    })

    this.el = element

    const div = document.createElement('div')
    div.id = 'js-fakeHeight'

    document.body.appendChild(div)

    div.style.height = `${element.scrollHeight}px`
    this.targetPos = window.scrollY

    this.enable()
  }

  destroy() {
    window.removeEventListener('scroll', this.#onScroll)
  }

  enable() {
    this.#onRAF()
  }

  disable() {
    //
  }

  update() {
    //
  }

  #addEvent() {
    window.addEventListener('scroll', this.#onScroll, {
      passive: true,
    })
  }

  #onScroll = (e: Event) => {
    this.#lastScrollTime = e.timeStamp
    this.#elapsedEasingTime = 0

    this.targetPos = window.scrollY
  }

  #onRAF = () => {
    this.#update()
    requestAnimationFrame(this.#onRAF)
  }

  #update() {
    // スクロール量が、実際のscrollTopと同じ場合処理はスキップして良い
    if (this.currentPos === this.targetPos) {
      return
    }

    this.#elapsedEasingTime += Date.now() - this.#lastScrollTime

    // イージング時間がduration以上の場合丸める
    if (this.#elapsedEasingTime > duration) {
      this.#elapsedEasingTime = duration
    }

    const y = this.#calcY()

    this.el.style.transform = `translate3d(0, ${-y}px, 0)`

    this.currentPos = y
  }

  #calcY() {
    const factor = easeOutCirc(this.#elapsedEasingTime, 0, 1, duration)
    const distance = this.targetPos - this.currentPos
    const absDistance = distance > 0 ? distance : -distance

    const y = absDistance >= 1 ? this.currentPos + distance * factor : this.targetPos

    return y
  }
}
