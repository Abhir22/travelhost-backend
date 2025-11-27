import { PrismaClient } from '@prisma/client';
import { PaginatedResult } from '../interfaces/paginated-result.interface';
import { SearchOptions } from '../interfaces/search-option.interface';
import { IRepository } from '../interfaces/repository.interface';

export abstract class BaseRepository<T, TCreateInput, TUpdateInput> implements IRepository<T, TCreateInput, TUpdateInput> {
  protected readonly prisma: PrismaClient;
  protected readonly modelName: string;
  private readonly _model: any;

  constructor(prisma: PrismaClient, modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
    this._model = (this.prisma as any)[this.modelName];
  }

  protected get model(): any {
    return this._model;
  }

  async findAll(options?: any): Promise<T[]> {
    return this.model.findMany(options);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async create(data: TCreateInput): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: TUpdateInput): Promise<T | null> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<boolean> {
    await this.model.delete({ where: { id } });
    return true;
  }

  async count(options?: any): Promise<number> {
    return this.model.count(options);
  }

  async findByIds(ids: string[]): Promise<T[]> {
    return this.model.findMany({ where: { id: { in: ids } } });
  }

  async findFirst(where: any, include?: any): Promise<T | null> {
    const options: any = { where };
    if (include) options.include = include;
    return this.model.findFirst(options);
  }

  async findMany(options: SearchOptions): Promise<T[]> {
    const queryOptions: any = {};

    if (options.where) queryOptions.where = options.where;
    if (options.include) queryOptions.include = options.include;
    if (options.orderBy) queryOptions.orderBy = options.orderBy;

    if (options.page && options.pageSize) {
      queryOptions.skip = (options.page - 1) * options.pageSize;
      queryOptions.take = options.pageSize;
    }

    return this.model.findMany(queryOptions);
  }

  async findWithPagination(options: SearchOptions): Promise<PaginatedResult<T>> {
    const { page = 1, pageSize = 10, where, include, orderBy } = options;

    const skip = (page - 1) * pageSize;
    const queryOptions: any = { skip, take: pageSize };

    if (where) queryOptions.where = where;
    if (include) queryOptions.include = include;
    if (orderBy) queryOptions.orderBy = orderBy;

    const [data, total] = await Promise.all([
      this.model.findMany(queryOptions),
      this.model.count({ where })
    ]);

    return {
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    };
  }

  async search(searchTerm: string, searchFields: string[], include?: any): Promise<T[]> {
    const trimmed = searchTerm.trim();
    const orConditions = searchFields.map(field => {
      if (field.includes('.')) {
        const [relation, nestedField] = field.split('.', 2);
        return {
          [relation]: {
            [nestedField]: {
              contains: trimmed
            }
          }
        };
      }

      return {
        [field]: {
          contains: trimmed
        }
      };
    });

    const options: any = {
      where: { OR: orConditions },
      take: 50
    };

    if (include) options.include = include;
    return this.model.findMany(options);
  }


  async exists(query: any): Promise<boolean> {
    const result = await this.model.findFirst({
      where: query,
      select: { id: true },
    });
    return !!result;
  }

}
