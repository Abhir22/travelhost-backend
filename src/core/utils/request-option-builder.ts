// src/utils/controller-helper.util.ts
import { z } from 'zod';
import { BadRequestException } from '../exceptions/http.exception';
import { SearchOptions } from '../interfaces/search-option.interface';
import { Request } from 'express';
import { ValidationUtil } from './validate-and-transform';

export class RequestOptionBuilder {
  static getDefaultQuerySchemas() {
    return {
      includeSchema: z.record(z.any()).optional(),
      orderBySchema: z.record(z.enum(['asc', 'desc'])).optional(),
      whereSchema: z.record(z.any()).optional(),
      paginationSchema: z
        .object({
          page: z.number().int().positive(),
          pageSize: z.number().int().positive().max(100),
        })
        .strict(),
    };
  }
  static validateQueryParam<T>(value: string, schema: z.ZodSchema<T>): T {
    try {
      const parsed = JSON.parse(value);
      return ValidationUtil.validate<T>(parsed, schema, { allowEmpty: true });
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      // Error message for invalid JSON format
      throw new BadRequestException('Unable to parse query parameter', {
        details: {
          message: 'Invalid JSON format',
          originalValue: value,
        },
      });
    }
  }

  static buildFindOptions(req: Request, querySchemas: any): any {
    const options: any = {};

    if (req.query.include) {
      options.include = RequestOptionBuilder.validateQueryParam(
        req.query.include as string,
        querySchemas.includeSchema,
      );
    }

    if (req.query.orderBy) {
      options.orderBy = RequestOptionBuilder.validateQueryParam(
        req.query.orderBy as string,
        querySchemas.orderBySchema,
      );
    }

    if (req.query.where) {
      options.where = RequestOptionBuilder.validateQueryParam(
        req.query.where as string,
        querySchemas.whereSchema,
      );
    }

    return options;
  }

  static buildSearchOptions(req: Request, querySchemas: any): SearchOptions {
    const options: SearchOptions = {};

    // Handle pagination
    if (querySchemas.paginationSchema) {
      const pagination = RequestOptionBuilder.validateQueryParam(
        JSON.stringify({
          page: req.query.page ? parseInt(req.query.page as string) : undefined,
          pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string) : undefined,
        }),
        querySchemas.paginationSchema,
      );
      Object.assign(options, pagination);
    }

    // Handle other parameters
    if (req.query.include) {
      options.include = RequestOptionBuilder.validateQueryParam(
        req.query.include as string,
        querySchemas.includeSchema,
      );
    }

    if (req.query.orderBy) {
      options.orderBy = RequestOptionBuilder.validateQueryParam(
        req.query.orderBy as string,
        querySchemas.orderBySchema,
      );
    }

    if (req.query.where) {
      options.where = RequestOptionBuilder.validateQueryParam(
        req.query.where as string,
        querySchemas.whereSchema,
      );
    }

    return options;
  }
}
