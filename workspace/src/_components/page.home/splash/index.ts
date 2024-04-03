import { defineComponent, useSlot, withSvelte, useDomRef, useMount } from "lake";
import { useTick } from "@/_foundation/hooks";
import { Tween } from "@/_foundation/tween";
import { useWindowSizeContext } from "@/_states/window-size";
import Splash from "./view.svelte";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  splashImages: HTMLElement;
  splashImage: HTMLImageElement[];
};

const CANVAS_CLASSLIST = ["fixed", "top-0", "left-0", "w-full", "h-full", "pointer-events-none"];

export default defineComponent({
  name: "Splash",
  setup(el, context: AppContext) {
    const { addChild } = useSlot();
    const { backCanvasContext } = context;

    const state = {
      resizing: false,
    };

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.classList.add(...CANVAS_CLASSLIST);

    el.append(canvas);

    addChild(el, withSvelte(Splash), {
      ...context,
      images: el.dataset.images!.split(", "),
    });

    // Splashマウント後にフックする
    const { refs } = useDomRef<Refs>("splashImages", "splashImage");

    const start = () => {
      return new Promise<void>(resolve => {
        Tween.tween(refs.splashImage, 0, undefined, {
          onComplete: () => {
            resolve();
          },
          opacity: 1,
          stagger: 0.14,
        });
      });
    };

    const retry = () => {
      //
    };

    const done = () => {
      return new Promise<void>(resolve => {
        const CLIP_PATH = {
          y1: 100,
          y2: 100,
        };

        const draw = () => {
          canvas.style.clipPath = `polygon(0 0, 100% 0px, 100% ${CLIP_PATH.y1}%, 0 ${CLIP_PATH.y2}%)`;
        };

        Tween.serial(
          Tween.parallel(
            Tween.tween(refs.splashImages, 1.2, "power2.inOut", {
              y: "-101%",
            }),
            Tween.serial(
              Tween.wait(0.55),
              Tween.parallel(
                Tween.tween(CLIP_PATH, 1, "power2.inOut", {
                  onUpdate: draw,
                  y1: 0,
                }),
                Tween.tween(CLIP_PATH, 0.9, "power2.inOut", {
                  y2: 0,
                }).delay(0.1)
              )
            )
          ),
          Tween.immediate(() => {
            resolve();
          })
        );
      });
    };

    const draw2DCanvas = () => {
      ctx.clearRect(0, 0, backCanvasContext.canvas.width, backCanvasContext.canvas.height);
      ctx.drawImage(backCanvasContext.canvas, 0, 0);
    };

    const setCanvasSize = () => {
      canvas.width = backCanvasContext.canvas.width;
      canvas.height = backCanvasContext.canvas.height;
    };

    useTick(() => {
      if (state.resizing) {
        return;
      }
      draw2DCanvas();
    });

    useMount(() => {
      Tween.prop(refs.splashImage[0], {
        opacity: 1,
      });
      setCanvasSize();
    });

    useWindowSizeContext(() => {
      state.resizing = true;
      setCanvasSize();
      state.resizing = false;
    });

    return {
      done,
      start,
    };
  },
});
