import { AppConfig } from "@/types/app-config";
import App from "../app";

import 'dotenv/config'

const config: AppConfig = {
  modules: [{ name: 'locations', enabled: true, routesPrefix: '/api/v1/locations' },
    { name: 'travels', enabled: true, routesPrefix: '/api/v1/travels' },
    {name:'destinations' ,enabled:true,routesPrefix:'/api/v1/destinations'},
    { name: 'package', enabled: true, routesPrefix: '/api/v1/package' },
    { name: 'hotels', enabled: true, routesPrefix: '/api/v1/hotels' },
    { name: 'packages', enabled: true, routesPrefix: '/api/v1/packages' }],
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