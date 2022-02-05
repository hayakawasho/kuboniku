import { WorksRepoImpl } from '@/features/works'

const repositoryFactory = {
  works: new WorksRepoImpl(),
}

export { repositoryFactory }
