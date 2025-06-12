import fastify from 'fastify';
import { loggerConfig } from './config/logger.config';
import { multipartConfig } from './config/multipart.config';
import { corsConfig } from './config/cors.config';
import { rateLimitConfig } from './config/rate-limit.config';

export const createServer = () => {
  const app = fastify({ logger: loggerConfig as any });

  app.register(require('@fastify/rate-limit'), rateLimitConfig);
  app.register(require('@fastify/multipart'), multipartConfig);
  app.register(require('@fastify/cors'), corsConfig);

  app.get('/', async (_, reply) => {
    reply.send({ message: 'Welcome to the Fastify API!' });
  });

  return app;
};