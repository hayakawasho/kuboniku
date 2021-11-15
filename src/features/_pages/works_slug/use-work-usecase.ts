import { useMemo } from "react"
import { useHttp } from "@/common/hooks"
import { IWorksRepo, Work } from "@/domain/works"

type IProps = {
  initial: any
  slug: string
  repository: IWorksRepo
}

const useWorkUsecase = ({ initial, slug, repository }: IProps) => {
  const result = useHttp(
    `/api/works/${slug}`,
    async () => {
      const result = await repository.findOne(slug)

      if (result.isErr()) {
        return Promise.reject(result.error)
      }

      return result.value
    },
    {
      fallback: initial,
    }
  )

  const getWorkInfo = useMemo(() => {
    if (!result.data) {
      return
    }

    console.log(result.data)

    // const viewWork = {
    //   ...Work.fromRaw(result.data.post),
    //   prev: {
    //     ...Work.fromRaw(result.data.post.previous),
    //   },
    // }
    // return viewWork
  }, [result.data])

  return getWorkInfo
}

export { useWorkUsecase }
