import { useCallback, useState, useMemo } from "react"
import useSWRInfinite from "swr/infinite"
import { handleHttpError } from "@/common/errors"
import { useUpdateEffect } from "@/common/hooks"
import { Utils } from "@/common/utils"
import { IMetaWork, IWorksRepo } from "@/domain/works"

type IStatus<E> = ["idle" | "loading" | "success"] | ["error", E]

const PER_PAGE = 10

type IProps = {
  initial: IMetaWork[]
  totalPosts: number
  repository: IWorksRepo
}

const useWorksUsecase = ({ initial, totalPosts, repository }: IProps) => {
  const [status, setStatus] = useState<TStatus<string>>(["idle"])

  const result = useSWRInfinite<IMetaWork[], Error>(
    pageIndex => {
      return ["/api/works/?page=" + pageIndex, pageIndex * PER_PAGE]
    },
    async (_, offset: number) => {
      const res = await repository.findSome({ size: PER_PAGE, offset })

      if (res.isErr()) {
        return Promise.reject(res.error)
      }

      return res.value
    },
    {
      fallback: [initial],
    }
  )

  const rawWorksInfo: TWorksList[] = result.data
    ? [].concat(...result.data)
    : []

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
        }
      })
    )

    return viewWorks
  }, [rawWorksInfo])

  const handleLoadMoreWorksInfo = useCallback(() => {
    result.setSize(result.size + 1)
  }, [result.size])

  useUpdateEffect(() => {
    const error = handleHttpError(result.error)

    if (error) {
      setStatus(["error", error.message])
    } else if (result.data) {
      setStatus(["success"])
    } else if (result.isValidating) {
      setStatus(["loading"])
    }
  }, [result.error, handleHttpError, result.isValidating, result.data])

  return [getWorksInfo, status, { handleLoadMoreWorksInfo }] as const
}

export { useWorksUsecase }
