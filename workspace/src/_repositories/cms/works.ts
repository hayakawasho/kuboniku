import axios from "redaxios";
import { convertWorkFromCMS, convertGraphqlRawMediaToImg } from "./converter";
import type { WorkMetadata } from "../../_components/works";

export const createWorksRepository = () => ({
  findList: async (): Promise<{
    totalCount: number;
    works: WorkMetadata[];
  }> => {
    const res = await axios<any>({
      data: {
        query: `query {
          posts(first: 99) {
            nodes {
              id
              title(format: RENDERED)
              slug
              worksAcf {
                themeColor
                eyecatch {
                  node {
                    sourceUrl
                    mediaDetails {
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        }`,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      url: `https://wp.kuboniku.com/graphql`,
    });

    return {
      totalCount: res.data.data.posts.nodes.length,
      works: res.data.data.posts.nodes.map((item: any) => {
        return {
          id: item.id,
          slug: item.slug,
          title: item.title,
          theme: item.worksAcf.themeColor,
          mv: {
            pc: convertGraphqlRawMediaToImg(item.worksAcf.eyecatch.node),
          },
        };
      }),
    };
  },

  findMany: async (
    q: any
  ): Promise<{
    totalCount: number;
    works: WorkMetadata[];
  }> => {
    const res = await axios<any>({
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      params: {
        ...q,
      },
      url: `https://wp.kuboniku.com/wp-json/wp/v2/posts`,
    });

    return {
      totalCount: Number(res.headers.get("x-wp-total")),
      works: res.data.map(convertWorkFromCMS),
    };
  },
});
