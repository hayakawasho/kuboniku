import { defineComponent, useSlot, useDomRef } from "lake";
import { PlaneBufferGeometry, ShaderMaterial } from "@/_foundation/three";
import fragment from "./fragment.frag";
import ProjectItem from "./item";
import vertex from "./vertex.vert";

type Refs = {
  projectItem: HTMLImageElement[];
};

type Props = Omit<Parameters<typeof ProjectItem.setup>[1], "geo" | "mat">;

export default defineComponent({
  name: "Projects",
  setup(_el: HTMLElement, context: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("projectItem");

    const geo = new PlaneBufferGeometry(1, 1);
    const mat = new ShaderMaterial({
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    addChild(refs.projectItem, ProjectItem, {
      ...context,
      geo,
      mat,
    });
  },
});
