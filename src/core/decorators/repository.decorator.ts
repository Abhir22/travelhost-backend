import { Prisma } from "@prisma/client";
import { BadRequestException } from "../exceptions/http.exception";
import { DatabaseException } from "../exceptions/database.exception";
import { setFunctionName } from "../utils/request-context";

export function Repository() {
  return function <T extends { new (...args: any[]): {} }>(OriginalConstructor: T) {
    return class extends OriginalConstructor {
      constructor(...args: any[]) {
        super(...args);

        return new Proxy(this, {
          get: (target, prop, receiver) => {
            const original = Reflect.get(target, prop, receiver);

            if (typeof original === 'function' && prop !== 'constructor') {
              return async (...methodArgs: any[]) => {
                try {
                  const methodName = `${OriginalConstructor.name}.${String(prop)}`;
                  setFunctionName(methodName); // <-- context tracking
                  return await original.apply(target, methodArgs);
                } catch (error) {
                  handleCaughtError(error, OriginalConstructor.name, String(prop), methodArgs);
                }
              };
            }

            return original;
          }
        });
      }
    };
  };
}



function handleCaughtError(error: unknown, className: string, methodName: string, args: any[]) {
  if (error instanceof BadRequestException) {
    throw error;
  }

  const errorContext = createErrorContext(className, methodName, args, error);
  throw createDatabaseException(error, errorContext);
}

function createErrorContext(className: string, methodName: string, args: any[], error: unknown): Record<string, unknown> {
  const context: Record<string, unknown> = {
    repository: className,
    method: methodName,
    arguments: args,
  };

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    enhanceWithPrismaErrorDetails(context, error);
  }

  return context;
}

function enhanceWithPrismaErrorDetails(context: Record<string, unknown>, error: Prisma.PrismaClientKnownRequestError) {
  context.prismaCode = error.code;
  context.prismaMeta = error.meta;
  
  if (error.meta?.query) {
    context.query = error.meta.query;
  }
}

function createDatabaseException(error: unknown, context: Record<string, unknown>): DatabaseException {
  return new DatabaseException(
    'Database operation failed',
    context,
    { 
      isOperational: false, 
      cause: error instanceof Error ? error : undefined 
    }
  );
}