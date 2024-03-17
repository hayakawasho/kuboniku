import { defineComponent, useSlot, useDomRef } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import fragment from "./fragment.frag";
import GridItem from "./item";
import vertex from "./vertex.vert";
import { useInfiniteScroll } from "../use-infinite-scroll";

type Props = Omit<Parameters<typeof GridItem.setup>[1], "geo" | "mat" | "infiniteScrollContext">;

type Refs = {
  gridItem: HTMLImageElement[];
};

export default defineComponent({
  name: "Grid",
  setup(el: HTMLElement, context: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("gridItem");
    const infiniteScrollContext = useInfiniteScroll(el);

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    addChild(refs.gridItem, GridItem, {
      ...context,
      infiniteScrollContext,
      geo,
      mat,
    });
  },
});
