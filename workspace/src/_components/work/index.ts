import type { Image } from "../image";

export type WorkMetadata = {
  id: string;
  title: string;
  slug: string;
  createAt: Date;
  category: string;
  eyecatch?: Image;
  mv: {
    pc: Image;
    sp: Image;
  };
  theme: string;
  description?: string;
  siteUrl?: string;
  showreel?: {
    url: string;
  };
  role: string[];
  screenshots?: Image[];
};
