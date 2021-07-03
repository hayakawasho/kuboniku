import { IRawWorksList } from '@/domain/works/worksEntity';
import { GET_POSTS } from '@/domain/home/home.gql';
import { useFetch } from '@/components/projects';
import { fetcher } from '@/foundation/lib/fetcher';
import Utils from '@/foundation/utils/Utils';

const useHome = (initialData: IRawWorksList) => {
  const [data, status] = useFetch<IRawWorksList>(GET_POSTS, () => fetcher(GET_POSTS), {
    initialData
  });

  const newData = {
    posts: data.posts.nodes.map((node, i) => {
      return {
        title: node.title,
        slug: node.slug,
        category: node.acf.category.name,
        index: Utils.zeroPadding(data.posts.pageInfo.offsetPagination.total - i, 2),
        eyecatch: {
          src: node.acf.eyecatch.sourceUrl,
          srcSet: node.acf.eyecatch.srcSet,
          mobile: node.acf.eyecatchMobile.sourceUrl
        }
      }
    })
  }

  return [newData, status] as const;
}

export { useHome }
