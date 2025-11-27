import { PaginatedResult } from "./paginated-result.interface";
import { SearchOptions } from "./search-option.interface";

export interface IService<T, TCreateInput, TUpdateInput> {
  findAll(options?: any): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: TCreateInput): Promise<T>;
  update(id: string, data: TUpdateInput): Promise<T | null>;
  search(searchTerm: string, fields: string[], include?: any): Promise<T[]>;
  findWithPagination(options: SearchOptions): Promise<
  PaginatedResult<T>>;
  findByIds(ids: string[]): Promise<T[]>;
  findFirst(where: any, include?: any): Promise<T | null>;
  findMany(options: SearchOptions): Promise<T[]>;
  delete(id: string): Promise<boolean>;
  count(options?: any): Promise<number>;
}
