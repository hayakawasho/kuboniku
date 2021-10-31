import { useMemo } from "react"
import { useHttp } from "@/common/hooks"
import { IRawWork, IWorksRepo, Work } from "@/domain/works"

type IProps = {
  initial: IRawWork
  slug: string
  repository: IWorksRepo
}

const useWorkUsecase = ({ initial, slug, repository }: IProps) => {
  const [data, status] = useHttp<IRawWork>(
    `/api/works/${slug}`,
    async () => {
      const result = await repository.findOne(slug)

      if (result.isErr()) {
        return Promise.reject(result.error)
      }

      return result.value
    },
    {
      fallback: initialData,
    }
  )

  const getWorkInfo = useMemo(() => {
    const viewWork = {
      ...new Work(data.post),
      prev: {
        ...new Work(data.post.previous),
      },
    }

    return viewWork
  }, [data])

  return [getWorkInfo, status] as const
}

export { useWorkUsecase }
