import { defineComponent, useSlot, withSvelte } from "lake";
import { Tween } from "@/_foundation/tween";
import Splash from "./view.svelte";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "Splash",
  setup(el, context: AppContext) {
    const { addChild } = useSlot();

    const images = el.dataset.images!.split(", ");

    addChild(el, withSvelte(Splash), {
      ...context,
      images,
    });

    const start = () => {
      return new Promise<void>(resolve => {
        Tween.serial(
          Tween.parallel(
            Tween.wait(1, () => {
              resolve();
            })
          )
        );
      });
    };

    const done = () => {
      //
    };

    return {
      done,
      start,
    };
  },
});
