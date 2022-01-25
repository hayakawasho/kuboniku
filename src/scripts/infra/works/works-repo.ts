import { ok, err } from 'neverthrow'
import { WP_API_BASE } from '@/const'
import { IWorksRepo, Work } from '@/domain/works'
import { handleHttpError } from '@/errors'

class WorksRepo extends IWorksRepo {
  constructor() {
    super()
  }

  async findOne(slug: string): ReturnType<IWorksRepo['findOne']> {
    try {
      return ok(entity)
    } catch (e) {
      return err(handleHttpError(e))
    }
  }

  async findSome({
    where,
  }: Parameters<IWorksRepo['findSome']>[number]): ReturnType<
    IWorksRepo['findSome']
  > {
    try {
      const res = await request<any>(WP_API_BASE, GET_POSTS, {
        offset: where.offset,
        size: where.size,
      })
      return ok(res)
    } catch (e) {
      return err(handleHttpError(e))
    }
  }
}

export { WorksRepo }
