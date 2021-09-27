import { Post, Post_Acf, Category } from '../generated/graphql';

interface IRawWork {
  post: {
    id: string;
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
  id: string;
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

interface IMetaWorkSummary {
  id: string;
  slug: string;
  title: string;
  category: string;
  eyecatch: {
    src: string;
  };
  role?: string[];
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

  constructor({
    id,
    slug,
    title,
    category,
    eyecatch,
    createAt,
    role,
    viewWebsite,
    gallery,
  }: IMetaWork) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.category = category;
    this.eyecatch = eyecatch;
    this.createAt = createAt;
    this.role = role;
    this.viewWebsite = viewWebsite;
    this.gallery = gallery;
  }

  static fromJson = (raw: IRawWork) => {
    const id = raw.post.id;
    const slug = raw.post.slug;
    const title = raw.post.title;
    const category = raw.post.acf.category.name;
    const eyecatch = {
      src: raw.post.acf.eyecatch.sourceUrl,
      mobile: raw.post.acf.eyecatchMobile?.sourceUrl,
    };
    const createAt = new Date(raw.post.date);
    const role = raw.post.acf.role.map(item => item.name);
    const viewWebsite = raw.post.acf.url;
    const gallery = raw.post.acf.gallery?.map(item => {
      return {
        width: item.mediaDetails.width,
        height: item.mediaDetails.height,
        src: item.sourceUrl,
        srcSet: item.srcSet,
      };
    });

    return new Work({
      id,
      slug,
      title,
      category,
      eyecatch,
      createAt,
      role,
      viewWebsite,
      gallery,
    });
  };
}

export type { IMetaWork, IRawWork };
export { Work };
