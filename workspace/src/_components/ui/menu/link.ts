import { defineComponent, useSlot } from "lake";
import Underline from "../underline";
import type { AppContext } from "~/_foundation/types";

export default defineComponent({
  name: "MenuLink",
  setup(el: HTMLAnchorElement, context: AppContext) {
    const { addChild } = useSlot();
    addChild(el, Underline, context);
  },
});
