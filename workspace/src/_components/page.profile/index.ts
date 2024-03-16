import { defineComponent, useMount } from "lake";
import { Tween } from "@/_foundation/tween";
import type { AppContext } from "@/_foundation/type";

export default defineComponent({
  name: "Profile",
  setup(el, { once, history }: AppContext) {
    useMount(() => {
      if (!once && history.value === "push") {
        Tween.serial(
          Tween.prop(el, {
            opacity: 0,
          }),
          Tween.wait(0.2),
          Tween.tween(el, 0.55, "power3.out", {
            opacity: 1,
          })
        );
      }

      return () => {
        if (history.value === "pop") {
          return;
        }

        Tween.tween(el, 0.55, "power3.out", {
          opacity: 0,
        });
      };
    });
  },
});
