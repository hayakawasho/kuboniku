import type { ImageMetadata } from "../image";

export type WorkMetadata = {
  id: string;
  title: string;
  slug: string;
  createAt: Date;
  category: string;
  thumb: {
    pc: ImageMetadata;
    sp: ImageMetadata;
  };
  theme: string;
  description?: string;
  siteUrl?: string;
  showreel?: {
    url: string;
  };
  role: string[];
  screenshots?: ImageMetadata[];
};
