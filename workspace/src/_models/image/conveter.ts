import type { ImageMetadata } from ".";

export const convertRawMediaToImg = (raw: any): ImageMetadata => {
  return {
    height: raw.height,
    url: raw.url,
    width: raw.width,
  };
};

const IMG_ROOT = "https://res.cloudinary.com/dxydwpqwv/images/";
const IMG_API = "f_auto,q_auto";

export const cloudinaryApiConverter = (
  cloudinaryUrl = "",
  api = "f_auto,q_auto"
): string => {
  const path = cloudinaryUrl.replace(IMG_ROOT + IMG_API, "");
  return IMG_ROOT + api + path;
};
