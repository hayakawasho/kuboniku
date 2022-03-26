import axios from 'axios'
import { ok, err } from 'neverthrow'
import { IWorksRepo } from './worksRepo'
import { unknown2Error } from '@/foundation'

class WorksRepoImpl extends IWorksRepo {
  findTen = async (where: { offset: number }) => {
    return axios
      .get(`/v1/works-${where.offset}.json`)
      .then(res => ok(res.data))
      .catch(e => err(unknown2Error(e)))
  }
}

export { WorksRepoImpl }
