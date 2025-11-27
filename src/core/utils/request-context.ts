// src/core/utils/request-context.ts
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  requestId: string;
  timestamp: string;
  route: string;
  method: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  functionName?: string;
}


export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export const setRequestContext = (context: RequestContext) => {
  asyncLocalStorage.run(context, () => {});
};

export const getRequestContext = (): RequestContext | undefined => {
  return asyncLocalStorage.getStore();
};


export function setFunctionName(name: string) {
    console.log("SET FUNCTION NAME CALLED");
  const store = asyncLocalStorage.getStore();
  if (store) {
    console.log("ITS STORED");
    store.functionName = name;
  }
}
