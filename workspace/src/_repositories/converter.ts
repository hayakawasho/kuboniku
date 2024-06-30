type Image = {
  width: number;
  height: number;
  url: string;
};

export const convertGraphqlRawMediaToImg = (raw: any): Image => {
  return {
    height: raw.mediaDetails.height,
    url: raw.sourceUrl,
    width: raw.mediaDetails.width,
  };
};

export const nullImgMetadata = {
  height: undefined,
  url: undefined,
  width: undefined,
};
