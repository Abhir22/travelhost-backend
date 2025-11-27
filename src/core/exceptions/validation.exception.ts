import { BadRequestException } from "./http.exception";

export class ValidationException extends BadRequestException {
  constructor(
    public readonly errors: Record<string, string[]>,
    options: {
      cause?: Error;
      context?: Record<string, unknown>;
    } = {}
  ) {
    super('Validation Failed', { errors }, options);
  }
}
