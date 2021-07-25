import { useMemo } from 'react';
import { useRequest } from '@/foundation/hooks';
import { TRawWorksId } from '@/domain/works';
import { worksRepository } from '../works-repository';

const useWorkUsecase = (initialData: TRawWorksId, slug: string) => {
  const [data, status] = useRequest<TRawWorksId>(
    `/api/works/${slug}`,
    () => {
      return worksRepository().findById(slug);
    },
    {
      initialData,
    }
  );

  const getWorkInfo = useMemo(() => {
    const viewWork = {
      title: data.post.title,
      category: data.post.acf.category.name,
      eyecatch: {
        src: data.post.acf.eyecatch.sourceUrl,
        // srcSet: data.post.acf.eyecatch.srcSet,
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
          // srcSet: data.post.previous.acf.eyecatch.srcSet,
          mobile: data.post.previous.acf.eyecatchMobile?.sourceUrl,
        },
      },
    };

    return viewWork;
  }, [data]);

  return [getWorkInfo, status] as const;
};

export { useWorkUsecase };
