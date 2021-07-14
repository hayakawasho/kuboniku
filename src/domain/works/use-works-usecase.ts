import { useCallback, useState, useEffect, useMemo } from 'react';
import { useSWRInfinite } from 'swr';
import { TRawWorksList } from '@/domain/model/entity/works';
import { Utils } from '@/foundation/utils';
import { useHandleHttpErrorContext } from '@/context';
import { worksResository } from './works-repository';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E];
type TWorksList = TRawWorksList;

const PER_PAGE = 10;

const useWorksUsecase = (initialData: TWorksList, totalPosts: number) => {
  const [status, setStatus] = useState<TStatus<string>>(['idle']);
  const { handleHttpError } = useHandleHttpErrorContext();

  const result = useSWRInfinite<TWorksList, Error>(
    pageIndex => {
      return ['/api/works/?page=' + pageIndex, pageIndex * PER_PAGE];
    },
    (_, offset: number) => {
      return worksResository().findAll(offset);
    },
    {
      initialData: [initialData],
    }
  );

  const data: TWorksList[] = result.data ? [].concat(...result.data) : [];

  const getWorksInfo = useMemo(() => {
    const viewWorks = data.flatMap((item, i) =>
      item.posts.nodes.map((node, j) => {
        return {
          title: node.title,
          slug: node.slug,
          index: Utils.zeroPadding(
            totalPosts - (j + (i + i * (PER_PAGE - 1))),
            2
          ),
          eyecatch: {
            src: node.acf.eyecatch.sourceUrl,
            srcSet: node.acf.eyecatch.srcSet,
          },
        };
      })
    );

    return viewWorks;
  }, [data]);

  const onLoadMoreWorksInfo = useCallback(() => {
    result.setSize(result.size + 1);
  }, [result.size]);

  useEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', error.message]);
    } else if (result.data) {
      setStatus(['success']);
    } else if (result.isValidating) {
      setStatus(['loading']);
    }
  }, [result.error, handleHttpError, result.isValidating, result.data]);

  return [getWorksInfo, status, { onLoadMoreWorksInfo }] as const;
};

export { useWorksUsecase };
