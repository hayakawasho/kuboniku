import { Post, Post_Acf, Category } from '../generated/graphql';
interface IRawWork {
  post: {
    date: string;
    title: string;
    slug: string;
    acf: {
      category: {
        name: string;
      };
      role: {
        name: string;
      }[];
      themeColor: string;
      url: string;
      gallery?: {
        sourceUrl: string;
        srcSet: string;
        mediaDetails: {
          width: number;
          height: number;
        };
      }[];
      eyecatch: {
        sourceUrl: string;
        mediaDetails: {
          width: number;
          height: number;
        };
      };
      eyecatchMobile?: {
        sourceUrl: string;
        mediaDetails: {
          width: number;
          height: number;
        };
      };
    };
  };
}

interface IMetaWork {
  slug: string;
  title: string;
  category: string;
  eyecatch: {
    src: string;
    mobile?: string;
  };
  createAt: Date;
  role?: string[];
  viewWebsite?: string;
  gallery?: {
    width: number;
    height: number;
    src: string;
    srcSet: string;
  }[];
}

class Work implements IMetaWork {
  readonly id;
  readonly slug;
  readonly title;
  readonly category;
  readonly eyecatch;
  readonly createAt;
  readonly role;
  readonly viewWebsite;
  readonly gallery;

  constructor(raw: IRawWork) {
    this.id = '';
    this.slug = raw.post.slug;
    this.title = raw.post.title;
    this.category = raw.post.acf.category.name;
    this.eyecatch = {
      src: raw.post.acf.eyecatch.sourceUrl,
      mobile: raw.post.acf.eyecatchMobile?.sourceUrl,
    };
    this.createAt = new Date(raw.post.date);
    this.role = raw.post.acf.role.map(item => item.name);
    this.viewWebsite = raw.post.acf.url;
    this.gallery = raw.post.acf.gallery?.map(item => {
      return {
        width: item.mediaDetails.width,
        height: item.mediaDetails.height,
        src: item.sourceUrl,
        srcSet: item.srcSet,
      };
    });
  }
}

export type { IMetaWork, IRawWork };
export { Work };
