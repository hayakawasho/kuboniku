import {
  withSvelte as _,
  defineComponent,
  useSlot,
  useDomRef,
  useMount,
} from "lake";
import { Tween } from "@/_foundation/tween";
import Project from "./project";
import SkewScrollContainer from "../skew-scroll";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  index: HTMLElement;
  project: HTMLElement[];
};

export default defineComponent({
  name: "Works",
  setup(el, context: AppContext) {
    const { once, history } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("index", "project");

    addChild(el, SkewScrollContainer, context);
    addChild(refs.project, Project, context);

    useMount(() => {
      if (!once && history.value === "push") {
        Tween.serial(
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
