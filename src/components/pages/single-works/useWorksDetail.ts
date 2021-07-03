import { IRawWorksId } from '@/domain/works/worksEntity';
import { GET_POST } from '@/domain/works/worksDetail.gql';
import { useFetch } from '@/components/projects';
import { fetcher } from '@/foundation/lib/fetcher';

const useWorksDetail = (initialData: IRawWorksId, slug: string) => {
  const [data, status] = useFetch<IRawWorksId>(GET_POST, () => {
    return fetcher(GET_POST, { slug })
  }, {
    initialData
  });

  const newData = {
    title: data.post.title,
    category: data.post.acf.category.name,
    eyecatch: {
      src: data.post.acf.eyecatch.sourceUrl,
      srcSet: data.post.acf.eyecatch.srcSet,
      mobile: data.post.acf.eyecatchMobile?.sourceUrl
    },
    date: new Date(data.post.date),
    role: data.post.acf.role.map(i => i.name),
    viewWebsite: data.post.acf.url,
    gallery: data.post.acf.gallery?.map(i => {
      return {
        width: i.mediaDetails.width,
        height: i.mediaDetails.height,
        src: i.sourceUrl,
        srcSet: i.srcSet
      }
    }),
    prev: {
      slug: data.post.previous.slug,
      title: data.post.previous.title,
      eyecatch: {
        src: data.post.previous.acf.eyecatch.sourceUrl,
        srcSet: data.post.previous.acf.eyecatch.srcSet,
        mobile: data.post.previous.acf.eyecatchMobile?.sourceUrl,
      },
    },
  };

  return [newData, status] as const;
}

export { useWorksDetail }
