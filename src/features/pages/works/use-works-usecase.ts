import { useCallback, useState, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { TRawWorksList, IWorksRepository } from '@/domain/works';
import { Utils } from '@/common/utils';
import { useUpdateEffect } from 'react-use';
import { useHandleHttpError } from '@/common/hooks/';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E];
type TWorksList = TRawWorksList;

const PER_PAGE = 10;

const useWorksUsecase = (
  initialData: TWorksList,
  totalPosts: number,
  repository: IWorksRepository
) => {
  const [status, setStatus] = useState<TStatus<string>>(['idle']);
  const { handleHttpError } = useHandleHttpError();

  const result = useSWRInfinite<TWorksList, Error>(
    pageIndex => {
      return ['/api/works/?page=' + pageIndex, pageIndex * PER_PAGE];
    },
    async (_, offset: number) => {
      const result = await repository.findSome({ size: PER_PAGE, offset });

      if (result.isErr()) {
        return Promise.reject(result.error);
      }

      return result.value;
    },
    {
      fallback: [initialData],
    }
  );

  const rawWorksInfo: TWorksList[] = result.data
    ? [].concat(...result.data)
    : [];

  const getWorksInfo = useMemo(() => {
    const viewWorks = rawWorksInfo.flatMap((item, i) =>
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
  }, [rawWorksInfo]);

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
