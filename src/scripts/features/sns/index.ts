import Abstract from '@/_abstract/_module';

export default class extends Abstract {
  init() {
    console.log('init')
  }

  destroy() {
    super.destroy()

    console.log('destroy', this)
  }
}
