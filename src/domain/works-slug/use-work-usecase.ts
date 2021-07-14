import { useMemo } from 'react';
import { TRawWorksId } from '@/domain/model/entity/works';
import { useFetch } from '@/foundation/hooks';
import { workRepository } from './work-repository';

const useWorkUsecase = (initialData: TRawWorksId, slug: string) => {
  const [data, status] = useFetch<TRawWorksId>(
    `/api/works/${slug}`,
    () => {
      return workRepository().find(slug);
    },
    {
      initialData,
    }
  );

  const getWorksInfo = useMemo(() => {
    const viewWorks = {
      title: data.post.title,
      category: data.post.acf.category.name,
      eyecatch: {
        src: data.post.acf.eyecatch.sourceUrl,
        srcSet: data.post.acf.eyecatch.srcSet,
        mobile: data.post.acf.eyecatchMobile?.sourceUrl,
      },
      date: new Date(data.post.date),
      role: data.post.acf.role.map(i => i.name),
      viewWebsite: data.post.acf.url,
      gallery: data.post.acf.gallery?.map(i => {
        return {
          width: i.mediaDetails.width,
          height: i.mediaDetails.height,
          src: i.sourceUrl,
          srcSet: i.srcSet,
        };
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

    return viewWorks;
  }, [data]);

  return [getWorksInfo, status] as const;
};

export { useWorkUsecase };
