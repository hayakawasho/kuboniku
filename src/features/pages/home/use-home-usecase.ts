import { useMemo } from 'react';
import { IWorksRepo } from '@/domain/works';
import { Post } from '@/domain/generated/graphql';
import { useRequest } from '@/common/hooks';
import { Utils } from '@/common/utils';

const useHomeUsecase = (initialData: Post[], repo: IWorksRepo) => {
  const [rawData, status] = useRequest<>(
    `/api/home`,
    async () => {
      const result = await repo.findSome({ size: 4 });

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
