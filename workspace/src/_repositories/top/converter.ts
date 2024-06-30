import { convertGraphqlRawMediaToImg } from "../converter";

export const convertRawPost2WorkForTop = (rawPost: any) => {
  return {
    eyecatch: convertGraphqlRawMediaToImg(rawPost.featuredImage.node),
    id: rawPost.id,
    slug: rawPost.slug,
    title: rawPost.title,
  };
};
