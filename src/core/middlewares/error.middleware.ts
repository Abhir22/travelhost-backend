// middlewares/error.middleware.ts
import {  Response, NextFunction, Request } from 'express';


// import { logger } from '../utils/logger';
import { NotFoundException } from '../exceptions/http.exception';
import { BaseException, normalizeError } from '../exceptions/base';
import { BusinessException } from '../exceptions/business.exception';
import logger from '../utils/logger';
import { ValidationException } from '../exceptions/validation.exception';
import { ErrorReporter } from '../utils/error-reporter';

interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
}

export function errorHandler(
  options: {
    includeStackTrace?: boolean;
    logErrors?: boolean;
    reportErrors?: boolean;
  } = {}
) {
  const {
    includeStackTrace = process.env.NODE_ENV !== 'production',
    logErrors = true,
    reportErrors = true
  } = options;

  return (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log('Error middleware triggered:',);
    // Normalize the error to ensure consistent handling
    const error = normalizeError(err);
    const timestamp = new Date().toISOString();
    
    // Prepare error context for logging
    const errorContext = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...(error instanceof BaseException && {
          statusCode: error.statusCode,
          details: error.details,
          isOperational: error.isOperational
        }),
        ...(error instanceof BusinessException && { code: error.code })
      },
      request: {
        url: req.originalUrl,
        method: req.method,
        path: req.path,
        params: req.params,
        query: req.query,
        user: req.user?.id || 'anonymous',
        ip: req.ip
      },
      timestamp
    };

    // Report error to monitoring system if enabled
    if (reportErrors) {
      ErrorReporter.reportError(error, req);
    }

    // Log the error if enabled
    if (logErrors) {
      if (!error.isOperational) {
        logger.error('Unhandled error occurred', errorContext);
      } else {
        logger.warn('Operational error occurred', errorContext);
      }
    }

    // Prepare the response
    const response: ErrorResponse = {
      success: false,
      error: {
        message: error.message,
      }
    };

    // Add additional error-specific information
    if (error instanceof BaseException) {
      response.error.details = error.details;
      
      if (error instanceof BusinessException) {
        response.error.code = error.code;
      }
    }

    // Include stack trace in development if enabled
    if (includeStackTrace) {
      response.error.details = {
        ...response.error.details,
        stack: error.stack?.split('\n')
      };
    }

    // Special handling for Zod validation errors
    console.log(error);
    if (error.name === 'ZodError') {
      console.error('Zod validation error occur:');
      const zodError = error as any;
      const errors = zodError.errors.reduce((acc: Record<string, string[]>, curr: any) => {
        const key = curr.path.join('.');
        if (!acc[key]) acc[key] = [];
        acc[key].push(curr.message);
        return acc;
      }, {});

      const validationError = new ValidationException(errors);
      response.error.message = validationError.message;
      response.error.details = validationError.details;
      return res.status(validationError.statusCode).json(response);
    }

    // Special handling for JWT errors
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      response.error.message = 'Authentication failed';
      response.error.details = error.message;
      return res.status(401).json(response);
    }

    // Send the appropriate response
    const statusCode = error instanceof BaseException ? error.statusCode : 500;
    return res.status(statusCode).json(response);
  };
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new NotFoundException(`Cannot ${req.method} ${req.path}`);
  next(error);
}

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function catchUnhandledExceptions() {
  process.on('unhandledRejection', (reason: unknown) => {
    const error = normalizeError(reason);
    logger.error('Unhandled rejection:', {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    });
    ErrorReporter.reportError(error);
  });

  process.on('uncaughtException', (error: Error) => {
    const normalizedError = normalizeError(error);
    logger.error('Uncaught exception:', {
      error: {
        name: normalizedError.name,
        message: normalizedError.message,
        stack: normalizedError.stack
      }
    });
    ErrorReporter.reportError(normalizedError);
  });
}

