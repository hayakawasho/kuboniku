import E from "@unseenco/e";
import { lerp } from "@/_foundation/math";

const ease = 0.625;
const EVT_ID = "smooth";

export class Smooth {
  #state;
  #scroll;
  #emitter;

  constructor() {
    this.#state = {
      scrollLimit: 0,
      scrolling: false,
      ready: false,
    };

    this.#scroll = {
      current: 0,
      target: 0,
      diff: 0,
    };

    this.#emitter = E;
  }

  onResize = (contentHeight: number, windowHeight: number) => {
    this.#state.scrollLimit = contentHeight - windowHeight;
  };

  pause = () => {
    this.#state.ready = false;
  };

  resume = () => {
    this.#state.ready = true;
  };

  #setPosY = (value: number) => {
    window.scrollTo(0, value);
  };

  #clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  };

  raf = ({ deltaTime, deltaRatio }: { deltaTime: number; deltaRatio: number }) => {
    if (!this.#state.ready) {
      return;
    }

    const diff = this.#scroll.target - this.#scroll.current;
    this.#state.scrolling = Math.abs(diff) >= 0.05;
    this.#scroll.diff = diff;

    if (this.#state.scrolling) {
      const d = deltaTime * 0.001;
      const expo = Math.exp(-ease * 85 * d);
      const p = expo * deltaRatio;

      this.#scroll.current = lerp(this.#scroll.current, this.#scroll.target, p);
      this.#setPosY(this.#scroll.current);

      this.#emitter.emit(EVT_ID, {
        currentY: this.#scroll.current,
      });
    }
  };

  onVScroll = ({ deltaY, originalEvent: evt }: { deltaY: number; originalEvent: Event }) => {
    if (!this.#state.ready) {
      return;
    }

    evt.preventDefault();

    this.#scroll.target += deltaY * -1;
    this.#scroll.target = this.#clamp(this.#scroll.target, -0, this.#state.scrollLimit);
  };

  onNativeScroll = () => {
    if (!this.#state.scrolling) {
      this.#scroll.target = this.#scroll.current = window.scrollY;
    }
  };

  on = (cb: Function) => {
    this.#emitter.on(EVT_ID, cb);
  };

  off = (cb: Function) => {
    this.#emitter.off(EVT_ID, undefined, cb);
  };

  set = (val: number) => {
    this.#scroll.target = this.#scroll.current = val;
    this.#setPosY(val);
  };

  reset = () => {
    this.set(0);
  };

  scrollTop = () => {
    return this.#scroll.current;
  };

  scrolling = () => {
    return this.#state.scrolling;
  };
}
