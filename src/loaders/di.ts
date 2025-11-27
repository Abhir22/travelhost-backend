// src/loaders/di.ts
import 'reflect-metadata';
import { existsSync } from 'fs';
import path from 'path';
export const loadDI = async (modulesToLoad: string[]) => {
  const modulesPath = path.join(__dirname, '../modules');
  
  if (!existsSync(modulesPath)) {
    console.error(`Modules directory not found at ${modulesPath}`);
    return;
  }

  for (const moduleName of modulesToLoad) {
    const diPaths = [
      path.join(modulesPath, moduleName, 'di.ts'),
      path.join(modulesPath, moduleName, 'di.js')
    ];

    let diPathFound: string | null = null;
    for (const diPath of diPaths) {
      if (existsSync(diPath)) {
        diPathFound = diPath;
        break;
      }
    }

    if (!diPathFound) {
      console.debug(`No DI configuration found for module ${moduleName}`);
      continue;
    }

    try {
      const modulePath = diPathFound.replace(/\.(ts|js)$/, '');
      const diModule = await import(modulePath);
      
      if (typeof diModule.registerDependencies === 'function') {
        diModule.registerDependencies();
        console.info(`✅ Successfully registered dependencies for ${moduleName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to load DI for ${moduleName}:`, error);
    }
  }
};