import { useMemo } from 'react';
import { TRawWorksList } from '@/domain/model/entity/works';
import { homeRepository } from './home-repository';
import { useFetch } from '@/foundation/hooks';
import { Utils } from '@/foundation/utils';

const useHomeUsecase = (initialData: TRawWorksList) => {
  const [data, status] = useFetch<TRawWorksList>(
    `/api/home`,
    () => homeRepository().findAll(),
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
            srcSet: node.acf.eyecatch.srcSet,
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
