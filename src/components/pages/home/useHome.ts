import { IRawWorksList } from '@/domain/works/worksEntity';
import { GET_POSTS } from '@/domain/home/home.gql';
import { useFetch } from '@/components/projects';
import { WP_API_END_POINT } from '@/foundation/constants/const';
import { request } from 'graphql-request';

const useHome = (initialData: IRawWorksList) => {
  const [data, status] = useFetch<IRawWorksList>(GET_POSTS, () => {
    return request(WP_API_END_POINT, GET_POSTS)
  }, {
    initialData
  });

  const newData = {
    posts: data.posts.nodes.map(node => {
      return {
        title: node.title,
        slug: node.slug,
        category: node.acf.category.name,
        eyecatch: {
          src: node.acf.eyecatch.sourceUrl,
          srcSet: node.acf.eyecatch.srcSet,
          mobile: node.acf.eyecatchMobile.sourceUrl
        }
      }
    }),
    totalPosts: data.posts.pageInfo.offsetPagination.total
  }

  return [newData, status] as const;
}

export { useHome }
