import { apiClient } from "@/_foundation/api";
import { convertGraphqlRawMediaToImg } from "./converter";
import type { WorkMetadata } from "@/_components/work";

export const createWorksRepository = () => ({
  findItem: async ({ slug }: { slug: string }): Promise<WorkMetadata | undefined> => {
    try {
      const res = await apiClient.post<any>("https://wp.kuboniku.com/graphql", {
        body: {
          query: `query {
            post(id: "${slug}", idType: SLUG) {
              id
              title(format: RENDERED)
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
      });

      const rawPost = res.data.data.post;

      return {
        category: rawPost.worksAcf.category.nodes.map((j: any) => j.name),
        createAt: new Date(rawPost.date),
        description: rawPost.worksAcf.description,
        id: rawPost.id,
        mv: {
          pc: convertGraphqlRawMediaToImg(rawPost.worksAcf.eyecatch.node),
          sp: (rawPost.worksAcf.eyecatchMobile &&
            convertGraphqlRawMediaToImg(rawPost.worksAcf.eyecatchMobile.node)) ?? {
            height: undefined,
            url: undefined,
            width: undefined,
          },
        },
        role: rawPost.worksAcf.role.nodes.map((j: any) => j.name),
        screenshots: rawPost.worksAcf.gallery?.nodes.map(convertGraphqlRawMediaToImg),
        showreel: rawPost.worksAcf.showreel && {
          url: rawPost.worksAcf.showreel.node.sourceUrl,
        },
        siteUrl: rawPost.worksAcf.url,
        slug,
        theme: rawPost.worksAcf.themeColor,
        title: rawPost.title,
      };
    } catch (error) {
      console.error(error);
    }
  },

  findList: async (): Promise<{
    totalCount: number;
    works: WorkMetadata[];
  }> => {
    const res = await apiClient.post<any>("https://wp.kuboniku.com/graphql", {
      body: {
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
    });

    const rawPosts = res.data.data.posts.nodes;

    return {
      totalCount: rawPosts.length,
      works: rawPosts.map((item: any) => {
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
