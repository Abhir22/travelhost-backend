// src/core/types/app-config.ts
export interface ModuleConfig {
  name: string;
  enabled: boolean;
  routesPrefix?: string;
  // New: Support for specific routes/controllers within a module
  includeRoutes?: string[]; // Specific route files to include (e.g., ['user', 'useraddress'])
  excludeRoutes?: string[]; // Specific route files to exclude
}

export interface AppConfig {
  modules: ModuleConfig[];
  server: ServerConfig;
}

export interface ServerConfig {
  port: number;
  enableCors?: boolean;
  enableHelmet?: boolean;
  enableCompression?: boolean;
  enableLogging?: boolean;
}
