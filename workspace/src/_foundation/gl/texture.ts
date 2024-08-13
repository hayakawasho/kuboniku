import { Texture, LinearFilter } from "~/_foundation/libs/three";

export const createTexture = () => {
  const tex = new Texture();
  tex.needsUpdate = true;
  tex.minFilter = LinearFilter;
  tex.generateMipmaps = false;

  return tex;
};
