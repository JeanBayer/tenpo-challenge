import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Paginated {
  @Expose()
  count: number;

  @Expose()
  limit: number;

  @Expose()
  offset: number;
}

@Exclude()
export class PaginatedResponseDto<T> {
  @Expose()
  data: T[];

  @Expose()
  paginated: Paginated;
}
