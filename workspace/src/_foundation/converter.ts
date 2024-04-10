const IMG_ROOT = "https://res.cloudinary.com/dxydwpqwv/images/";
const DEFAULT_IMG_API = "f_auto,q_auto";

export const cloudinaryAPIConverter = (cloudinaryUrl = "", api = DEFAULT_IMG_API) => {
  const resource = cloudinaryUrl.replace(IMG_ROOT + DEFAULT_IMG_API, "");
  return IMG_ROOT + api + resource;
};
