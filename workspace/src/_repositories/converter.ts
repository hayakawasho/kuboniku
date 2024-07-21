import type { Image } from "~/_foundation/models/image";

export const convertGraphqlRawMediaToImg = (raw: any): Image => {
  return {
    height: raw.mediaDetails.height,
    url: raw.sourceUrl,
    width: raw.mediaDetails.width,
  };
};

export const makeImgUndefinedSeeder = () => {
  return {
    height: undefined,
    url: undefined,
    width: undefined,
  };
};
