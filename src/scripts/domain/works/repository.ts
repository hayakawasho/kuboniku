import type { Result } from 'neverthrow'
import type { Work } from '@/domain/works'
import type { HttpException } from '@/errors'

abstract class IWorksRepo {
  abstract findOne(
    slug: string
  ): Promise<Result<Work & { prev: Work }, HttpException>>

  abstract findSome(where: {
    size: number
    offset: number
  }): Promise<Result<Work[], HttpException>>
}

export { IWorksRepo }
