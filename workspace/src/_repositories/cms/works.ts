import axios from "redaxios";
import { convertGraphqlRawMediaToImg } from "./converter";
import type { WorkMetadata } from "@/_components/work";

export const createWorksRepository = () => ({
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
      category: raw.worksAcf.category.nodes.map((j: any) => j.name),
      createAt: new Date(raw.date),
      description: raw.worksAcf.description,
      id: raw.id,
      mv: {
        pc: convertGraphqlRawMediaToImg(raw.worksAcf.eyecatch.node),
        sp: (raw.worksAcf.eyecatchMobile &&
          convertGraphqlRawMediaToImg(raw.worksAcf.eyecatchMobile.node)) ?? {
          height: undefined,
          url: undefined,
          width: undefined,
        },
      },
      role: raw.worksAcf.role.nodes.map((j: any) => j.name),
      screenshots: raw.worksAcf.gallery?.nodes.map(convertGraphqlRawMediaToImg),
      showreel: raw.worksAcf.showreel && {
        url: raw.worksAcf.showreel.node.sourceUrl,
      },
      siteUrl: raw.worksAcf.url,
      slug,
      theme: raw.worksAcf.themeColor,
      title: raw.title,
    };
  },

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
          mv: {
            pc: convertGraphqlRawMediaToImg(item.worksAcf.eyecatch.node),
          },
          slug: item.slug,
          theme: item.worksAcf.themeColor,
          title: item.title,
        };
      }),
    };
  },
});
