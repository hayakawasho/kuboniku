import { useMemo } from 'react';
import { TRawWorksList, worksRepository } from '@/domain/works';
import { useRequest } from '@/foundation/hooks';
import { Utils } from '@/foundation/utils';

const useHomeUsecase = (initialData: TRawWorksList) => {
  const [rawData, status] = useRequest<TRawWorksList>(
    `/api/home`,
    async () => {
      const result = await worksRepository().findSome(4);

      if (result.isErr()) {
        return Promise.reject(result.error);
      }

      return result.value;
    },
    {
      initialData,
    }
  );

  const getWorksInfo = useMemo(() => {
    return {
      posts: rawData.posts.nodes.map((node, i) => {
        return {
          title: node.title,
          slug: node.slug,
          category: node.acf.category.name,
          index: Utils.zeroPadding(
            rawData.posts.pageInfo.offsetPagination.total - i,
            2
          ),
          eyecatch: {
            src: node.acf.eyecatch.sourceUrl,
            mobile: node.acf.eyecatchMobile.sourceUrl,
          },
        };
      }),
    };
  }, [rawData]);

  return [getWorksInfo, status] as const;
};

export { useHomeUsecase };
