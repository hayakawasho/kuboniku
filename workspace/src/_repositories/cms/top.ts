import axios from "redaxios";
import { convertGraphqlRawMediaToImg } from "./converter";
import type { WorkMetadata } from "../../_components/works";

export const createTopElementsRepository = () => ({
  find: async (): Promise<{ works: WorkMetadata[] }> => {
    const res = await axios<any>({
      data: {
        query: `query {
          page(id: "972", idType: DATABASE_ID) {
            topAcf {
              works {
                nodes {
                  ... on Post {
                    id
                    slug
                    title
                    featuredImage {
                      node {
                        sourceUrl
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                    worksAcf {
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
      works: res.data.data.page.topAcf.works.nodes.map((item: any) => {
        return {
          id: item.id,
          slug: item.slug,
          title: item.title,
          eyecatch: item.featuredImage
            ? convertGraphqlRawMediaToImg(item.featuredImage.node)
            : convertGraphqlRawMediaToImg(item.acf.eyecatch.node),
        };
      }),
    };
  },
});
