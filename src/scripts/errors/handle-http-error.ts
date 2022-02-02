import axios from 'axios'
import { RpcError } from '@/errors'

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

export { httpErrorHandler }
