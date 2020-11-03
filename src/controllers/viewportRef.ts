import Module from '../__abstract__/module'
import { EVENTS } from '../foundation/constants/const'
import ResizeObserverHandler from '../foundation/utils/resizeObserverHandler'
import E from '../foundation/utils/E';
import debounce from 'lodash.debounce';

export default class extends Module {

  initialize() {
    this._setSize(window.innerWidth, window.innerHeight);

    new ResizeObserverHandler({
      el: this.element,
      callback: debounce((entry: ResizeObserverEntry) => this._handleResize(entry), 200)
    }).init();
  }

  private _handleResize(entry: ResizeObserverEntry) {
    const rect = entry.contentRect
    const { width, height } = rect;

    this._setSize(width, height)
  }

  private _setSize(width: number, height: number) {
    E.emit(EVENTS.RESIZE, { width, height })

    const vh = window.innerHeight * 0.01;

    this.html.style.setProperty('--vh', `${vh}px`);
  }
}
