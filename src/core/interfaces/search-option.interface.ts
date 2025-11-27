
export interface SearchOptions {
  page?: number;
  pageSize?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
  where?: any;
  include?: any;
}