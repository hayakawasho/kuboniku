import type { WorkMetadata } from "../../_components/works";

type Image = {
  width: number;
  height: number;
  url: string;
};

const convertRawMediaToImg = (raw: any): Image => {
  return {
    height: raw.height,
    url: raw.url,
    width: raw.width,
  };
};

export const convertWorkFromCMS = (raw: any): WorkMetadata => {
  return {
    category: raw.acf.category.name,
    createAt: new Date(raw.date),
    description: raw.description,
    id: raw.id,
    role: raw.acf.role.map((j: any) => j.name),
    screenshots: raw.acf.gallery && raw.acf.gallery.map((i: any) => convertRawMediaToImg(i)),
    showreel: raw.acf.showreel,
    siteUrl: raw.acf.url,
    slug: raw.slug,
    theme: raw.acf.theme_color,
    thumb: {
      pc: convertRawMediaToImg(raw.acf.eyecatch),
      sp: convertRawMediaToImg(raw.acf.eyecatch_mobile),
    },
    title: raw.title.rendered,
  } as const;
};
