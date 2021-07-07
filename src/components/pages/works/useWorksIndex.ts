import { useCallback, useState, useEffect, useMemo } from 'react';
import { useSWRInfinite } from 'swr';
import { TRawWorksList } from '@/domain/works/worksEntity';
import { GET_OFFSET_POSTS } from '@/domain/works/worksIndex.gql';
import { Utils } from '@/foundation/utils';
import { useHandleHttpErrorContext } from '@/context';
import { fetcher } from '@/foundation/lib/fetcher';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E];
type TWorksList = TRawWorksList;

const PER_PAGE = 10;

const useWorksIndex = (initialData: TWorksList, totalPosts: number) => {
  const [status, setStatus] = useState<TStatus<string>>(['idle']);
  const { handleHttpError } = useHandleHttpErrorContext();

  const result = useSWRInfinite<TWorksList, Error>(
    pageIndex => GET_OFFSET_POSTS(pageIndex * PER_PAGE, PER_PAGE),
    (key: string) => {
      return fetcher(key);
    },
    {
      initialData: [initialData],
    }
  );

  const data: TWorksList[] = result.data ? [].concat(...result.data) : [];

  const newData = useMemo(
    () =>
      data.flatMap((item, i) =>
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
      ),
    [data]
  );

  const onLoadMore = useCallback(() => {
    result.setSize(result.size + 1);
  }, [result.size]);

  useEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', error.message]);
    } else if (result.isValidating) {
      setStatus(['loading']);
    } else if (result.data) {
      setStatus(['success']);
    }
  }, [result.error, handleHttpError, result.isValidating, result.data]);

  return [newData, status, { onLoadMore }] as const;
};

export { useWorksIndex };
