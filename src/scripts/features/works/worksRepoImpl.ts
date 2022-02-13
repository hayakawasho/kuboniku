import axios from 'axios'
import { ok, err } from 'neverthrow'
import { IWorksRepo } from '@/components/model/works'
import { httpErrorHandler } from 'utils'

class WorksRepoImpl extends IWorksRepo {
  findTen = async (where: { offset: number }) => {
    return axios
      .get(`/v1/works-${where.offset}.json`)
      .then(res => ok(res.data))
      .catch(e => err(httpErrorHandler(e)))
  }
}

export { WorksRepoImpl }
