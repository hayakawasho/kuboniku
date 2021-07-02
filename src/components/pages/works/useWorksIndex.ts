import { useCallback, useState, useEffect } from 'react';
import { useSWRInfinite } from 'swr';
import { IRawWorksList } from '@/domain/works/worksEntity';
import { GET_OFFSET_POSTS } from '@/domain/works/worksIndex.gql';
import { WP_API_END_POINT } from '@/foundation/constants/const';
import { request } from 'graphql-request';
import { useHandleHttpError } from '../../projects/api-fetch/useHandleHttpError';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E]

const PER_PAGE = 10;

const useWorksIndex = (initialData: IRawWorksList) => {
  const [status, setStatus] = useState<TStatus<Error>>(['idle']);
  const { handleHttpError } = useHandleHttpError();

  const result = useSWRInfinite<IRawWorksList, Error>(
    (pageIndex) => {
      return GET_OFFSET_POSTS(pageIndex * PER_PAGE, PER_PAGE)
    },
    (key: string) => {
      return request(WP_API_END_POINT, key)
    },
    {
      initialData: [initialData],
    }
  );

  const data: IRawWorksList[] = result.data ? [].concat(...result.data) : [];

  const newData = data.map(item => {
    return item.posts.nodes.map(node => {
      return {
        title: node.title,
        slug: node.slug,
        eyecatch: {
          src: node.acf.eyecatch.sourceUrl,
          srcSet: node.acf.eyecatch.srcSet,
        },
        projectIndex: 0,
      }
    })
  }).flatMap(i => i);

  const onLoadMore = useCallback(() => {
    result.setSize(result.size + 1)
  }, [result.size]);

  useEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', error]);
    }

  }, [result.error, handleHttpError]);

  return [newData, status, { onLoadMore }] as const;
}

export { useWorksIndex }
