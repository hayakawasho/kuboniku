import { defineComponent, useSlot, useDomRef } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import fragment from "./fragment.frag";
// import GridItem from "./item";
import vertex from "./vertex.vert";
import type { AppContext } from "@/_foundation/type";

type Refs = {
  gridItem: HTMLImageElement[];
};

export default defineComponent({
  name: "Grid",
  setup(_el: HTMLElement, context: AppContext) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("gridItem");

    const geo = new PlaneBufferGeometry(1, 1, 4, 20);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    // addChild(refs.gridItem, GridItem, {
    //   ...context,
    //   geo,
    //   mat,
    // });
  },
});
