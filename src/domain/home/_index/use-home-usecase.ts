import { useMemo } from 'react';
import { TRawWorksList, worksGateway } from '@/domain/works';
import { useRequest } from '@/foundation/hooks';
import { Utils } from '@/foundation/utils';

const useHomeUsecase = (initialData: TRawWorksList) => {
  const [rawData, status] = useRequest<TRawWorksList>(
    `/api/home`,
    async () => {
      const res = await worksGateway().findSome(4);

      if (res.isLeft()) {
        return Promise.reject(res.value);
      }

      return res.value;
    },
    {
      initialData,
    }
  );

  const getWorksInfo = useMemo(() => {
    const viewWorks = {
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

    return viewWorks;
  }, [rawData]);

  return [getWorksInfo, status] as const;
};

export { useHomeUsecase };
