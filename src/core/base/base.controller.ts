import { Request, Response } from 'express';
import { IService } from '../interfaces/service.interface';
import { asyncHandler } from '../middlewares/error.middleware';
import { SuccessResponse, PaginatedResponse } from '../utils/api-response';
import { NotFoundException, BadRequestException } from '../exceptions/http.exception';
import { BaseResponse } from './response/base.response';
import { ZodSchema, ZodType } from 'zod';
import { ValidationUtil } from '../utils/validate-and-transform';
import { RequestOptionBuilder } from '@/core/utils/request-option-builder';




type BaseControllerOptions<T, TCreateInput, TUpdateInput> = {
  service: IService<T, TCreateInput, TUpdateInput>;
  responseClass: new (entity: T) => BaseResponse<T>;
  createSchema?: ZodType<TCreateInput, any, any>;
  updateSchema?: ZodType<TUpdateInput, any, any>;
  searchFields?: string[];
  searchInclude?: any;
  defaultInclude?: any;
  querySchemas?: {
    includeSchema?: ZodSchema<any>;
    orderBySchema?: ZodSchema<any>;
    whereSchema?: ZodSchema<any>;
    paginationSchema?: ZodSchema<{
      page?: number;
      pageSize?: number;
    }>;
  };
};

export abstract class BaseController<T, TCreateInput = any, TUpdateInput = any> {
  protected service: IService<T, TCreateInput, TUpdateInput>;
  protected responseClass: new (entity: T) => BaseResponse<T>;
  protected searchFields: string[] = [];
  protected searchInclude: any;
  protected defaultInclude: any;
  protected createSchema?: ZodType<TCreateInput, any, any>;
  protected updateSchema?: ZodType<TUpdateInput, any, any>;
  protected querySchemas: {
    includeSchema: ZodSchema<any>;
    orderBySchema: ZodSchema<any>;
    whereSchema: ZodSchema<any>;
    paginationSchema: ZodSchema<{
      page?: number;
      pageSize?: number;
    }>;
  };

  constructor(options: BaseControllerOptions<T, TCreateInput, TUpdateInput>) {
    this.service = options.service;
    this.responseClass = options.responseClass;
    this.createSchema = options.createSchema;
    this.updateSchema = options.updateSchema;
    this.searchFields = options.searchFields || [];
    this.searchInclude = options.searchInclude;
    this.defaultInclude = options.defaultInclude;
    this.querySchemas = {
      ...RequestOptionBuilder.getDefaultQuerySchemas(),
      ...(options.querySchemas || {})
    };
  }

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const options = RequestOptionBuilder.buildFindOptions(req, this.querySchemas);
    if (!options.include) {
      options.include = { Profile: true };
    }
    const records = await this.service.findAll(options);
    const responseData = BaseResponse.mapMany(records, this.responseClass);
    return SuccessResponse.get(responseData).send(res);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const record = await this.service.findById(id);

    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    const responseData = BaseResponse.mapOne(record, this.responseClass);
    return SuccessResponse.get(responseData).send(res);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    if( !this.createSchema) {
      throw new BadRequestException('Create schema is not defined');
    }
    const createDto = await ValidationUtil.validate<TCreateInput>(req.body, this.createSchema);
    const newRecord = await this.service.create(createDto);
    const responseData = BaseResponse.mapOne(newRecord, this.responseClass);
    return SuccessResponse.create(responseData).send(res);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!this.updateSchema) {
      throw new BadRequestException('Update schema is not defined');
    }
    const updateDto = await ValidationUtil.validate<TUpdateInput>(
      req.body,
      this.updateSchema,
      {allowEmpty: true}, // allowEmpty = true for updates
    );

    const updatedRecord = await this.service.update(id, updateDto);

    if (!updatedRecord) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    const responseData = BaseResponse.mapOne(updatedRecord, this.responseClass);
    return SuccessResponse.update(responseData).send(res);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await this.service.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }

    return SuccessResponse.delete({ id, deleted: true }).send(res);
  });

  findWithPagination = asyncHandler(async (req: Request, res: Response) => {
    const options = RequestOptionBuilder.buildSearchOptions(req, this.querySchemas);
    const result = await this.service.findWithPagination(options);
    const responseData = BaseResponse.mapMany(result.data, this.responseClass);
    return PaginatedResponse.paginated(
      responseData,
      result.page,
      result.pageSize,
      result.total,
    ).send(res);
  });

  search = asyncHandler(async (req: Request, res: Response) => {
    const { q: searchTerm } = req.query;

    if (!searchTerm || typeof searchTerm !== 'string') {
      throw new BadRequestException('Search term (q) is required');
    }

    const searchFields = this.searchFields;
    const include = this.searchInclude;

    const records = await this.service.search(searchTerm, searchFields, include);
    const responseData = BaseResponse.mapMany(records, this.responseClass);
    return SuccessResponse.get(
      responseData,
      `Found ${records.length} results for "${searchTerm}"`,
    ).send(res);
  });

  count = asyncHandler(async (req: Request, res: Response) => {
    const options = RequestOptionBuilder.buildFindOptions(req, this.querySchemas);
    const count = await this.service.count(options);
    return SuccessResponse.get({ count }).send(res);
  });
}