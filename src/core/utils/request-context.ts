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
  const store = asyncLocalStorage.getStore();
  if (store) {
    store.functionName = name;
  }
}
