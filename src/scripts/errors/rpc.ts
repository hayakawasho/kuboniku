/**
 * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
 */

type IErrorCodeName =
  | 'OK'
  | 'CANCELLED'
  | 'UNKNOWN'
  | 'INVALID_ARGUMENT'
  | 'DEADLINE_EXCEEDED'
  | 'NOT_FOUND'
  | 'ALREADY_EXISTS'
  | 'PERMISSION_DENIED'
  | 'UNAUTHENTICATED'
  | 'RESOURCE_EXHAUSTED'
  | 'FAILED_PRECONDITION'
  | 'ABORTED'
  | 'OUT_OF_RANGE'
  | 'UNIMPLEMENTED'
  | 'INTERNAL'
  | 'UNAVAILABLE'
  | 'DATA_LOSS'
  | 'UNEXPECTED'

class HttpException extends Error {
  constructor(readonly code: IErrorCodeName, message?: string) {
    super(message)
    this.code = code
  }
}

export type { IErrorCodeName }
export { HttpException }
