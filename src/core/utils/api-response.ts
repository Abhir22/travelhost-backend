import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
  timestamp: string;
}

export class SuccessResponse<T> implements IApiResponse<T> {
  public success: boolean = true;
  public timestamp: string = new Date().toISOString();

  constructor(
    public data: T,
    public message: string,
    public statusCode: number
  ) {}
  public send(res: Response): void {
    res.status(this.statusCode).json(this);
  }
  // Universal factory method - can be used anywhere
  static ok<T>(data: T, message: string = 'Success'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.OK);
  }

  // CRUD specific factory methods
  static create<T>(data: T, message: string = 'Resource created successfully'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.CREATED);
  }

  static get<T>(data: T, message: string = 'Resource retrieved successfully'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.OK);
  }

  static update<T>(data: T, message: string = 'Resource updated successfully'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.OK);
  }

  static delete<T>(data: T, message: string = 'Resource deleted successfully'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.OK);
  }

  // Additional common operations
  static found<T>(data: T, message: string = 'Resource found'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.OK);
  }

  static accepted<T>(data: T, message: string = 'Request accepted'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.ACCEPTED);
  }

  static noContent<T>(data: T, message: string = 'No content'): SuccessResponse<T> {
    return new SuccessResponse(data, message, StatusCodes.NO_CONTENT);
  }

  // Custom status code factory method
  static custom<T>(data: T, message: string, statusCode: number): SuccessResponse<T> {
    return new SuccessResponse(data, message, statusCode);
  }
}

export class PaginatedResponse<T> extends SuccessResponse<T[]> {
  constructor(
    data: T[],
    message: string,
    statusCode: number,
    public page: number,
    public limit: number,
    public total: number,
    public totalPages: number = Math.ceil(total / limit)
  ) {
    super(data, message, statusCode);
  }

  public send(res: Response): void {
    res.status(this.statusCode).json(this);
  }
  static paginated<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message: string = 'Resources retrieved successfully'
  ): PaginatedResponse<T> {
    return new PaginatedResponse(data, message, StatusCodes.OK, page, limit, total);
  }

  // Factory method with custom status code
  static paginatedCustom<T>(
    data: T[],
    page: number,
    limit: number,
    total: number,
    message: string,
    statusCode: number
  ): PaginatedResponse<T> {
    return new PaginatedResponse(data, message, statusCode, page, limit, total);
  }
}
