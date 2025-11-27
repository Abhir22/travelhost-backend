import { BaseException } from "./base";

export class BadRequestException extends BaseException {
  constructor(
    message = 'Bad Request',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message, 400, details, options);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(
    message = 'Unauthorized',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message, 401, details, options);
  }
}

export class ForbiddenException extends BaseException {
  constructor(
    message = 'Forbidden',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message, 403, details, options);
  }
}

export class NotFoundException extends BaseException {
  constructor(
    message = 'Not Found',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message, 404, details, options);
  }
}

export class ConflictException extends BaseException {
  constructor(
    message = 'Conflict',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message, 409, details, options);
  }
}

export class InternalServerErrorException extends BaseException {
  constructor(
    message = 'Internal Server Error',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
      isOperational?: boolean;
    } = {}
  ) {
    super(message, 500, details, {
      ...options,
      isOperational: options.isOperational ?? false,
    });
  }
}

export class ServiceUnavailableException extends BaseException {
  constructor(
    message = 'Service Unavailable',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message, 503, details, options);
  }
}


export class UnexpectedError extends InternalServerErrorException {
  constructor(
    error: Error | unknown,
    context?: Record<string, unknown>,
    message: string = 'An unexpected error occurred'
  ) {
    const actualError = error instanceof Error ? error : new Error(String(error));
    super(message, {
      originalError: {
        name: actualError.name,
        message: actualError.message,
        stack: actualError.stack
      },
      ...(context && { context })
    }, {
      cause: actualError,
      isOperational: false
    });

    // Preserve original stack trace
    if (actualError.stack) {
      this.stack = `${this.stack}\nOriginal Error Stack:\n${actualError.stack}`;
    }
  }
}