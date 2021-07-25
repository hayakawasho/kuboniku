import { useMemo } from 'react';
import { TRawWorksList, worksGateway } from '@/domain/works';
import { useRequest } from '@/foundation/hooks';
import { Utils } from '@/foundation/utils';

const useHomeUsecase = (initialData: TRawWorksList) => {
  const [data, status] = useRequest<TRawWorksList>(
    `/api/home`,
    () => worksGateway().findArray(4),
    {
      initialData,
    }
  );

  const getWorksInfo = useMemo(() => {
    const viewWorks = {
      posts: data.posts.nodes.map((node, i) => {
        return {
          title: node.title,
          slug: node.slug,
          category: node.acf.category.name,
          index: Utils.zeroPadding(
            data.posts.pageInfo.offsetPagination.total - i,
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
  }, [data]);

  return [getWorksInfo, status] as const;
};

export { useHomeUsecase };
