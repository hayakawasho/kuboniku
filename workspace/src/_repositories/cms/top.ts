import axios from "redaxios";
import type { WorkMetadata } from "../../_components/works";

const convertRawImgToImg = (raw: any) => {
  return {
    url: raw.sourceUrl,
    width: raw.mediaDetails.width,
    height: raw.mediaDetails.height,
  };
};

export const createTopElementsRepository = () => ({
  find: async (): Promise<{ works: WorkMetadata[] }> => {
    const res = await axios<any>({
      data: {
        query: `query {
          page(id: "972", idType: DATABASE_ID) {
            acf {
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
                    acf {
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
      works: res.data.data.page.acf.works.nodes.map((item: any) => {
        return {
          id: item.id,
          slug: item.slug,
          title: item.title,
          eyecatch: item.featuredImage
            ? convertRawImgToImg(item.featuredImage.node)
            : convertRawImgToImg(item.acf.eyecatch.node),
        };
      }),
    };
  },
});
