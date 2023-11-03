import { defineComponent, useSlot, useMount, useDomRef } from "lake";
import { Tween } from "@/_foundation/tween";
import { themeColorMutators } from "../../_states/color";
import SkewScrollContainer from "../skew-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {};

export default defineComponent({
  name: "WorksDetail",
  setup(el, context: AppContext) {
    const { once, history } = context;

    const { refs } = useDomRef<Refs>();
    const { addChild } = useSlot();

    const colorCode = el.dataset.color!;

    addChild(el, SkewScrollContainer, context);

    useMount(() => {
      themeColorMutators({ code: colorCode });

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
