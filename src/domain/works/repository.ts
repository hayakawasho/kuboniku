import { Result } from "neverthrow"
import { HttpException } from "@/common/errors"
import { Work } from "@/domain/works"

abstract class IWorksRepo {
  abstract findOne(slug: string): Promise<Result<Work, HttpException>>

  abstract findSome({
    where: { size, offset },
  }: {
    where: {
      size: number
      offset: number
    }
  }): Promise<Result<Work[], HttpException>>

  abstract findAllSlug(): Promise<Result<string[], Error>>
}

export { IWorksRepo }
