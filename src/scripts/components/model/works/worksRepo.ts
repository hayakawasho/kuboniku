import type { Result } from 'neverthrow'
import type { RpcError } from '@/features/error'

abstract class IWorksRepo {
  abstract findTen(where: { offset: number }): Promise<Result<any[], RpcError>>
}

export { IWorksRepo }
