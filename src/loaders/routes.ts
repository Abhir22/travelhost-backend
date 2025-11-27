// src/loaders/routes.ts
import { Application } from 'express';
import { existsSync, readdirSync } from 'fs';
import path from 'path';
import logger from '../core/utils/logger';
import { ModuleConfig } from '@/types/app-config';

export const loadRoutes = async (app: Application, modules: ModuleConfig[]) => {
  // Note: DB Designer routes are served by the separate db-designer server
  // They are NOT loaded in the main API server

  const modulesPath = path.join(__dirname, '../modules');

  for (const module of modules) {
    const routesPath = path.join(modulesPath, module.name, 'routes');

    if (!existsSync(routesPath)) {
      logger.debug(`No routes directory found for module ${module.name}`);
      continue;
    }

    try {
      let routeFiles = readdirSync(routesPath)
        .filter(file => file.endsWith('.routes.ts') || file.endsWith('.routes.js'));

      // Apply route filtering based on module configuration
      routeFiles = filterRouteFiles(routeFiles, module);

      for (const file of routeFiles) {
        const fullPath = path.join(routesPath, file);
        try {
          const imported = await import(fullPath);
          const route = imported.default;

          if (route) {
            const prefix = module.routesPrefix || `/api/${module.name}`;
            app.use(prefix, route);
            logger.info(`Mounted route: ${prefix}/${file.replace('.routes.ts', '').replace('.routes.js', '')}`);
          }
        } catch (error) {
          logger.error(`Failed to import ${file}:`, error);
        }
      }
    } catch (error) {
      logger.error(`Error processing module ${module.name}:`, error);
    }
  }
};

/**
 * Filter route files based on module configuration
 */
const filterRouteFiles = (routeFiles: string[], module: ModuleConfig): string[] => {
  let filteredFiles = [...routeFiles];

  // If includeRoutes is specified, only include those routes
  if (module.includeRoutes && module.includeRoutes.length > 0) {
    filteredFiles = routeFiles.filter(file => {
      const routeName = file.replace('.routes.ts', '').replace('.routes.js', '');
      return module.includeRoutes!.includes(routeName);
    });
    logger.info(`Module ${module.name}: Including only routes: ${module.includeRoutes.join(', ')}`);
  }

  // If excludeRoutes is specified, exclude those routes
  if (module.excludeRoutes && module.excludeRoutes.length > 0) {
    filteredFiles = filteredFiles.filter(file => {
      const routeName = file.replace('.routes.ts', '').replace('.routes.js', '');
      return !module.excludeRoutes!.includes(routeName);
    });
    logger.info(`Module ${module.name}: Excluding routes: ${module.excludeRoutes.join(', ')}`);
  }

  return filteredFiles;
};