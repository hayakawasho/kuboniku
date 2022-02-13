import type { Result } from 'neverthrow'
import type { RpcError } from 'utils'

abstract class IWorksRepo {
  abstract findTen(where: { offset: number }): Promise<Result<any[], RpcError>>
}

export { IWorksRepo }
