import { useCallback, useState, useMemo } from 'react';
import { useSWRInfinite } from 'swr';
import { TRawWorksList, worksRepository } from '@/domain/works';
import { Utils } from '@/foundation/utils';
import { useUpdateEffect } from '@/foundation/hooks';
import { useHandleHttpErrorContext } from '@/context';

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
      return worksRepository().findArray(PER_PAGE, offset);
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
            width: node.acf.eyecatch.mediaDetails.width,
            height: node.acf.eyecatch.mediaDetails.height,
          },
        };
      })
    );

    return viewWorks;
  }, [data]);

  const handleLoadMoreWorksInfo = useCallback(() => {
    result.setSize(result.size + 1);
  }, [result.size]);

  useUpdateEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', error.message]);
    } else if (result.data) {
      setStatus(['success']);
    } else if (result.isValidating) {
      setStatus(['loading']);
    }
  }, [result.error, handleHttpError, result.isValidating, result.data]);

  return [getWorksInfo, status, { handleLoadMoreWorksInfo }] as const;
};

export { useWorksUsecase };
