import { PrismaClient } from '@prisma/client';
import logger from '../core/utils/logger';
import { asyncLocalStorage } from '../core/utils/request-context';

const shouldLogPrismaQueries = process.env.PRISMA_QUERY_LOG === 'true';

export const prisma = new PrismaClient({
  log: shouldLogPrismaQueries
    ? [{ level: 'query', emit: 'event' }]
    : [],
});

if (shouldLogPrismaQueries) {
  prisma.$on('query', (e) => {
    const store = asyncLocalStorage.getStore();

    const contextInfo = store
      ? `🧵 Context:
    📌 Request ID: ${store.requestId}
    👤 User ID:    ${store.userId ?? 'N/A'}
    🌐 Route:      ${store.method} ${store.route}
    🕒 Timestamp:  ${store.timestamp}
    #  Function Name: ${store.functionName
       }`
      : '🔍 No request context found (outside request scope)';

    const interpolatedQuery = interpolateQuery(e.query, e.params);

    logger.info(`\n🧩 Prisma Query Log:
  📄 Query:    ${interpolatedQuery}
  ⏱ Duration: ${e.duration}ms
  ${contextInfo}\n`);
  });
}


// Utility function to interpolate params into query string
function interpolateQuery(query: string, params: string): string {
  try {
    const parsedParams = JSON.parse(params);
    if (!Array.isArray(parsedParams)) return query;

    let i = 0;
    return query.replace(/\?/g, () => {
      const val = parsedParams[i++];
      return formatValue(val);
    });
  } catch (e) {
    return query; // fallback if param parsing fails
  }
}

function formatValue(value: any): string {
  if (value === null) return 'NULL';
  if (typeof value === 'string') return `'${value}'`;
  if (Array.isArray(value)) return `(${value.map(formatValue).join(', ')})`;
  return value.toString();
}



export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to Prisma');
  } catch (error) {
    logger.error('Failed to connect to Prisma', error);
    process.exit(1);
  }
};

export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};