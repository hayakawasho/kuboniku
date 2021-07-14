import { gql } from 'graphql-request';
import { fetcher } from '@/foundation/lib/fetcher';
import { TRawWorksId } from '@/domain/model/entity/works';

const GET_POST = gql`
  query GET_POST($slug: String) {
    post: postBy(slug: $slug) {
      title
      date
      previous {
        title
        slug
        acf {
          eyecatch {
            sourceUrl
            srcSet
          }
          eyecatchMobile {
            sourceUrl
            srcSet
          }
        }
      }
      acf {
        eyecatch {
          sourceUrl
          srcSet
        }
        eyecatchMobile {
          sourceUrl
          srcSet
        }
        category {
          name
        }
        role {
          name
        }
        themeColor
        url
        gallery {
          sourceUrl
          srcSet
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
`;

const workResository = () => {
  const find = async (slug: string) => {
    return fetcher<TRawWorksId>(GET_POST, { slug });
  };

  return { find };
};

export { workResository };
