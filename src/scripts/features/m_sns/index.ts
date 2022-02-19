import Abstract from 'abstract/abstractModule'

export default class extends Abstract {
  readonly events = {
    click: {
      trigger: '#toggle',
    },
  }

  init() {
    console.log('init:sns')
  }

  destroy() {
    console.log('destroy:sns')
  }

  #toggle(e: Event) {
    e.preventDefault()
  }

  #open() {
    //
  }

  #close() {
    //
  }
}
