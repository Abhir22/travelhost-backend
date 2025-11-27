// src/config/services.config.ts
/**
 * Microservices Configuration
 * Define which services to run in different environments
 */

export interface ServiceDefinition {
  name: string;
  script: string;
  color: string;
  port?: number;
  description?: string;
}

export interface ServicesConfig {
  dev: ServiceDefinition[];
  start: ServiceDefinition[];
  full: ServiceDefinition[];
}

/**
 * Main Services Configuration
 * Add or remove services as needed for your microservices architecture
 */
export const SERVICES_CONFIG: ServicesConfig = {
  /**
   * Development Mode (npm run dev)
   * Services to run during development
   */
  dev: [
    {
      name: 'API',
      script: 'ts-node-dev --respawn --require tsconfig-paths/register src/servers/user.server.ts',
      color: 'cyan',
      port: 3000,
      description: 'Main API Server with DB Designer UI'
    },
    {
      name: 'Monitor',
      script: 'node bin/monitor.js --auto-fix',
      color: 'yellow',
      description: 'Error Monitor with Auto-fix (from node_modules)'
    }
  ],

  /**
   * Production Mode (npm run start)
   * Services to run in production
   */
  start: [
    {
      name: 'API',
      script: 'node dist/servers/user.server.js',
      color: 'cyan',
      port: 3000,
      description: 'Main API Server'
    }
  ],

  /**
   * Full Mode (npm run dev:full)
   * All services including database tools
   */
  full: [
    {
      name: 'API',
      script: 'ts-node-dev --respawn --require tsconfig-paths/register src/servers/user.server.ts',
      color: 'cyan',
      port: 3000,
      description: 'Main API Server with DB Designer UI'
    },
    {
      name: 'DB-Designer',
      script: 'node bin/db-designer.js',
      color: 'magenta',
      port: 3001,
      description: 'Database Designer UI (from node_modules)'
    },
    {
      name: 'Monitor',
      script: 'node bin/monitor.js --auto-fix',
      color: 'yellow',
      description: 'Error Monitor with Auto-fix (from node_modules)'
    },
    {
      name: 'Prisma',
      script: 'prisma studio',
      color: 'green',
      port: 5555,
      description: 'Prisma Studio Database Viewer'
    }
  ]
};

/**
 * Example: Microservices Architecture
 * Uncomment and modify to add more microservices
 */
/*
export const MICROSERVICES_CONFIG: ServicesConfig = {
  dev: [
    {
      name: 'User-Service',
      script: 'ts-node-dev --respawn src/servers/user.server.ts',
      color: 'cyan',
      port: 3001,
      description: 'User Management Service'
    },
    {
      name: 'Auth-Service',
      script: 'ts-node-dev --respawn src/servers/auth.server.ts',
      color: 'magenta',
      port: 3002,
      description: 'Authentication Service'
    },
    {
      name: 'Product-Service',
      script: 'ts-node-dev --respawn src/servers/product.server.ts',
      color: 'blue',
      port: 3003,
      description: 'Product Management Service'
    },
    {
      name: 'Order-Service',
      script: 'ts-node-dev --respawn src/servers/order.server.ts',
      color: 'green',
      port: 3004,
      description: 'Order Processing Service'
    },
    {
      name: 'Payment-Service',
      script: 'ts-node-dev --respawn src/servers/payment.server.ts',
      color: 'yellow',
      port: 3005,
      description: 'Payment Gateway Service'
    },
    {
      name: 'Monitor',
      script: 'ts-node src/scripts/monitor.ts --auto-fix',
      color: 'white',
      description: 'Error Monitor'
    }
  ],
  
  start: [
    {
      name: 'User-Service',
      script: 'node dist/servers/user.server.js',
      color: 'cyan',
      port: 3001
    },
    {
      name: 'Auth-Service',
      script: 'node dist/servers/auth.server.js',
      color: 'magenta',
      port: 3002
    },
    {
      name: 'Product-Service',
      script: 'node dist/servers/product.server.js',
      color: 'blue',
      port: 3003
    },
    {
      name: 'Order-Service',
      script: 'node dist/servers/order.server.js',
      color: 'green',
      port: 3004
    },
    {
      name: 'Payment-Service',
      script: 'node dist/servers/payment.server.js',
      color: 'yellow',
      port: 3005
    },
    {
      name: 'API-Gateway',
      script: 'node dist/servers/gateway.server.js',
      color: 'red',
      port: 3000,
      description: 'API Gateway'
    }
  ],
  
  full: [
    // All dev services + additional tools
  ]
};
*/

/**
 * Helper function to generate concurrently command
 */
export function generateConcurrentlyCommand(services: ServiceDefinition[]): string {
  const names = services.map(s => s.name).join(',');
  const colors = services.map(s => s.color).join(',');
  const commands = services.map(s => `"${s.script}"`).join(' ');
  
  return `concurrently -n "${names}" -c "${colors}" ${commands}`;
}

/**
 * Helper function to display services info
 */
export function displayServicesInfo(mode: keyof ServicesConfig): void {
  const services = SERVICES_CONFIG[mode];
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`🚀 Starting Services in ${mode.toUpperCase()} mode`);
  console.log('='.repeat(80));
  
  services.forEach((service, index) => {
    console.log(`\n${index + 1}. ${service.name}`);
    if (service.port) {
      console.log(`   Port: ${service.port}`);
    }
    if (service.description) {
      console.log(`   Description: ${service.description}`);
    }
  });
  
  console.log(`\n${'='.repeat(80)}\n`);
}

export default SERVICES_CONFIG;

