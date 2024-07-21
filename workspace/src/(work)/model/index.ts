import type { Image } from "~/_foundation/models";

export type WorkMetadata = {
  id: string;
  title: string;
  slug: string;
  createAt: Date;
  category: string;
  eyecatch?: Partial<Image>;
  mv: {
    pc: Image;
    sp: Partial<Image>;
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
