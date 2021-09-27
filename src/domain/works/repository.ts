import type { IMetaWork, IRawWork } from '../works/work';
import { Result } from 'neverthrow';

abstract class IWorksRepo {
  abstract findOne(slug: string): Promise<Result<IRawWork, Error>>;
  abstract findSome({
    size,
    offset,
  }: {
    size: number;
    offset: number;
  }): Promise<Result<IRawWork[], Error>>;
  abstract findAllSlug(): Promise<Result<string[], Error>>;
}

export { IWorksRepo };
