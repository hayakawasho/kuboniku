import { module } from 'modujs'

export default abstract class extends module {
  /**
   * @abstract
   */
  init() {} // eslint-disable-line @typescript-eslint/no-empty-function

  /**
   * @abstract
   */
  destroy() {} // eslint-disable-line @typescript-eslint/no-empty-function
}
