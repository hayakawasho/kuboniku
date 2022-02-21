import { WorksRepoImpl } from '@/components/model/works/worksRepoImpl'

const repositoryFactory = {
  works: new WorksRepoImpl(),
}

export { repositoryFactory }
