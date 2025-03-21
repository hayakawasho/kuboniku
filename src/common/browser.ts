import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const onInitialClientRender = () => {
  gsap.registerPlugin(ScrollToPlugin)
  gsap.registerPlugin(CustomEase)
  gsap.registerPlugin(ScrollTrigger)

  CustomEase.create("opa", ".26,.06 ,0 ,1")
  CustomEase.create("fade", ".18, .06, .23, 1")
  CustomEase.create("trans", ".43, .05, .17 ,1")
  CustomEase.create("smooth", "0.555, 0.205, 0.295, 0.975")
  CustomEase.create("snappy", ".580, .300, .005, 1.000")
}

export { onInitialClientRender }

/*
import store from '@/state/store';
import E from '@/common/utils/E';
import { EVENTS } from '@/common/constants/const';
import { SET_GPU_TIER, SET_SCROLLING } from '@/state/app';
import { getGPUTier } from 'detect-gpu';
import { hasTouch, APP } from '@/common/constants/env';
import ASScroll from '@ashthornton/asscroll';

(async () => {
  // BEING IMPORTANT (Bug Safari 10.1)
  // DO NOT REMOVE
  // https://github.com/GrosSacASac/JavaScript-Set-Up/blob/master/js/quirk_fixes/safari10_nomodule_fix.js
  if ((window as any).MAIN_EXECUTED) {
    throw new Error('Safari 10');
  }

  (window as any).MAIN_EXECUTED = true;

  const gpuTier = await getGPUTier();
  store.dispatch(SET_GPU_TIER(gpuTier));
})();

E.on(EVENTS.DOM_READY, () => {
  if (!hasTouch) {
    /*
    const smooth = new ASScroll({
      // element: '[data-scroll]',
      innerElement: '[data-scroll-item]',
      ease: 0.09,
      disableResize: true,
      disableOnTouch: true,
      customScrollbar: false,
    });

    smooth.on('raf', ({ scrollPos, smoothScrollPos }) => {
      E.emit(EVENTS.SCROLL, { scrollPos, smoothScrollPos });
    });

    E.on(EVENTS.RESIZE, ({ width, height }) => smooth.onResize(width, height));

    smooth.enable();

    APP.smooth = smooth;

  }

  disableHover();
});

E.on(EVENTS.ROUTE_START, () => {
  // APP.smooth && APP.smooth.disable();
});

E.on(EVENTS.ROUTE_UPDATE, ({ mount }) => {
  APP.smooth &&
    APP.smooth.enable(
      false,
      true,
      mount.querySelectorAll('[data-scroll-item]')
    );
});

const disableHover = () => {
  let isRunning = false;
  let val = 0;
  let timer;

  function enable() {
    isRunning = false;
    store.dispatch(SET_SCROLLING(false));
  }

  function disable(scrollPos) {
    if (val !== scrollPos) {
      val = scrollPos;
      clearTimeout(timer);

      isRunning || ((isRunning = true), store.dispatch(SET_SCROLLING(true))),
        (timer = setTimeout(enable, 300));
    }
  }

  timer = setTimeout(enable, 300);

  if (!hasTouch) {
    // APP.smooth.on('scroll', disable);
  }
};

const mouseMove = evt => {
  E.emit(EVENTS.MOUSE_MOVE, {
    x: evt.clientX,
    y: evt.clientY,
    target: evt.target,
    event: evt,
  });
};

window.addEventListener('mousemove', mouseMove, {
  passive: true,
});

window.addEventListener(
  'scroll',
  event => {
    E.emit(EVENTS.NATIVE_SCROLL, { event });
  },
  {
    passive: true,
  }
);
*/
