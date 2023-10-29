export type Work = {
  id: string;
  title: string;
  slug: string;
  createAt: Date;
  category: string;
  eyecatch: Image;
  eyecatchMobile?: Image;
  themeColor: string;
  siteUrl?: string;
  role: string[];
  gallery?: Image[];
};

type Image = {
  width: number;
  height: number;
  src: string;
  srcset?: string;
};
