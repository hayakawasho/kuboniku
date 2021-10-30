import { Result } from 'neverthrow';
import type { IMetaWork, IRawWork } from '../works/work';

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
