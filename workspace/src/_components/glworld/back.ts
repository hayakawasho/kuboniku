import { defineComponent } from "lake";
import { useTick } from "@/_foundation/hooks";
import { useMediaQueryContext } from "@/_states/mq";
import { useWindowSizeContext } from "@/_states/window-size";
import { Bg } from "./bg-noise/core";
import { useThree } from "./use-three";

export default defineComponent({
  name: "BackCanvas",
  setup(canvas: HTMLCanvasElement, { resolution = 1 }: { resolution: number }) {
    const { device } = useMediaQueryContext();
    const { addScene, removeScene, renderer, camera } = useThree(canvas, resolution);

    const bg = new Bg(renderer, camera, { mq: device });

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
