import type { ImageMetadata } from ".";

export const convertRawMediaToImg = (raw: any): ImageMetadata => {
  return {
    height: raw.height,
    url: raw.url,
    width: raw.width,
  };
};

const IMG_ROOT = "https://res.cloudinary.com/dxydwpqwv/images/";
const DEFAULT_IMG_API = "f_auto,q_auto";

export const cloudinaryImgAPIConverter = (
  cloudinaryUrl = "",
  api = DEFAULT_IMG_API
) => {
  const resource = cloudinaryUrl.replace(IMG_ROOT + DEFAULT_IMG_API, "");
  return IMG_ROOT + api + resource;
};
