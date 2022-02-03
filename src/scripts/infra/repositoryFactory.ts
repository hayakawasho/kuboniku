import { WorksRepoImpl } from './works/repoImpl'

const repositories = {
  works: new WorksRepoImpl(),
}

const repositoryFactory = {
  get: (name: keyof typeof repositories) => repositories[name],
}

export { repositoryFactory }
