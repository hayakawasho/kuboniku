import { WorksRepository } from './works/works-repository-impl';

const REPOSITORIES = ['works'] as const;

type Unpacked<T> = T extends { [K in keyof T]: infer U } ? U : never;
type TRespositoryKeys = Unpacked<typeof REPOSITORIES>;

const repositories = {
  works: new WorksRepository(),
};

const repositoryFactory = {
  get: (name: TRespositoryKeys) => repositories[name],
};

export { repositoryFactory };
