import axios from 'axios'
import { ok, err } from 'neverthrow'
import { httpErrorHandler } from '@/app/errors'
import { IWorksRepo } from '@/domain/works'

class WorksRepoImpl extends IWorksRepo {
  findTen = async (where: { offset: number }) => {
    return axios
      .get(`/v1/works-${where.offset}.json`)
      .then(res => ok(res.data))
      .catch(e => err(httpErrorHandler(e)))
  }
}

export { WorksRepoImpl }
