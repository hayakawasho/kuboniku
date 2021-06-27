interface ISrcUrl {
  src: string;
}
interface ICustomField {
  category: {
    name: string;
  };
  role: {
    name: string;
  }[];
  themeColor: string;
  url: string;
  gallery: {
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
  eyecatchMobile: {
    sourceUrl: string;
    srcSet: string;
  };
}

interface IWorks {
  post: {
    date: string;
    title: string;
    acf: ICustomField;
    previous: {
      title: string;
      slug: string;
      acf: ICustomField;
    };
  };
  pageInfo: {
    offsetPagination: {
      total: number;
    };
  };
}

export type { IWorks, ICustomField };
