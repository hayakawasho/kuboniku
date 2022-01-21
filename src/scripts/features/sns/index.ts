import Abstract from '@/_abstract/_module'

export default class extends Abstract {
  readonly events = {
    click: {
      toggle: '_toggle',
    },
  }

  init() {
    //
  }

  destroy() {
    //
  }

  _toggle(e: Event) {
    e.preventDefault()
  }

  _open() {
    //
  }

  _close() {
    //
  }
}
