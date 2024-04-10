type Image = {
  width: number;
  height: number;
  url: string;
};

const convertGraphqlRawMediaToImg = (raw: any): Image => {
  return {
    height: raw.mediaDetails.height,
    url: raw.sourceUrl,
    width: raw.mediaDetails.width,
  };
};

export const convertRawPost2Work = (rawPost: any) => {
  return {
    category: rawPost.worksAcf.category.nodes.map((j: any) => j.name),
    createAt: new Date(rawPost.date),
    description: rawPost.worksAcf.description,
    id: rawPost.id,
    mv: {
      pc: convertGraphqlRawMediaToImg(rawPost.worksAcf.eyecatch.node),
      sp: (rawPost.worksAcf.eyecatchMobile &&
        convertGraphqlRawMediaToImg(rawPost.worksAcf.eyecatchMobile.node)) ?? {
        height: undefined,
        url: undefined,
        width: undefined,
      },
    },
    role: rawPost.worksAcf.role.nodes.map((j: any) => j.name),
    screenshots: rawPost.worksAcf.gallery?.nodes.map(convertGraphqlRawMediaToImg),
    showreel: rawPost.worksAcf.showreel && {
      url: rawPost.worksAcf.showreel.node.sourceUrl,
    },
    siteUrl: rawPost.worksAcf.url,
    slug: rawPost.slug,
    theme: rawPost.worksAcf.themeColor,
    title: rawPost.title,
  };
};

export const convertRawPost2NextWork = (rawPost: any) => {
  return {
    id: rawPost.id,
    mv: {
      pc: convertGraphqlRawMediaToImg(rawPost.worksAcf.eyecatch.node),
      sp: (rawPost.worksAcf.eyecatchMobile &&
        convertGraphqlRawMediaToImg(rawPost.worksAcf.eyecatchMobile.node)) ?? {
        height: undefined,
        url: undefined,
        width: undefined,
      },
    },
    slug: rawPost.slug,
    title: rawPost.title,
  };
};

export const convertRawPost2WorkForIndex = (rawPost: any) => {
  return {
    id: rawPost.id,
    mv: {
      pc: convertGraphqlRawMediaToImg(rawPost.worksAcf.eyecatch.node),
    },
    slug: rawPost.slug,
    theme: rawPost.worksAcf.themeColor,
    title: rawPost.title,
  };
};

export const convertRawPost2WorkForTop = (rawPost: any) => {
  return {
    eyecatch: convertGraphqlRawMediaToImg(rawPost.featuredImage.node),
    id: rawPost.id,
    slug: rawPost.slug,
    title: rawPost.title,
  };
};
