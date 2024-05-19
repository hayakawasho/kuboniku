import { lerp } from "@/_foundation/math";

const ease = 0.675;

export class Smooth {
  #state;
  #scroll;

  constructor() {
    this.#state = {
      scrollLimit: 0,
      scrolling: false,
      ready: false,
    };

    const y = window.scrollY;

    this.#scroll = {
      current: y,
      target: y,
      diff: 0,
    };
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

  onRaf = ({ deltaTime, deltaRatio }: { deltaTime: number; deltaRatio: number }) => {
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

  reset = () => {
    this.#scroll.target = this.#scroll.current = 0;
    this.#setPosY(0);
  };

  destroy = () => {
    (this.#state as any) = null;
    (this.#scroll as any) = null;
  };

  scrollTop = () => {
    return this.#scroll.current;
  };
}
