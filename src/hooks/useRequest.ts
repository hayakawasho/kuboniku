import { useQuery, useInfiniteQuery } from 'react-query';
import { request } from 'graphql-request';
import { left, right, Either, isLeft, isRight } from 'fp-ts/es6/Either';
import { WP_API_END_POINT } from '~/foundation/constants/const';

interface IProps {
  queryKey: string;
  gql: string;
}

const useRequest = <T>({ queryKey, gql }: IProps) => {
  return useQuery(queryKey, async () => {
    try {
      const res = await request<T>(WP_API_END_POINT, gql);
      return res;
    } catch (e) {
      throw e.error;
    }
  });
};

const useRequestInfinite = <T>() => {};

export { useRequest, useRequestInfinite };
