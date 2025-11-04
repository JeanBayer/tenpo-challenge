export interface Paginated {
  count: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  paginated: Paginated;
}
