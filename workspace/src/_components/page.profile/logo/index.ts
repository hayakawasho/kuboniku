import { defineComponent, useMount } from "lake";
// import { Tween } from "@/_foundation/tween";
import { useTick } from "@/_foundation/hooks";
import { useWindowSizeContext } from "@/_states/window-size";
import { Plane } from "./plane";
import type { AppContext, ParentScene } from "@/_foundation/type";

type Props = AppContext & ParentScene;

export default defineComponent({
  name: "Logo",
  setup(el: HTMLImageElement, context: Props) {
    const { addScene, removeScene } = context;

    const [windowWidth, windowHeight] = useWindowSizeContext();

    const logoPlane = new Plane(el, {
      windowHeight: windowHeight.value,
      windowWidth: windowWidth.value,
    });

    useWindowSizeContext(({ ww, wh }) => {
      logoPlane.resize({
        height: wh,
        width: ww,
      });
    });

    useTick(({ timeRatio }) => {
      //
    });

    useMount(() => {
      addScene(logoPlane);

      return () => {
        removeScene(logoPlane);
      };
    });
  },
});
