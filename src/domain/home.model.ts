import { ICustomField } from '~/domain/works.model';
export interface IData {
  posts: {
    nodes: {
      slug: string;
      title: string;
      acf: ICustomField;
    }[];
    pageInfo: {
      offsetPagination: {
        total: number;
      };
    };
  };
}
