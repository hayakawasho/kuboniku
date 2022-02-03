import axios from 'axios'

/**
 * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
 */

type ErrorCodeName =
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

class RpcError extends Error {
  constructor(readonly code: ErrorCodeName, message?: string) {
    super(message)
    this.code = code
  }
}

const httpErrorHandler = (error: unknown) => {
  if (error instanceof RpcError) {
    return error
  }

  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 500:
        return new RpcError('UNKNOWN', error.message)
      case 404:
        return new RpcError('NOT_FOUND', error.message)
    }
  }

  return new RpcError('UNEXPECTED', 'Oops, an unexpected error has occurred.')
}

export { RpcError, httpErrorHandler }
