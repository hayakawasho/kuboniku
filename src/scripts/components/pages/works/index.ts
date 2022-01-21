import App from './index.svelte'
import Abstract from '@/_abstract/_page'

export default class extends Abstract {
  init() {
    new App({
      target: document.querySelector('.js-works') as HTMLElement,
    })
  }
}
