import { NotFoundException, ConflictException } from "../exceptions/http.exception";
import { ValidationException } from "../exceptions/validation.exception";
import { PaginatedResult } from "../interfaces/paginated-result.interface";
import { IRepository } from "../interfaces/repository.interface";

export abstract class BaseService<T, TCreateInput, TUpdateInput> {
  constructor(
    protected readonly repository: IRepository<T, TCreateInput, TUpdateInput>
  ) {}

  async findAll(options?: any): Promise<T[]> {
    return this.repository.findAll(options);
  }

  async findById(id: string): Promise<T> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return record;
  }

  async create(data: TCreateInput): Promise<T> {
    const result = await this.repository.create(data);
    return result;
  }

  async update(id: string, data: TUpdateInput): Promise<T> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return deleted;
  }

  async count(options?: any): Promise<number> {
    return this.repository.count(options);
  }

  async findByIds(ids: string[]): Promise<T[]> {

    return (this.repository as any).findByIds(ids);
  }

  async findFirst(where: any, include?: any): Promise<T> {
    if (!where) {
      throw new ValidationException({ where: ['Where clause is required'] });
    }
    const result = await this.repository.findFirst(where, include);
    if (!result) {
      throw new NotFoundException('No matching record found');
    }
    return result;
  }

  async findMany(options: any): Promise<T[]> {
    return this.repository.findMany(options);
  }

  async findWithPagination(options: any): Promise<PaginatedResult<T>> {
    return this.repository.findWithPagination(options);
  }

  async search(searchTerm: string, searchFields: string[], include?: any): Promise<T[]> {
    if (!searchTerm || !Array.isArray(searchFields)) {
      throw new ValidationException({
        searchTerm: ['Search term is required'],
        searchFields: ['Search fields must be an array'],
      });
    }
    return this.repository.search(searchTerm, searchFields, include);
  }

  async exists(query: any): Promise<boolean> {
    if (!query || typeof query !== 'object') {
      throw new ValidationException({ query: ['Query must be an object'] });
    }
    return this.repository.exists(query);
  }
}
