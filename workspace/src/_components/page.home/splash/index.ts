import { defineComponent, useSlot, withSvelte } from "lake";
import { Tween } from "@/_foundation/tween";
import Splash from "./view.svelte";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "Splash",
  setup(el, context: AppContext) {
    const { addChild } = useSlot();

    addChild(el, withSvelte(Splash), context);

    const start = () => {
      return new Promise<void>(resolve => {
        Tween.serial(
          Tween.parallel(
            Tween.wait(5, () => {
              resolve();
            })
          )
        );
      });
    };

    return {
      start,
    };
  },
});
