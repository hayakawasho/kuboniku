import axios from "redaxios";
import { convertGraphqlRawMediaToImg } from "./converter";
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

  findItem: async ({ slug }: { slug: string }): Promise<WorkMetadata> => {
    const res = await axios<any>({
      data: {
        query: `query {
          post(id: "${slug}", idType: SLUG) {
            id
            title
            date
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
              eyecatchMobile {
                node {
                  sourceUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              themeColor
              url
              category {
                nodes {
                  name
                }
              }
              role {
                nodes {
                  name
                }
              }
              description
              gallery {
                nodes {
                  sourceUrl
                  mediaDetails {
                    height
                    width
                  }
                }
              }
              showreel {
                node {
                  sourceUrl
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

    const raw = res.data.data.post;

    return {
      id: raw.id,
      slug,
      title: raw.title,
      createAt: new Date(raw.date),
      theme: raw.worksAcf.themeColor,
      mv: {
        pc: convertGraphqlRawMediaToImg(raw.worksAcf.eyecatch.node),
        sp: (raw.worksAcf.eyecatchMobile &&
          convertGraphqlRawMediaToImg(raw.worksAcf.eyecatchMobile.node)) ?? {
          width: undefined,
          height: undefined,
          url: undefined,
        },
      },
      category: raw.worksAcf.category.nodes.map((j: any) => j.name),
      description: raw.worksAcf.description,
      siteUrl: raw.worksAcf.url,
      role: raw.worksAcf.role.nodes.map((j: any) => j.name),
      screenshots: raw.worksAcf.gallery?.nodes.map((i: any) => convertGraphqlRawMediaToImg(i)),
      showreel: raw.worksAcf.showreel && {
        url: raw.worksAcf.showreel.node.sourceUrl,
      },
    };
  },
});
