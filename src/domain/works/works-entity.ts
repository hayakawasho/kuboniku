type TRawWorksAcf = {
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

type TRawWorksId = {
  post: {
    date: string;
    title: string;
    slug: string;
    acf: TRawWorksAcf;
    previous?: {
      title: string;
      slug: string;
      acf: TRawWorksAcf;
    };
  };
};

type TRawWorksList = {
  posts: {
    nodes: {
      slug: string;
      title: string;
      acf: TRawWorksAcf;
    }[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
};

export type { TRawWorksList, TRawWorksId };
