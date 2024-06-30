import axios, { type RequestHeaders } from "redaxios";
import {
  convertRawPost2Work,
  convertRawPost2NextWork,
  convertRawPost2WorkForIndex,
} from "./converter";
import type { WorkMetadata } from "@/(work)";

const getItemQuery = (id: string, asPreview = false) => {
  return `query {
    posts(first: 99, where: {stati: [PUBLISH, PRIVATE]}) {
      nodes {
        id
      }
    }
    post(id: "${id}", idType: ${asPreview ? "DATABASE_ID" : "SLUG"}, asPreview: ${asPreview}) {
      id
      slug
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
      previous {
        id
        slug
        title(format: RENDERED)
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
          themeColor
        }
      }
    }
  }`;
};

export const createWorkRepository = (
  headers: RequestHeaders = {
    "Content-Type": "application/json",
  }
) => ({
  findById: async ({
    id,
    asPreview = false,
  }: {
    id: string;
    asPreview?: boolean;
  }): Promise<
    | {
        work: WorkMetadata & { index: number } & { next: WorkMetadata };
      }
    | undefined
  > => {
    try {
      const res = await axios<any>({
        data: {
          query: getItemQuery(id, asPreview),
        },
        headers,
        method: "POST",
        url: `https://wp.kuboniku.com/graphql`,
      });

      const rawPosts = res.data.data.posts.nodes;
      const rawPost = res.data.data.post;

      return {
        work: {
          ...convertRawPost2Work(rawPost),
          index: rawPosts.length - rawPosts.findIndex((item: any) => item.id === rawPost.id),
          next: rawPost.previous && (convertRawPost2NextWork(rawPost.previous) as WorkMetadata),
        },
      };
    } catch (error) {
      console.error(error);
    }
  },

  findList: async (): Promise<
    | {
        totalCount: number;
        works: WorkMetadata[];
      }
    | undefined
  > => {
    try {
      const res = await axios<any>({
        data: {
          query: `query {
            posts(first: 99, where: {stati: [PUBLISH, PRIVATE]}) {
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
        headers,
        method: "POST",
        url: `https://wp.kuboniku.com/graphql`,
      });

      const rawPosts = res.data.data.posts.nodes;

      return {
        totalCount: rawPosts.length,
        works: rawPosts.map(convertRawPost2WorkForIndex),
      };
    } catch (error) {
      console.error(error);
    }
  },
});
