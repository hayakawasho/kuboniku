import axios from 'axios'
import { ok, err, Result } from 'neverthrow'
import { httpErrorHandler, RpcError } from '@/errors'

const findWorks = async (where: {
  count: number
}): Promise<Result<any, RpcError>> => {
  return axios
    .get(`/v1/works-${where.count}.json`)
    .then(res => ok(res.data))
    .catch(e => err(httpErrorHandler(e)))
}

export { findWorks }
