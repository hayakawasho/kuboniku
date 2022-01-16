class Scroll {
  constructor() {
    //
  }

  set(y: number) {
    window.scrollTo(0, y)
  }

  reset() {
    this.set(0)
  }

  move() {
    //
  }

  add() {
    //
  }

  remove() {
    //
  }
}

const scroll = new Scroll()
export { scroll }
