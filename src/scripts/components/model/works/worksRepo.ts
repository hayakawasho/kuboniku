import type { Result } from 'neverthrow'
// import type { RpcError } from '@/foundation'

abstract class IWorksRepo {
  abstract findTen(where: { offset: number }): Promise<Result<any[], Error>>
}

export { IWorksRepo }
