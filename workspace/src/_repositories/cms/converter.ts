import type { Image } from "@/_components/image";

export const convertGraphqlRawMediaToImg = (raw: any): Image => {
  return {
    height: raw.mediaDetails.height,
    url: raw.sourceUrl,
    width: raw.mediaDetails.width,
  };
};
