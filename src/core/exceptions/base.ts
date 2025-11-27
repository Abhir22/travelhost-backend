import { UnexpectedError } from "./http.exception";


export class BaseException extends Error {
  public readonly timestamp: Date;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, unknown>;

  constructor(
    public readonly message: string,
    public readonly statusCode: number,
    public readonly details?: any,
    options: {
      isOperational?: boolean;
      cause?: Error;
      context?: Record<string, unknown>;
    } = {},
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.isOperational = options.isOperational ?? true;
    this.context = options.context;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // If there's a cause, add it to the stack
    if (options.cause) {
      this.stack = `${this.stack}\nCaused by: ${options.cause.stack}`;
    }

    // Set prototype explicitly for instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp.toISOString(),
      details: this.details,
      ...(this.context && { context: this.context }),
      ...(this.isOperational === false && { isOperational: this.isOperational }),
    };
  }
}

export function normalizeError(error: unknown, context?: Record<string, unknown>): BaseException {
  // Already a known exception type
  if (error instanceof BaseException) {
    // Add context if provided
    if (context) {
      return new (error.constructor as typeof BaseException)(
        error.message,
        error.statusCode,
        error.details,
        {
          isOperational: error.isOperational,
          cause: (error as any).cause,
          context: { ...error.context, ...context }
        }
      );
    }
    return error;
  }

  // Standard Error object
  if (error instanceof Error) {
    return new UnexpectedError(
      error.message || 'An unexpected error occurred',
      context,
      undefined,
    );
  }

  // Handle primitive types and objects
  let errorMessage = 'An unexpected error occurred';
  let details: any = undefined;

  if (error === null || error === undefined) {
    errorMessage = 'Unexpected null or undefined error';
  } else if (typeof error === 'object') {
    try {
      details = { originalError: error };
      errorMessage = 'Unexpected object error';
      if ('message' in error && typeof error.message === 'string') {
        errorMessage = error.message;
      }
    } catch (e) {
      errorMessage = 'Unexpected error object that cannot be serialized';
    }
  } else {
    errorMessage = String(error);
  }

  return new UnexpectedError(
    errorMessage,
    context,
    details
  );
}