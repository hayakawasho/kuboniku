import { defineComponent, useSlot } from "lake";
import { Tween } from "@/_foundation/tween";
import { Color } from "@/_gl/three";
import { useThree } from "@/_gl/use-three";
import Aurora from "./aurora";

export default defineComponent({
  name: "BackCanvas",
  setup(canvas: HTMLCanvasElement, context) {
    const { addChild } = useSlot();
    const glContext = useThree(canvas, 1);

    const [auroraContext] = addChild(canvas, Aurora, {
      ...context,
      ...glContext,
    });

    return {
      ...glContext,
      canvas,
      onChangeColorPalettes: (
        colorCode1: string,
        colorCode2: string,
        colorCode3: string,
        colorCode4: string,
        duration = 4.8
      ) => {
        const { uniforms } = auroraContext.current;

        Tween.kill([
          uniforms.u_color1.value,
          uniforms.u_color2.value,
          uniforms.u_color3.value,
          uniforms.u_color4.value,
        ]);

        const newColor1 = new Color(colorCode1);
        const newColor2 = new Color(colorCode2);
        const newColor3 = new Color(colorCode3);
        const newColor4 = new Color(colorCode4);

        Tween.serial(
          Tween.parallel(
            Tween.tween(uniforms.u_color1.value, duration, "opacity", {
              b: newColor1.b,
              g: newColor1.g,
              r: newColor1.r,
            }),
            Tween.tween(uniforms.u_color2.value, duration, "opacity", {
              b: newColor2.b,
              g: newColor2.g,
              r: newColor2.r,
            }),
            Tween.tween(uniforms.u_color3.value, duration, "opacity", {
              b: newColor3.b,
              g: newColor3.g,
              r: newColor3.r,
            }),
            Tween.tween(uniforms.u_color4.value, duration, "opacity", {
              b: newColor4.b,
              g: newColor4.g,
              r: newColor4.r,
            })
          )
        );
      },
    };
  },
});
