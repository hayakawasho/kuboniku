import { WorksRepo } from './works/works-repo-impl';

const REPOSITORIES = ['works'] as const;

type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;
type TRepoName = Unpacked<typeof REPOSITORIES>;

const repositories = {
  works: new WorksRepo(),
};

const repositoryFactory = {
  get: (name: TRepoName) => repositories[name],
};

export { repositoryFactory };
