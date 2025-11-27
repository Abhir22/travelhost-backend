import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import logger from '../utils/logger';
import { BadRequestException } from '../exceptions/http.exception';

/**
 * Middleware to validate request data against a Zod schema
 * @param schema Zod schema to validate against
 * @param part Which part of the request to validate ('body', 'query', or 'params')
 */
export const validate = (schema: ZodSchema, part: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[part]);

      if (!result.success) {
        logger.warn(`Validation failed for ${part}`, {
          errors: result.error.errors,
          data: req[part]
        });

        throw new BadRequestException(
          'Validation failed',
          result.error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message
          }))
        );
      }

      // Replace the request part with the parsed data
      // This ensures proper type coercion and default values
      req[part] = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to validate request data from all parts (body, query, params)
 * @param schemas Object containing schemas for body, query, and params
 */
export const validateAll = (schemas: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const result = schemas.body.safeParse(req.body);
        if (!result.success) {
          throw new BadRequestException(
            'Request body validation failed',
            result.error.errors.map((err) => ({
              path: `body.${err.path.join('.')}`,
              message: err.message
            }))
          );
        }
        req.body = result.data;
      }

      if (schemas.query) {
        const result = schemas.query.safeParse(req.query);
        if (!result.success) {
          throw new BadRequestException(
            'Query parameters validation failed',
            result.error.errors.map((err) => ({
              path: `query.${err.path.join('.')}`,
              message: err.message
            }))
          );
        }
        req.query = result.data;
      }

      if (schemas.params) {
        const result = schemas.params.safeParse(req.params);
        if (!result.success) {
          throw new BadRequestException(
            'Route parameters validation failed',
            result.error.errors.map((err) => ({
              path: `params.${err.path.join('.')}`,
              message: err.message
            }))
          );
        }
        req.params = result.data;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Express middleware that adds validation capabilities to the request object
 */
export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.validate = (schema: ZodSchema, part: 'body' | 'query' | 'params' = 'body') => {
    const result = schema.safeParse(req[part]);
    if (!result.success) {
      throw new BadRequestException(
        'Validation failed',
        result.error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message
        }))
      );
    }
    return result.data;
  };

  next();
};

// Extend the Express Request type
declare global {
  namespace Express {
    interface Request {
      validate: <T>(
        schema: ZodSchema<T>,
        part?: 'body' | 'query' | 'params'
      ) => T;
    }
  }
}