import { PaginatedResult } from "./paginated-result.interface";
import { SearchOptions } from "./search-option.interface";

export interface IRepository<T, TCreateInput , TUpdateInput> {
  findAll(options?: any): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: TCreateInput): Promise<T>;
  update(id: string, data: TUpdateInput): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  count(options?: any): Promise<number>;
  findFirst(where: any, include?: any): Promise<T | null>;
  findMany(options: SearchOptions): Promise<T[]>;
  findWithPagination(options: SearchOptions): Promise<PaginatedResult<T>>;
  search(searchTerm: string, searchFields: string[], include?: any): Promise<T[]>;
  findByIds(ids: string[]): Promise<T[]>;
  exists(query: any): Promise<boolean>;
}