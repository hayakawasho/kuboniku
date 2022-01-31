import axios from 'axios'
import { ok, err, Result } from 'neverthrow'
import { handleHttpError, RpcError } from '@/errors'

const findWorks = async (where: {
  offset: number
}): Promise<Result<any, RpcError>> => {
  return axios
    .get(`/v1/works-${where.offset}.json`)
    .then(res => ok(res.data))
    .catch(e => err(handleHttpError(e)))
}

export { findWorks }
