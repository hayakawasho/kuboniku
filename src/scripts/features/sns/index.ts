import Abstract from '@/_abstract/_module'

export default class extends Abstract {
  readonly events = {
    click: {
      toggle: '_toggle',
    },
  }

  init() {
    console.log('init:sns')
  }

  destroy() {
    console.log('destroy:sns')
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
