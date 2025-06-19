import { defineComponent, useSlot } from "lake";
import { useThree } from "@/_gl/use-three";
import Aurora from "./aurora";

export default defineComponent({
  name: "BackCanvas",
  setup(canvas: HTMLCanvasElement, context) {
    const { addChild } = useSlot();
    const { addScene, removeScene } = useThree(canvas, 1);

    const glContext = {
      addScene,
      removeScene,
    };

    const [auroraContext] = addChild(canvas, Aurora, {
      ...context,
      ...glContext,
    });

    return {
      ...glContext,
      canvas,
      onChangeColorPalette: (colorCode: string) => {
        auroraContext.current.onChangeColorPalette(colorCode);
      },
    };
  },
});
