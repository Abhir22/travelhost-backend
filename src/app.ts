// src/app.ts
import 'dotenv/config'
import express from 'express';
import { loadRoutes } from './loaders/routes';
import { connectPrisma } from './loaders/prisma';
import { loadExpressApp } from './loaders/express';
import { loadDI } from './loaders/di';
import { AppConfig } from './types/app-config';
import { catchUnhandledExceptions, errorHandler } from './core/middlewares/error.middleware';
import { requestContextMiddleware } from './core/middlewares/request-context.middleware';

class App {
  public app: express.Application;
  private config: AppConfig;

  constructor(config: AppConfig) {
    this.app = express();
    this.config = config;
  }

  private async initializeLoaders() {
    console.log('Initializing application loaders...');
    await connectPrisma();
    await this.loadConfiguredDI();
    await loadExpressApp(this.app, this.config.server);
    this.app.use(requestContextMiddleware)
    this.loadHealthCheckRoute();
    await this.loadConfiguredRoutes();
    console.log('Routes loaded successfully');
    this.app.use(errorHandler());
    catchUnhandledExceptions();
  }

  private loadHealthCheckRoute() {
    // Add health check endpoint for service discovery
    this.app.get('/health', (_req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'user-service',
        port: this.config.server.port,
        modules: this.config.modules.filter(m => m.enabled).map(m => ({
          name: m.name,
          routes: m.includeRoutes || 'all'
        }))
      });
    });
  }

  private async loadConfiguredDI() {
    const enabledModules = this.config.modules.filter(m => m.enabled);
    console.log(`Loading DI for modules: ${enabledModules.map(m => m.name).join(', ')}`);
    await loadDI(enabledModules.map(m => m.name));
  }

  private async loadConfiguredRoutes() {
    const enabledModules = this.config.modules.filter(m => m.enabled);
    console.log(`Loading routes for modules: ${enabledModules.map(m => m.name).join(', ')}`);
    await loadRoutes(this.app, enabledModules);
  }

  public listen(): void {
    this.app.listen(this.config.server.port, () => {
      console.log(`Server running on port ${this.config.server.port}`);
    });
  }

  public async build() {
    console.log('Building application...');
    await this.initializeLoaders();
  }

  public getServer(): express.Application {
    return this.app;
  }
}

export default App;