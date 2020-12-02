import { Controller } from 'stimulus'
import { getData } from '../foundation/utils/html'
import { html, body } from '../foundation/constants/env'

export default class extends Controller {
  readonly html = html
  readonly body = body

  protected options

  constructor(context) {
    super(context)

    this.options = getData(this.data.get('options'))
  }

  /**
   * @abstract
   */
  initialize() {}

  /**
   * @abstract
   */
  connect() {}

  /**
   * @abstract
   */
  disconnect() {}
}
