import { useMemo } from 'react';
import { Post } from '@/__generated__/graphql';
import { useRequest } from '@/common/hooks';
import { Utils } from '@/common/utils';
import { IWorksRepo } from '@/domain/works';

const useHomeUsecase = (initialData: Post[], repository: IWorksRepo) => {
  const [rawData, status] = useRequest<>(
    `/api/home`,
    async () => {
      const result = await repository.findSome({ size: 4 });

      if (result.isErr()) {
        return Promise.reject(result.error);
      }

      return result.value;
    },
    {
      fallback: initialData,
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
