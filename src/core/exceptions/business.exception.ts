import { BaseException } from "./base";

export class BusinessException extends BaseException {
  constructor(
    message: string,
    public readonly code: string,
    statusCode: number = 400,
    details?: any,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super(message, statusCode, details, options);
  }
}
