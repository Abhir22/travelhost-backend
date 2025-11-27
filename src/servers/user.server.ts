import { AppConfig } from "@/types/app-config";
import App from "../app";

import 'dotenv/config'

const config: AppConfig = {
  modules: [{ name: 'locations', enabled: true, routesPrefix: '/api/v1/locations' },
    { name: 'travels', enabled: true, routesPrefix: '/api/v1/travels' }],
  server: {
    port: parseInt(process.env.PORT || '3001'),
    enableCors: true,
    enableHelmet: true,
    enableCompression: true,
    enableLogging: true
  }
};

const app = new App(config);

app.build().then(() => {
  app.listen();
});