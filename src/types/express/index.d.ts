declare global {
  namespace Express {
    interface Response {
      success?: <T>(
        data: T,
        message?: string,
        statusCode?: number
      ) => Response;
      paginated?: <T>(
        data: T[],
        message: string,
        statusCode: number,
        page: number,
        limit: number,
        total: number
      ) => Response;
    }
    interface User {
      id?: string;
      [key: string]: any;
    }
    
    interface Request {
      user?: User;
    }
  }
}

