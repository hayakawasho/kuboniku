import { TRawWorksList, TRawWorksId } from '@/domain/works';
import { Result } from 'neverthrow';

interface IWorksRepository {
  findOne(slug: string): Promise<Result<TRawWorksId, Error>>;
  findSome({
    size,
    offset,
  }: {
    size: number;
    offset: number;
  }): Promise<Result<TRawWorksList, Error>>;
  findAllSlug(): Promise<Result<TRawWorksList, Error>>;
}

export type { IWorksRepository };
