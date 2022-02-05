import { WorksRepoImpl } from '../infra/works/repoImpl'

const repositoryFactory = {
  works: new WorksRepoImpl(),
}

export { repositoryFactory }
