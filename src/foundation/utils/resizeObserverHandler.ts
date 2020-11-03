export default class ResizeObserverHandler {

  private _ro: ResizeObserver = null;

  constructor(private options: {
    el: Element,
    callback(entry: ResizeObserverEntry): void
  }) {

  }

  public init() {
    this._createObserver()
  }

  public destroy() {
    if (this._ro === null) return;

    this._ro.unobserve(this.options.el);
    this._ro = null;
  }

  private _createObserver() {
    this._ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.options.callback(entry)
      }
    });

    this._ro.observe(this.options.el);
  }
}
