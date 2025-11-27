// monitoring/error-reporter.ts
import { Request } from 'express';
import { BaseException } from '../exceptions/base';
import logger from '../utils/logger';

export class ErrorReporter {
  static reportError(error: Error, req?: Request) {
    console.log('ErrorReporter triggered:', error.message);
    const isKnownException = error instanceof BaseException;
    const isServerError = isKnownException 
      ? (error as BaseException).statusCode >= 500
      : true;

    const errorData = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        isOperational: isKnownException 
          ? (error as BaseException).isOperational
          : false,
      },
      context: {
        url: req?.originalUrl,
        method: req?.method,
        body: req?.body,
        params: req?.params,
        query: req?.query,
        user: (req as any)?.user?.id || 'anonymous',
      },
      timestamp: new Date().toISOString(),
    };

    // Always log to console
    logger.error(errorData);

    // Send to external monitoring based on conditions
    if (process.env.NODE_ENV === 'production') {
      const shouldReport = 
        // Report all unknown errors
        !isKnownException ||
        // Report server errors even if they're known
        isServerError ||
        // Report if explicitly marked as non-operational
        (isKnownException && !(error as BaseException).isOperational) ||
        // Report if environment variable says to report all
        process.env.REPORT_ALL_ERRORS === 'true';

      if (shouldReport) {
        this.sendToMonitoringService(errorData);
      } else {
        console.log("SKIP REPORTING", errorData)
        logger.info(`Skipping monitoring report for operational error: ${error.message}`);
      }
    }
  }

  private static sendToMonitoringService(errorData: any) {
    // Implementation remains the same
    console.log("Sending error to monitoring service:", errorData);
  }
}