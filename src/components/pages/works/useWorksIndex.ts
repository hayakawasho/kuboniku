import { useCallback, useState, useEffect } from 'react';
import { useSWRInfinite } from 'swr';
import { IRawWorksList } from '@/domain/works/worksEntity';
import { GET_OFFSET_POSTS } from '@/domain/works/worksIndex.gql';
import { WP_API_END_POINT } from '@/foundation/constants/const';
import Utils from '@/foundation/utils/Utils';
import { request } from 'graphql-request';
import { useHandleHttpError } from '@/components/projects';

type TStatus<E> = ['idle' | 'loading' | 'success'] | ['error', E];
type TWorksList = IRawWorksList;

const PER_PAGE = 10;

const useWorksIndex = (initialData: TWorksList, totalPosts: number) => {
  const [status, setStatus] = useState<TStatus<string>>(['idle']);
  const { handleHttpError } = useHandleHttpError();

  const result = useSWRInfinite<TWorksList, Error>(
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

  const data: TWorksList[] = result.data ? [].concat(...result.data) : [];

  const newData = data.map((item, i) => {
    return item.posts.nodes.map((node, j) => {
      return {
        title: node.title,
        slug: node.slug,
        eyecatch: {
          src: node.acf.eyecatch.sourceUrl,
          srcSet: node.acf.eyecatch.srcSet,
        },
        projectIndex: Utils.zeroPadding(totalPosts - (j + (i + i * (PER_PAGE - 1))), 2),
      }
    })
  }).flat();

  const onLoadMore = useCallback(() => {
    result.setSize(result.size + 1)
  }, [result.size]);

  useEffect(() => {
    const error = handleHttpError(result.error);

    if (error) {
      setStatus(['error', '' + error]);
    }
  }, [result.error, handleHttpError]);

  return [newData, status, { onLoadMore }] as const;
}

export { useWorksIndex }
