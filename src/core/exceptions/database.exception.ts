import { InternalServerErrorException } from "./http.exception";

export class DatabaseException extends InternalServerErrorException {
  constructor(
    message = 'Database Operation Failed',
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
      isOperational?: boolean;
    } = {}
  ) {
    super(message, details, {
      ...options,
      isOperational: options.isOperational ?? true, // Most DB errors are operational
    });
  }
}
