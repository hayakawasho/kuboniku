import axios from 'axios'
import { ok, err } from 'neverthrow'
import { WP_API_BASE } from '@/const'
import { IWorksRepo, Work } from '@/domain/works'
import { handleHttpError } from '@/errors'

class WorksRepo extends IWorksRepo {
  constructor() {
    super()
  }

  async findWorks({
    where,
  }: Parameters<IWorksRepo['findSome']>[number]): ReturnType<
    IWorksRepo['findSome']
  > {
    try {
      const res = await axios('/works-0.json', {
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
