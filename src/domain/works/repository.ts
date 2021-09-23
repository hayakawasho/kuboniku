import type { IMetaWork, IRawWork } from '../works/work';
import { Result } from 'neverthrow';

interface IWorksRepo {
  findOne(slug: string): Promise<Result<IRawWork, Error>>;
  findSome({
    size,
    offset,
  }: {
    size: number;
    offset: number;
  }): Promise<Result<IRawWork[], Error>>;
  findAllSlug(): Promise<Result<string[], Error>>;
}

export type { IWorksRepo };
