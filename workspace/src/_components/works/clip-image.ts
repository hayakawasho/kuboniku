import { defineComponent, useEvent, useDomRef, ref } from "lake";
import { Tween } from "@/_foundation/tween";
import { nextTick } from "@/_foundation/utils";
import { useWindowSize } from "@/_states/window-size";

const INSET_VAL = 0.05;

export default defineComponent({
  name: "ClipImage",
  setup(el: HTMLElement) {
    const { refs } = useDomRef<{ clipTarget: HTMLElement }>("clipTarget");

    const $img = el.querySelector("img");
    const { width, height } = refs.clipTarget.getBoundingClientRect();

    const cache = ref({
      height,
      width,
    });

    const aspect = height / width;
    const isPortrait = aspect > 1;

    const state = {
      rate: {
        x: isPortrait ? 1 : 0.5,
        y: isPortrait ? 0.5 : 1,
      },
      x: 0,
      y: 0,
    };

    useWindowSize(() => {
      const { width, height } = refs.clipTarget.getBoundingClientRect();

      cache.value = {
        height,
        width,
      };
    });

    useEvent(el, "mouseenter", async (_e) => {
      el.classList.add("isHover", "isAnimating");
      refs.clipTarget.style.willChange = "clip-path";

      await nextTick();

      Tween.parallel(
        Tween.tween($img, 0.55, "power2.out", {
          scale: 1.04,
        }),
        Tween.tween(state, 0.55, "power2.out", {
          onComplete: () => {
            refs.clipTarget.style.willChange = "";
            el.classList.remove("isAnimating");
          },
          onUpdate: () => {
            refs.clipTarget.style.clipPath = `inset(${state.y}px ${state.x}px)`;
          },
          x: cache.value.width * (INSET_VAL * state.rate.x),
          y: cache.value.height * (INSET_VAL * state.rate.y),
        })
      );
    });

    useEvent(el, "mouseleave", async (_e) => {
      el.classList.add("isAnimating");
      refs.clipTarget.style.willChange = "clip-path";

      await nextTick();

      el.classList.remove("isHover");

      Tween.parallel(
        Tween.tween($img, 0.55, "power2.out", {
          clearProps: "scale",
          scale: 1,
        }),
        Tween.tween(state, 0.55, "power2.out", {
          onComplete: () => {
            refs.clipTarget.style.willChange = "";
            el.classList.remove("isAnimating");
          },
          onUpdate: () => {
            refs.clipTarget.style.clipPath = `inset(${state.y}px ${state.x}px)`;
          },
          x: 0,
          y: 0,
        })
      );
    });
  },
});
