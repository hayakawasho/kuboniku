interface IRawWorksAcf {
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
    srcSet: string;
  };
  eyecatchMobile?: {
    sourceUrl: string;
    srcSet: string;
  };
}

type TRawWorksId = {
  post: {
    date: string;
    title: string;
    slug: string;
    acf: IRawWorksAcf;
    previous?: {
      title: string;
      slug: string;
      acf: IRawWorksAcf;
    };
  };
}

type TRawWorksList = {
  posts: {
    nodes: {
      slug: string;
      title: string;
      acf: IRawWorksAcf;
    }[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
}

export type { TRawWorksList, TRawWorksId };
