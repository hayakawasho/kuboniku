import useSWR, { SWRResponse, SWRConfiguration } from "swr"
import { HttpException } from "@/common/errors"

const useHttp = <T>(
  key: string | string[] | null,
  fetcher: (...args: any) => Promise<T>, // TODO: 型
  options?: SWRConfiguration<T>
): SWRResponse<T, HttpException> => {
  const result = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    ...options,
  })

  return result
}

export { useHttp }
