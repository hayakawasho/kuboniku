import { useRequest } from '~/hooks/useRequest';
import { IWorks } from '~/models/works';
import { request, gql } from 'graphql-request';
import { WP_API_END_POINT } from '~/foundation/constants/const';

const useWorksValue = variables => {
  const [data, status] = useRequest<IWorks>('works', ({ ok, error }) => {
    request<IWorks>(WP_API_END_POINT, GET_POST, variables)
      .then(res => {
        ok = res;
      })
      .catch(e => {
        error = e;
      });
  });

  return [data, status] as const;
};

export { useWorksValue };

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
          srcSet
        }
        category {
          name
        }
        role {
          name
        }
        themeColor
        description
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
