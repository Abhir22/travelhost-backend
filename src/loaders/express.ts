// src/loaders/express.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import logger from '../core/utils/logger';
import { ServerConfig } from '@/types/app-config';

export const loadExpressApp = async (app: Application, config: ServerConfig) => {
  if (config.enableCors !== false) {
    app.use(cors());
  }

  if (config.enableHelmet !== false) {
    app.use(helmet());
  }

  if (config.enableCompression !== false) {
    app.use(compression());
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from uploads directory
  const uploadsDir = path.resolve(process.env.LOCAL_UPLOAD_DIR || './uploads');
  app.use('/uploads', express.static(uploadsDir));

  if (config.enableLogging !== false) {
    app.use(
      morgan('combined', {
        stream: {
          write: (message: string) => logger.http(message.trim()),
        },
      })
    );
  }
};