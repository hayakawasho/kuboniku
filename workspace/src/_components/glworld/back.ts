import { defineComponent } from "lake";
import { useTick } from "@/_foundation/hooks";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { Bg } from "./bg-noise/core";
import { useThree } from "./use-three";

export default defineComponent({
  name: "BackCanvas",
  setup(canvas: HTMLCanvasElement) {
    const { device } = useMediaQueryContext();
    const { addScene, removeScene, renderer, camera } = useThree(canvas, 1);

    const bg = new Bg(renderer, camera, { device });

    useTick(({ timestamp: _ }) => {
      bg.render();
    });

    useWindowSizeContext(() => {
      bg.resize();
    });

    return {
      addScene,
      onChangeColorPalette: (colorCode: string) => bg.setColor(colorCode),
      removeScene,
    };
  },
});
