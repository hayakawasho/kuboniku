import { WorksRepo } from './works/works-repo';

const REPOSITORIES = ['works'] as const;

type IUnpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;
type IRepoName = IUnpacked<typeof REPOSITORIES>;

const repositories = {
  works: new WorksRepo(),
};

const repositoryFactory = {
  get: (name: IRepoName) => repositories[name],
};

export { repositoryFactory };
