import { z, ZodSchema, ZodError } from 'zod';
import { BadRequestException } from '../exceptions/http.exception';

type ValidationError = {
  path: string;
  message: string;
  code: string;
};

type FormattedError = {
  singleMessage: string;
  allErrors: ValidationError[];
  fieldErrors: Record<string, string[]>;
};

export class ValidationUtil {
  static validate<T>(
    data: unknown,
    schema: ZodSchema<T>,
    options?: { allowEmpty?: boolean }
  ): T {
    this.checkEmptyData(data, options?.allowEmpty);

    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw this.createValidationError(error);
      }
      throw error;
    }
  }

  static async validateAsync<T>(
    data: unknown,
    schema: ZodSchema<T>,
    options?: { allowEmpty?: boolean }
  ): Promise<T> {
    this.checkEmptyData(data, options?.allowEmpty);

    try {
      return await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof ZodError) {
        throw this.createValidationError(error);
      }
      throw error;
    }
  }

  private static createValidationError(error: ZodError): BadRequestException {
    const formatted = this.formatError(error);
    return new BadRequestException(formatted.singleMessage, {
      errors: formatted.allErrors,
      fieldErrors: formatted.fieldErrors
    });
  }

  private static checkEmptyData(data: unknown, allowEmpty = false): void {
    if (!allowEmpty && this.isEmpty(data)) {
      throw new BadRequestException('Request data cannot be empty');
    }
  }


  private static isEmpty(data: unknown): boolean {
    if (data === undefined || data === null) return true;
    if (typeof data === 'string' && data.trim() === '') return true;
    if (Array.isArray(data) && data.length === 0) return true;
    if (typeof data === 'object' && Object.keys(data).length === 0) return true;
    return false;
  }


  private static formatError(error: ZodError): FormattedError {
    const fieldErrors: Record<string, string[]> = {};
    const allErrors: ValidationError[] = [];

    error.errors.forEach(e => {
      const path = e.path.join('.') || 'value';
      const message = this.createErrorMessage(e, path);

      if (!fieldErrors[path]) {
        fieldErrors[path] = [];
      }
      fieldErrors[path].push(message);

      allErrors.push({ path, message, code: e.code });
    });

    return {
      singleMessage: this.createSingleMessage(allErrors),
      allErrors,
      fieldErrors
    };
  }


  private static createSingleMessage(errors: ValidationError[]): string {
    if (errors.length === 1) return errors[0].message;
    
    const firstError = errors[0];
    return firstError.message;
  }

  private static createErrorMessage(error: z.ZodIssue, path: string): string {
    switch (error.code) {
      case 'invalid_type':
        return `'${path}' should be ${error.expected}, not ${error.received}`;
      case 'too_small':
        return this.getSizeMessage(path, 'at least', Number(error.minimum), error.type);
      case 'too_big':
        return this.getSizeMessage(path, 'at most', Number(error.maximum), error.type);
      case 'invalid_string':
        return this.getStringMessage(path, error.validation);
      case 'invalid_date':
        return `'${path}' must be a valid date`;
      case 'invalid_enum_value':
        return `'${path}' must be one of: ${error.options.join(', ')}`;
      default:
        return `Invalid value for '${path}'`;
    }
  }

  private static getSizeMessage(
    path: string,
    comparison: string,
    value: number,
    type?: string
  ): string {
    const unit = type === 'string' ? 'characters' : 
                type === 'number' ? '' : 'items';
    return `'${path}' must be ${comparison} ${value}${unit ? ' ' + unit : ''}`;
  }

  private static getStringMessage(path: string, validation?: any): string {
    switch (validation) {
      case 'email': return `Please enter a valid email for '${path}'`;
      case 'url': return `Please enter a valid URL for '${path}'`;
      case 'uuid': return `Please enter a valid UUID for '${path}'`;
      case 'regex': return `'${path}' format is invalid`;
      default: return `'${path}' contains invalid characters`;
    }
  }
}