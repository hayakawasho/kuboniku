import { WorksRepo } from './works/works-repo'

const repositories = {
  works: WorksRepo.create(),
}

const repositoryFactory = {
  get: (name: keyof typeof repositories) => repositories[name],
}

export { repositoryFactory }
