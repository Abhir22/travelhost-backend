import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';
import { asyncLocalStorage, RequestContext } from '../utils/request-context';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id?: string };
  }
}

export function requestContextMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = process.hrtime();
  const context: RequestContext = {
    requestId: uuidv4(),
    timestamp: new Date().toISOString(),
    route: req.originalUrl,
    method: req.method,
    userId: req.user?.id,
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  };

  asyncLocalStorage.run(context, () => {
    res.setHeader('X-Request-ID', context.requestId);

    // Log request start only if enabled in env
    if (process.env.ENABLE_REQUEST_LOGGING === 'true') {
       console.log(`[${context.requestId}] ${context.method} ${context.route}`);
    }

    res.on('finish', () => {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const responseTimeMs = (seconds * 1000 + nanoseconds / 1_000_000).toFixed(2);

    //   res.setHeader('X-Response-Time', `${responseTimeMs}ms`);

      // Log completion only if enabled in env
      if (process.env.ENABLE_REQUEST_LOGGING === 'true') {
        console.log(
          `[${context.requestId}] Completed in ${responseTimeMs}ms with status ${res.statusCode}`
        );
      }
    });

    next();
  });
}