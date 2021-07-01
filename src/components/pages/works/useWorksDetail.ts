import { IRawWorksId } from '@/domain/works/worksEntity';
import { GET_POST } from '@/domain/works/worksDetail.gql';
import { useFetch } from '@/components/projects';
import { request } from 'graphql-request';
import { WP_API_END_POINT } from '@/foundation/constants/const';

const useWorksDetail = (initialData: IRawWorksId, slug: string) => {
  const [result, status] = useFetch<IRawWorksId>(GET_POST, () => {
    return request(WP_API_END_POINT, GET_POST, { slug })
  }, {
    initialData
  });

  const newData = {
    title: result.post.title,
    category: result.post.acf.category.name,
    eyecatch: {
      src: result.post.acf.eyecatch.sourceUrl,
      srcSet: result.post.acf.eyecatch.srcSet,
      mobile: result.post.acf.eyecatchMobile?.sourceUrl
    },
    date: new Date(result.post.date),
    role: result.post.acf.role.map(i => i.name),
    viewWebsite: result.post.acf.url,
    gallery: result.post.acf.gallery?.map(i => {
      return {
        width: i.mediaDetails.width,
        height: i.mediaDetails.height,
        src: i.sourceUrl,
        srcSet: i.srcSet
      }
    }),
    prev: {
      slug: result.post.previous.slug,
      title: result.post.previous.title,
      eyecatch: {
        src: result.post.previous.acf.eyecatch.sourceUrl,
        srcSet: result.post.previous.acf.eyecatch.srcSet,
        mobile: result.post.previous.acf.eyecatchMobile?.sourceUrl,
      },
    },
  };

  return [newData, status] as const;
}

export { useWorksDetail }
